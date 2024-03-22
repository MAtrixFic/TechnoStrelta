import { z } from 'zod';

export const userschema = z.object({
    login: z.string().min(5).max(15).transform((v) => v.toLowerCase().replace(/\s+/g, '_')),
    email: z.string().min(10).max(30).email().transform((v) => v.toLowerCase().replace(/\s+/g, '_')),
    password: z.string().min(10).max(20).transform((v) => v.toLowerCase().replace(/\s+/g, '_'))
})