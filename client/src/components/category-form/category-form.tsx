import '@/components/category-form/category-form.scss';
import Input from "@components/input/input.tsx";
import Button from "@components/button/button.tsx";
import {createCategory} from "@/services/category-services.ts";
import {z, ZodError} from 'zod';
import {useState} from "react";
import {CreateCategoryType} from "@/types/category-types.ts";
import Textarea from "@components/textarea/textarea.tsx";
import {useNavigate} from "react-router-dom";

const categorySchema = z.object({
    name: z.string({message: "Name is required"}).min(4, {message: 'Name is too short'}).trim(),
    description: z.string({message: "Description is required"}).trim(),
    picture: z.union([z.string().url(
    ), z.literal(
        '')]),

});


type CategoryErrors = {
    name: string[],
    description: string[],
    picture: string[],
}

const CategoryForm = () => {
    const [errors, setErrors] = useState<CategoryErrors>({name: [], picture: [], description: []});
    const navigate = useNavigate();

    return (
        <div className="category-form">
            <h2>Category form</h2>
            <form className="category-form__form" onSubmit={async (e) => {
                e.preventDefault();
                try {
                    const categoryFormData = new FormData(e.currentTarget);
                    const dataToSend = Object.fromEntries(categoryFormData);
                    categorySchema.parse(dataToSend);
                    await createCategory(dataToSend as CreateCategoryType);
                    navigate('/categories-view');
                } catch (err) {
                    console.log(err);
                    if (err instanceof ZodError) {
                        const errorZod = err as ZodError;
                        const fieldErrors = errorZod.flatten().fieldErrors;
                        setErrors({
                            name: fieldErrors['name'] ?? [],
                            description: fieldErrors['description'] ?? [],
                            picture: fieldErrors['picture'] ?? []
                        });
                    }
                }
            }}>

                <Input name="name" required labelName={'Name'} errors={errors.name}/>
                <Input name="picture" labelName={'Picture (url)'} errors={errors.picture}/>
                <Textarea rows={6} name="description" required labelName={'Description'} errors={errors.description}/>
                <Button className="category-form__button">Submit</Button>
            </form>

        </div>
    );
};

export default CategoryForm;