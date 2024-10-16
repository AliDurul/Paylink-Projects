"use server"

import { signIn } from '@/auth'

import { AuthError } from 'next-auth'

const API_BASE_URL = process.env.API_BASE_URL

interface LoginType {
    email: string;
    password: string;
}

export const login = async (loginData: LoginType) => {
    const { email, password } = loginData

    try {
        const res = await signIn('credentials', {
            email,
            password,
            redirect: false
        })

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Invalid credentials' }
                default:
                    return { error: "Something went wrong" }
            }
        }
        throw error
    }
}