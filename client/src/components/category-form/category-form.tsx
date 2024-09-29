import '@/components/category-form/category-form.scss';
import Input from "@components/input/input.tsx";
import Button, {ButtonVariants} from "@components/button/button.tsx";
import {
    createCategory,
    deleteCategory,
    getCategory,
    updateCategory
} from "@/services/category-services.ts";
import {z, ZodError} from 'zod';
import {useEffect, useState} from "react";
import {CategoryAPIType, CreateCategoryType} from "@/types/category-types.ts";
import Textarea from "@components/textarea/textarea.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {AxiosError} from "axios";
import PasswordModal from "@components/password-modal/password-modal.tsx";
import Loader from "@components/loader/loader.tsx";

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

    const [categoryData, setCategoryData] = useState<CategoryAPIType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<CategoryErrors>({
        name: [],
        picture: [],
        description: []
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {categoryId} = useParams();
    const parsedCategoryId = categoryId ? +categoryId : null;

    const isEditForm = !!parsedCategoryId;

    const setGlobalError = (error: AxiosError) => {
        const errorData = error?.response?.data as { error: string };
        setErrors({
            name: [],
            picture: [],
            description: [],
            globalError: errorData?.error ?? error.message
        });
    };

    const handleCategoryDeletion = async () => {
        try {
            if (!parsedCategoryId) return;
            await deleteCategory(parsedCategoryId);
            navigate('/shoes');
        } catch (err) {
            const error = err as AxiosError;
            setGlobalError(error);
        }
    };


    useEffect(() => {
        const abortController = new AbortController();
        const getCategoryInfo = async () => {
            if (!isEditForm) {
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                const data = await getCategory(parsedCategoryId, abortController.signal);
                setCategoryData(data);
            } catch (err) {
                const error = err as AxiosError;
                setGlobalError(error);
            } finally {
                setIsLoading(false);
            }
        };

        getCategoryInfo();
        return () => {
            abortController.abort();
        };

    }, [parsedCategoryId]);


    const navigate = useNavigate();

    const {name, description, picture} = categoryData ?? {};

    if (isLoading) {
        return <Loader/>;
    }

    return (
        <div className="category-form">
            <h2>Category form</h2>

            {!!errors?.globalError &&
                <p className="category-form__global-error">{errors.globalError}</p>}

            <form className="category-form__form" onSubmit={async (e) => {
                e.preventDefault();
                try {
                    setIsSubmitting(true);
                    const categoryFormData = new FormData(e.currentTarget);
                    const dataToSend = Object.fromEntries(categoryFormData) as CreateCategoryType;
                    categorySchema.parse(dataToSend);
                    if (!isEditForm) {
                        await createCategory(dataToSend);
                    } else {
                        await updateCategory({
                            ...dataToSend,
                            categoryId: parsedCategoryId
                        });
                    }
                    navigate('/categories');
                } catch (err) {
                    setIsSubmitting(false);
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
                    setGlobalError(error);
                }
            }}>

                <Input defaultValue={name ?? ''} name="name" required
                       labelName={'Name'}
                       errors={errors.name}/>
                <Input defaultValue={picture ?? ''} name="picture"
                       labelName={'Picture (url)'}
                       errors={errors.picture}/>
                <Textarea defaultValue={description ?? ''} rows={6}
                          name="description"
                          required
                          labelName={'Description'}
                          errors={errors.description}/>
                {isEditForm && <Button type="button"
                                       className="category-form__button category-form__button--delete"
                                       onClick={() => {
                                           setIsModalOpen(true);
                                       }}>Remove
                    category</Button>}
                <Button
                    variant={ButtonVariants.SUBMIT}
                    isLoading={isSubmitting}
                    className="category-form__button">Submit</Button>

            </form>
            <PasswordModal
                handleCorrectPasswordSubmit={handleCategoryDeletion}
                setIsOpen={setIsModalOpen}
                isOpen={isModalOpen}/>
        </div>
    );
};

export default CategoryForm;