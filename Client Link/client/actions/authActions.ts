'use server'

import { signIn } from "@/auth"
import { AuthError } from "next-auth";

const BASE_URL = process.env.NEXT_PUBLIC_APIBASE_URL

interface loginValuesType {
    email: string;
    password: string;
}

export const login = async (values: loginValuesType) => {
    const { email, password } = values;
    console.log('this is login function');
    try {
        const res = await signIn('credentials', {
            email,
            password,
            redirect: false
        });

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid Credentials !" };
                case "CallbackRouteError":
                    // const errorMessage = error?.cause?.err?.message;
                    const errorMessage = error
                    return { error: errorMessage };
                default:
                    return { error: "Something went wrong!" };
            }
        }

        throw error;
    }
}
