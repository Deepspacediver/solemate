import {z} from "zod";

export const categoryUpdateSchema = z.object({
    body: z.object(
        {

            name: z.string({message: 'Name cannot be empty'}).trim(),
            picture: z.string({message: 'Picture cannot be empty'}).url(
                {message: 'Picture must be a link'}).trim(),

        }
    ),
    params: z.object({
        categoryId: z.number(
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
    body: {
        name: z.string({message: 'Name cannot be empty'}).trim(),
        picture: z.string({message: 'Picture cannot be empty'}).url(
            {message: 'Picture must be a link'}).url().trim()
    }
});

export const categoryDeletionSchema = z.object({
    body: z.object({
        categoryId: z.coerce.number(
            {message: 'Category id must be a number'}),
    })
});