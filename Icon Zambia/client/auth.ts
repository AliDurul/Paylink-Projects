import NextAuth, { Account, Profile, User } from "next-auth"
import credentials from "next-auth/providers/credentials"
import facebook from "next-auth/providers/facebook"
import Google from "next-auth/providers/google"
import { userInfo } from "./types/next-auth"
import { jwtDecode } from "jwt-decode"
import { JWT } from "next-auth/jwt"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        facebook({
            clientId: process.env.AUTH_FACEBOOK_ID,
            clientSecret: process.env.AUTH_FACEBOOK_SECRET,
        }),
        credentials({
            credentials: {},
            async authorize(credentials) {
                if (!credentials) return null
                const { email, password } = credentials as any

                const res = await fetch(`${API_BASE_URL}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                    cache: 'no-store'
                })
                const user = await res.json()

                if (res.ok && user) {
                    return user
                } else {
                    throw new Error(user.message || "Authentication failed");
                }

            }
        })

    ],
    callbacks: {

        async signIn({ user, account, profile, email, credentials }) {
            // checking if user is valid like email verification or balance or isactive
            if (!user) return false

            try {
                if (account?.provider !== 'credentials') {
                    const { sub, email, name, picture } = profile as Profile

                    const res = await fetch(`${API_BASE_URL}/auth/register`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, sub, name, picture }),
                    })

                
                    if (!res.ok) throw new Error('Failed to register user')

                    const userTokens = await res.json()

                    console.log('line 67 userTokens==>', userTokens);
                    user.access = userTokens.access
                    user.refresh = userTokens.refresh
                }
            } catch (error) {
                console.error("Error signing in==>", error);
                return false
            }

            return true
        },
        async jwt({ token, user, account, }: { token: JWT, user: User, account: Account | null }) {

            if (user) {
                token.access = user?.access
                token.refresh = user?.refresh
                token.userInfo = jwtDecode<userInfo>(user?.access);
                console.log('line 84 jwt token==>', token);
                return token
            } else if (Date.now() < token.userInfo.exp * 1000) {
                return token
            } else {
                try {
                    const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ refresh: token.refresh })
                    })
                    const tokens = await res.json()
                    if (!res.ok) throw tokens
                    token.access = tokens.access
                    return token
                } catch (error) {
                    console.error("Error refreshing access token==>", error);
                    return { ...token, error: "RefreshAccessTokenError" as const };
                }
            }
        },
        async session({ session, token }) {
            if (token.access) {
                const { access, refresh, userInfo, error } = token as JWT
                session.user = userInfo as any
                session.access = access
                session.refresh = refresh
                session.error = error
            }

            return session
        }
    },
    pages: { signIn: '/auth' },
    secret: process.env.AUTH_SECRET,
    session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
})