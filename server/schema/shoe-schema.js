import {z} from 'zod';

export const GetShoeSchema = z.object({
    params: z.object({
        shoeId: z.coerce.number({message: 'Shoe id must be a number'}),
    })
});

export const CreateShoeSchema = z.object({
    body: z.object({
        name: z.string({message: 'Name is required'}).trim(),
        picture: z.union(
            [z.string().url({message: 'Picture must be a link'}), z.literal(
                '')]),
        description: z.string({message: 'description is required'}).trim(),
        categories: z.number().array().nonempty(
            {message: "Shoe must have at least one category"})

    })
});

export const UpdateShoeSchema = z.object({
    params: z.object({
        shoeId: z.coerce.number({message: 'Category id must be a number'}),
    }),
    body: z.object({
        name: z.string({message: 'Name is required'}),
        picture: z.string({message: 'Picture is required'}).url(
            {message: 'Picture must be a link'}).url().trim().optional(),
        description: z.string({message: 'description is required'}).trim(),
    })
});