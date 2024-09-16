import '@/components/category-form/category-form.scss';
import Input from "@components/input/input.tsx";
import Button from "@components/button/button.tsx";
import {createCategory} from "@/services/category-services.ts";
import {z, ZodError} from 'zod';
import {useState} from "react";
import {CreateCategoryType} from "@/types/category-types.ts";
import Textarea from "@components/textarea/textarea.tsx";
import {useNavigate} from "react-router-dom";
import {AxiosError} from "axios";

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
    globalError?: string;
}

const CategoryForm = () => {
    const [errors, setErrors] = useState<CategoryErrors>({
        name: [],
        picture: [],
        description: []
    });
    const navigate = useNavigate();

    return (
        <div className="category-form">
            <h2>Category form</h2>

            {!!errors?.globalError &&
                <p className="category-form__global-error">{errors.globalError}</p>}

            <form className="category-form__form" onSubmit={async (e) => {
                e.preventDefault();
                try {
                    const categoryFormData = new FormData(e.currentTarget);
                    const dataToSend = Object.fromEntries(categoryFormData);
                    categorySchema.parse(dataToSend);
                    await createCategory(dataToSend as CreateCategoryType);
                    navigate('/categories');
                } catch (err) {
                    if (err instanceof ZodError) {
                        const fieldErrors = err.flatten().fieldErrors;
                        setErrors({
                            name: fieldErrors['name'] ?? [],
                            description: fieldErrors['description'] ?? [],
                            picture: fieldErrors['picture'] ?? []
                        });
                        return;
                    }
                    const error = err as AxiosError;
                    const errorData = error?.response?.data as {
                        error?: string
                    };
                    setErrors({
                        name: [],
                        picture: [],
                        description: [],
                        globalError: errorData?.error ?? error.message
                    });
                }
            }}>

                <Input name="name" required labelName={'Name'}
                       errors={errors.name}/>
                <Input name="picture" labelName={'Picture (url)'}
                       errors={errors.picture}/>
                <Textarea rows={6} name="description" required
                          labelName={'Description'}
                          errors={errors.description}/>
                <Button className="category-form__button">Submit</Button>
            </form>

        </div>
    );
};

export default CategoryForm;