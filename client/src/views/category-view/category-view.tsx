import '@views/category-view/category-view.scss';
import {useEffect, useState} from "react";
import {getCategoryWithShoes} from "@/services/category-services.ts";
import {useParams} from "react-router-dom";
import {CategoryWithShoesAPIType} from "@/types/category-types.ts";
import PreviewItem from "@components/preview-item/preview-item.tsx";
import ItemWrapper from "@components/item-wrapper/item-wrapper.tsx";
import Button, {ButtonVariants} from "@components/button/button.tsx";
import {
    showSkeletonsWhileLoading
} from "@/helpers/show-skeletons-while-loading.tsx";


const CategoryView = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [categoryWithShoes, setCategoryWithShoes] = useState<CategoryWithShoesAPIType | null>(null);
    const {categoryId} = useParams();
    const parsedCategoryId = categoryId ? +categoryId : null;

    useEffect(() => {
        const abortController = new AbortController();
        const getShoesFromCategory = async () => {
            if (!parsedCategoryId) {
                setIsLoading(false);
                return;
            }

            try {
                const data = await getCategoryWithShoes(parsedCategoryId, abortController.signal);
                setCategoryWithShoes(data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        getShoesFromCategory();

        return () => {
            abortController.abort();
        };

    }, []);


    const {
        name: categoryName,
        description: categoryDescription
    } = categoryWithShoes?.category ?? {};
    const shoesArray = categoryWithShoes?.shoes ?? [];

    return (
        <div className="category-view">
            <div className="category-view__info">
                <h2 className="category-view__heading">{categoryName ?? ''}</h2>
                <p className="category-view__description">{categoryDescription ?? ''}</p>
            </div>
            <div className="category-view__button-container">
                <Button className="category-view__button"
                        variant={ButtonVariants.PRIMARY} isNavlink
                        path="edit-category">Edit
                    category</Button>
                <Button className="category-view__button"
                        variant={ButtonVariants.PRIMARY} isNavlink
                        path="/shoes/add-shoe"
                        state={{categoryId: parsedCategoryId}}>Add shoe to
                    category</Button>
            </div>

            <ItemWrapper>
                {isLoading && showSkeletonsWhileLoading()}
                {!!shoesArray.length && shoesArray.map(({
                                                            shoe_id,
                                                            picture,
                                                            name
                                                        }) => {
                    return <PreviewItem key={shoe_id} path={`/shoes/${shoe_id}`}
                                        name={name} picture={picture}/>;
                })}

            </ItemWrapper>

        </div>
    );
};

export default CategoryView;