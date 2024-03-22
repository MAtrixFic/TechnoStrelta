import { z } from 'zod';

export const regSchema = z.object({
    login: z.string().min(5).max(15).transform((v) => v.toLowerCase().replace(/\s+/g, '_')),
    email: z.string().min(10, 'min 10').max(30, 'max 30').email().transform((v) => v.toLowerCase().replace(/\s+/g, '_')),
    password: z.string().min(10).max(20).transform((v) => v.toLowerCase().replace(/\s+/g, '_'))
})

export const authSchema = z.object({
    login: z.string().min(5).max(15).transform((v) => v.toLowerCase().replace(/\s+/g, '_')),
    password: z.string().min(10).max(20).transform((v) => v.toLowerCase().replace(/\s+/g, '_'))
})