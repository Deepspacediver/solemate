import {getAllCategories} from "@/services/category-services.ts";
import {useEffect, useRef, useState} from "react";
import {CategoryAPIType} from "@/types/category-types.ts";
import '@views/categories-view/categories-view.scss';
import Button from "@components/button/button.tsx";
import PreviewItem from "@components/preview-item/preview-item.tsx";
import ItemWrapper from "@components/item-wrapper/item-wrapper.tsx";
import {
    showSkeletonsWhileLoading
} from "@/helpers/show-skeletons-while-loading.tsx";
import {FETCH_LIMIT} from "@views/shoes-view/shoes-view.tsx";
import useIntersectionObserver from "@/hooks/use-intersection-observer.tsx";

const CategoriesView = () => {
    const [categories, setCategories] = useState<CategoryAPIType[]>([]);
    const [areAllCategoriesLoaded, setAreaAllCategoriesLoaded] = useState(false);
    const [lastCategoryId, setLastCategoryId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const lastPreviewItemRef = useRef<HTMLElement>(null);


    useEffect(() => {
        if (areAllCategoriesLoaded) {
            return;
        }
        const controller = new AbortController();

        const getCategories = async () => {
            try {
                setIsLoading(true);
                const fetchedCategories = await getAllCategories(controller.signal, lastCategoryId, FETCH_LIMIT);
                if (fetchedCategories.length < FETCH_LIMIT) {
                    setAreaAllCategoriesLoaded(true);
                }
                setCategories((prevCategories) => [...prevCategories, ...fetchedCategories]);
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
    }, [lastCategoryId]);

    const onIntersecting = () => {
        if (!categories.length) {
            return;
        }
        setLastCategoryId(categories[categories.length - 1].category_id);
    };

    useIntersectionObserver({
        observedHTMLElement: lastPreviewItemRef,
        intersectingCallback: onIntersecting
    });

    return (
        <div className="categories">
            <h2 className="categories__heading">Categories of shoes</h2>

            <Button isNavlink path="add-category"
                    className="categories__button">Add category</Button>
            <ItemWrapper>
                {!!categories.length && categories.map(({
                                                            category_id,
                                                            name,
                                                            picture
                                                        }, index) => (
                    <PreviewItem path={`${category_id}`}
                                 key={category_id}
                                 name={name} picture={picture}
                                 ref={index === categories.length - 1 ? lastPreviewItemRef : null}
                    />
                ))}
                {isLoading && showSkeletonsWhileLoading(5)}
            </ItemWrapper>
        </div>
    );
};

export default CategoriesView;