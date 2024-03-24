'use server'
import { cookies } from "next/headers"

export default async function SetJWT(jwt: string): Promise<void> {
    const cookiesApi = cookies()
    cookiesApi.set('jwt', jwt, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        httpOnly: true,
        secure: true,
    })
}