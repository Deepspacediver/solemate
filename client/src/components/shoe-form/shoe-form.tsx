import '@components/shoe-form/shoe-form.scss';
import {z, ZodError} from "zod";
import Checkbox from "@components/checkbox/checkbox.tsx";
import {useEffect, useState} from "react";
import Button, {ButtonVariants} from "@components/button/button.tsx";
import Input from "@components/input/input.tsx";
import Textarea from "@components/textarea/textarea.tsx";
import {getAllCategories} from "@/services/category-services.ts";
import {CategoryOption} from "@/types/category-types.ts";
import {
    createShoe,
    deleteShoe,
    getShoeById,
    updateShoe
} from "@/services/shoe-services.ts";
import {CreateShoeType, ShoeWithCategoriesType} from "@/types/shoe-types.ts";
import {AxiosError} from "axios";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import PasswordModal from "@components/password-modal/password-modal.tsx";
import Loader from "@components/loader/loader.tsx";

const createShoeSchema = z.object({
    name: z.string().min(5, "Name must have at least 5 characters"),
    description: z.string().min(5, "Description must have at least 5 characters"),
    picture: z.union([z.string().url({message: 'Picture must be a link'}
    ), z.literal(
        '')]),
    categories: z.coerce.number().array().nonempty({message: 'Shoe must have at least one category'})
});

const updateShoeSchema = createShoeSchema.extend({
    shoeId: z.number({message: 'Shoe id must be a number'})
});

type ShoeFormErrors = {
    name: string[],
    picture: string[],
    description: string[],
    categories: string[],
    globalError?: string;
}


const ShoeForm = () => {
    const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>([]);
    const [shoeData, setShoeData] = useState<ShoeWithCategoriesType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [checkedIds, setCheckedIds] = useState<number[]>([]);
    const [errors, setErrors] = useState<ShoeFormErrors>({
        name: [],
        description: [],
        picture: [],
        categories: [],
        globalError: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();
    const {shoeId} = useParams();
    const parsedShoeId = shoeId ? +shoeId : null;
    const {state} = useLocation();
    const passedCategoryId = state?.categoryId ?? null;

    const isValueInCheckedIds = (id: number) => {
        return checkedIds.includes(id);
    };


    const setGlobalError = (error: AxiosError) => {
        if (error.message === 'canceled') {
            return;
        }
        const errorData = error?.response?.data as { error: string };

        setErrors({
            name: [],
            picture: [],
            categories: [],
            description: [],
            globalError: errorData?.error ?? error.message
        });
    };

    const handleSettingIds = (id: number) => {
        if (isValueInCheckedIds(id)) {
            setCheckedIds((prevState) => prevState.filter((checkedId) => checkedId !== id));
            return;
        }
        setCheckedIds((prevState) => [...prevState, id]);
    };

    const handleShoeDeletion = async () => {
        try {
            if (!parsedShoeId) return;
            await deleteShoe(parsedShoeId);
            navigate('/shoes');
        } catch (err) {
            const error = err as AxiosError;
            setGlobalError(error);
        }
    };

    useEffect(() => {
        const abortController = new AbortController();
        const getCategoryOptions = async () => {
            try {
                const categories = await getAllCategories(abortController.signal, null, null);
                const categoriesAsOptions = categories.map(({
                                                                category_id,
                                                                name
                                                            }) => ({
                    categoryId: category_id,
                    name
                }));
                setCategoryOptions(categoriesAsOptions);
                if (parsedShoeId) {
                    const shoeDetails = await getShoeById(parsedShoeId, abortController.signal);
                    setShoeData(shoeDetails);
                    const categoryIdsInShoe = shoeDetails?.categories.map((category) => category.categoryId);
                    setCheckedIds(categoryIdsInShoe);
                } else if (passedCategoryId) {
                    setCheckedIds([passedCategoryId]);
                }
            } catch (err) {
                const error = err as AxiosError;
                setGlobalError(error);
            } finally {
                setIsLoading(false);
            }
        };

        getCategoryOptions();

        return () => {
            abortController.abort();
        };
    }, []);


    if (isLoading) {
        return <Loader/>;
    }


    return (
        <div className="shoe-form">
            <h2>Shoe form</h2>
            {!!errors.globalError &&
                <p className="shoe-form__global-error">{errors.globalError}</p>}
            <form className="shoe-form__form" onSubmit={async (e) => {
                e.preventDefault();
                try {
                    setIsSubmitting(true);
                    const shoeFormData = new FormData(e.currentTarget);
                    const shoeDataObject = Object.fromEntries(shoeFormData);
                    const dataToSend = {
                        ...shoeDataObject,
                        categories: shoeFormData.getAll('categories').map(id => +id)
                    } as CreateShoeType;


                    if (parsedShoeId) {
                        const updateShoeData = {
                            ...dataToSend,
                            shoeId: parsedShoeId
                        };
                        updateShoeSchema.parse(updateShoeData);
                        await updateShoe(updateShoeData);
                        navigate(`/shoes/${parsedShoeId}`);
                    } else {
                        createShoeSchema.parse(dataToSend);
                        await createShoe(dataToSend);
                        navigate(`/shoes`);
                    }
                } catch (err) {
                    setIsSubmitting(false);
                    if (err instanceof ZodError) {
                        const fieldErrors = err.flatten().fieldErrors;
                        setErrors({
                            name: fieldErrors['name'] ?? [],
                            picture: fieldErrors['picture'] ?? [],
                            categories: fieldErrors['categories'] ?? [],
                            description: fieldErrors['description'] ?? [],
                            globalError: ''
                        });
                        return;
                    }
                    const error = err as AxiosError;
                    setGlobalError(error);

                }
            }}>
                <Input defaultValue={shoeData?.name ?? ''} name="name" required
                       labelName={'Name'}
                       errors={errors.name}/>
                <Input defaultValue={shoeData?.picture ?? ''} name="picture"
                       labelName={'Picture (url)'}
                       errors={errors.picture}/>
                <Textarea defaultValue={shoeData?.description ?? ''} rows={6}
                          name="description" required
                          labelName={'Description'}
                          errors={errors.description}/>
                <div className="shoe-form__fieldset-wrapper">
                    <fieldset className="shoe-form__fieldset">
                        <legend className="shoe-form__legend">Chose one or more
                            category for the shoe
                        </legend>
                        {!!categoryOptions.length && categoryOptions.map(({
                                                                              categoryId,
                                                                              name
                                                                          }) => (
                            <Checkbox labelClassName="shoe-form__label"
                                      key={categoryId}
                                      name="categories" value={categoryId}
                                      label={name}
                                      handleChange={handleSettingIds}
                                      isChecked={isValueInCheckedIds(categoryId)}
                            />
                        ))}


                    </fieldset>
                    {!!errors.categories.length &&
                        <p className="shoe-form__fieldset-error">
                            {errors.categories.map(err => err)}
                        </p>}
                </div>
                {parsedShoeId && <Button
                    type={'button'}
                    className="shoe-form__button shoe-form__button--delete"
                    onClick={() => {
                        setIsModalOpen(true);
                    }}>Delete shoe</Button>}
                <Button
                    isLoading={isSubmitting}
                    variant={ButtonVariants.SUBMIT}
                    className="shoe-form__button"
                >Submit</Button>

            </form>
            <PasswordModal handleCorrectPasswordSubmit={handleShoeDeletion}
                           setIsOpen={setIsModalOpen}
                           isOpen={isModalOpen}/>

        </div>
    );
};

export default ShoeForm;