import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentialsss",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "password"
                },
            
            },
            async authorize(credentials) {
                // This is where you need to retrieve user data 
                // to verify with credentials
                // Docs: https://next-auth.js.org/configuration/providers/credentials
                const user = { id: "42", name: "Dev", password: "2255" }

                if (credentials?.username === user.name && credentials?.password === user.password) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: '/login',
        signOut: '/login/signout',
    }
}