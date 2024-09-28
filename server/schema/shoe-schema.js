import {z} from 'zod';

const ShoeIdSchema = z.coerce.number({message: 'Shoe id must be a number'});
const NameSchema = z.string({message: 'Name is required'}).trim();
const PictureSchema = z.union(
    [z.string().url({message: 'Picture must be a link'}), z.literal(
        '')]);
const DescriptionSchema = z.string({message: 'description is required'}).trim();
const CategoriesSchema = z.number().array().nonempty(
    {message: "Shoe must have at least one category"});

export const GetShoeSchema = z.object({
    params: z.object({
        shoeId: ShoeIdSchema
    })
});

export const CreateShoeSchema = z.object({
    body: z.object({
        name: NameSchema,
        picture: PictureSchema,
        description: DescriptionSchema,
        categories: CategoriesSchema

    })
});

export const UpdateShoeSchema = CreateShoeSchema.extend({
    params: z.object({
        shoeId: ShoeIdSchema
    })
});

export const GetShoesWithPagination = z.object({
    query: z.object({
        lastShoeId: z.union([ShoeIdSchema, z.literal(undefined)])
    })
});