import {z} from 'zod';

export const GetShoeSchema = z.object({
    params: z.object({
        shoeId: z.coerce.number({message: 'Shoe id must be a number'}),
    })
});

export const CreateShoeSchema = z.object({
    body: z.object({
        name: z.string({message: 'Name is required'}),
        picture: z.string({message: 'Picture is required'}),
    })
});

export const UpdateShoeSchema = z.object({
    params: z.object({
        shoeId: z.coerce.number({message: 'Category id must be a number'}),
    }),
    body: z.object({
        name: z.string({message: 'Name is required'}),
        picture: z.string({message: 'Picture is required'}),
    })
});