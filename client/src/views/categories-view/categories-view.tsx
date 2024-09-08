import {getAllCategories} from "@/services/category-services.ts";
import {useEffect, useState} from "react";
import {CategoryAPIType} from "@/types/category-types.ts";
import '@views/categories-view/categories-view.scss';
import Button from "@components/button/button.tsx";
import PreviewItem from "@components/preview-item/preview-item.tsx";

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
            <Button isNavlink path="add-category" className="categories__button">Add category</Button>
            <div className="categories__container">
                {!!categories.length && categories.map(({category_id, name, picture}) => (
                    <PreviewItem path={`${category_id}`} key={category_id} name={name} picture={picture}
                    />

                ))}
            </div>
        </div>
    );
};

export default CategoriesView;