import '@components/shoe-form/shoe-form.scss';
import {z, ZodError} from "zod";
import Checkbox from "@components/checkbox/checkbox.tsx";
import {useEffect, useState} from "react";
import Button from "@components/button/button.tsx";
import Input from "@components/input/input.tsx";
import Textarea from "@components/textarea/textarea.tsx";
import {getAllCategories} from "@/services/category-services.ts";
import {CategoryOption} from "@/types/category-types.ts";
import {createShoe} from "@/services/shoe-services.ts";
import {CreateShoeType} from "@/types/shoe-types.ts";
import {AxiosError} from "axios";

const shoeSchema = z.object({
    name: z.string().min(5, "Name must have at least 5 characters"),
    description: z.string().min(5, "Description must have at least 5 characters"),
    picture: z.union([z.string().url({message: 'Picture must be a link'}
    ), z.literal(
        '')]),
    categories: z.coerce.number().array().nonempty({message: 'Shoe must have at least one category'})
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
    const [isLoading, setIsLoading] = useState(false);
    console.log(categoryOptions);
    const [checkedIds, setCheckedIds] = useState<number[]>([]);
    const [errors, setErrors] = useState<ShoeFormErrors>({
        name: [],
        description: [],
        picture: [],
        categories: [],
        globalError: '',
    });

    const isValueInCheckedIds = (id: number) => {
        return checkedIds.includes(id);
    };

    const setGlobalError = (error: AxiosError) => {
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

    useEffect(() => {
        const abortController = new AbortController();
        const getCategoryOptions = async () => {
            try {
                setIsLoading(true);
                const categories = await getAllCategories(abortController.signal);
                const categoriesAsOptions = categories.map(({
                                                                category_id,
                                                                name
                                                            }) => ({
                    categoryId: category_id,
                    name
                }));
                setCategoryOptions(categoriesAsOptions);
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
        return <div>Loading...</div>;
    }


    return (
        <div className="shoe-form">
            <h2>Shoe form</h2>
            {!!errors.globalError &&
                <p className="shoe-form__global-error">{errors.globalError}</p>}
            <form className="shoe-form__form" onSubmit={async (e) => {
                e.preventDefault();
                try {
                    const shoeFormData = new FormData(e.currentTarget);
                    const shoeDataObject = Object.fromEntries(shoeFormData);
                    const dataToSend = {
                        ...shoeDataObject,
                        categories: shoeFormData.getAll('categories').map(id => +id)
                    } as CreateShoeType;

                    shoeSchema.parse(dataToSend);
                    await createShoe(dataToSend);

                } catch (err) {
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
                <Input name="name" required labelName={'Name'}
                       errors={errors.name}/>
                <Input name="picture" labelName={'Picture (url)'}
                       errors={errors.picture}/>
                <Textarea rows={6} name="description" required
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
                <Button className="shoe-form__button">Submit</Button>
            </form>

        </div>
    );
};

export default ShoeForm;