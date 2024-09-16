import {z} from "zod";

export const categoryUpdateSchema = z.object({
    body: z.object(
        {

            name: z.string({message: 'Name cannot be empty'}).trim(),
            picture: z.union([z.string().url({message: 'Picture must be a link'}
            ), z.literal(
                '')]),
            description: z.string(
                {message: 'Description cannot be empty'}).trim(),

        }
    ),
    params: z.object({
        categoryId: z.coerce.number(
            {message: 'Category id must be a number'}),
    })
});

export const shoesWithCategorySchema = z.object({
    params: z.object({
        categoryId: z.coerce.number(
            {message: 'Category id must be a number'}),
    })
});

export const categoryCreationSchema = z.object({
    body: z.object({
        name: z.string({message: 'Name cannot be empty'}).trim(),
        picture: z.union([z.string().url({message: 'Picture must be a link'}
        ), z.literal(
            '')]),
        description: z.string(
            {message: 'Description cannot be empty'}).trim(),
    })
});

export const categoryDeletionSchema = z.object({
    body: z.object({
        categoryId: z.coerce.number(
            {message: 'Category id must be a number'}),
    })
});