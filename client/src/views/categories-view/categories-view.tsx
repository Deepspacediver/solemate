import {getAllCategories} from "@/services/category-services.ts";
import {useEffect, useState} from "react";
import {CategoryAPIType} from "@/types/category-types.ts";
import '@views/categories-view/categories-view.scss';
import Button from "@components/button/button.tsx";
import PreviewItem from "@components/preview-item/preview-item.tsx";
import ItemWrapper from "@components/item-wrapper/item-wrapper.tsx";
import SkeletonPreview from "@components/skeleton-preview/skeleton-preview.tsx";

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


    return (
        <div className="categories">
            <h2 className="categories__heading">Categories of shoes</h2>

            <Button isNavlink path="add-category"
                    className="categories__button">Add category</Button>
            <ItemWrapper>
                {isLoading && Array.from({length: 8}).map((_, index) =>
                    <SkeletonPreview key={index}/>)}

                {!!categories.length && !isLoading && categories.map(({
                                                                          category_id,
                                                                          name,
                                                                          picture
                                                                      }) => (
                    <PreviewItem path={`${category_id}`}
                                 key={category_id}
                                 name={name} picture={picture}
                    />


                ))}
            </ItemWrapper>
        </div>
    );
};

export default CategoriesView;