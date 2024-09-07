import {getAllCategories} from "@/services/category-services.ts";
import {useEffect, useState} from "react";
import {CategoryAPIType} from "@/types/category-types.ts";
import CategoryPreview from "@components//category-preview/category-preview.tsx";
import '@views/categories-view/categories-view.scss';

const CategoriesView = () => {
    const [categories, setCategories] = useState<CategoryAPIType[]>([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const controller = new AbortController();

        const getCategories = async () => {
            try {
                setIsLoading(true);
                const categories = await getAllCategories(controller.signal);
                setCategories(categories);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        getCategories();
        return () => {
            controller.abort();
        };
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="categories">
            <h2 className="categories__heading">Categories of shoes</h2>
            <div className="categories__container">
                {!!categories.length && categories.map(({category_id, name, picture, description}) => (
                    <CategoryPreview key={category_id} categoryId={category_id} name={name} picture={picture}
                                     description={description}/>

                ))}
            </div>
        </div>
    );
};

export default CategoriesView;