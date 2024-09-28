import '@views/shoes-view/shoes-view.scss';
import Button from "@components/button/button.tsx";
import {getAllShoes} from "@/services/shoe-services.ts";
import {useEffect, useRef, useState} from "react";
import {ShoeAPIType} from "@/types/shoe-types.ts";
import PreviewItem from "@components/preview-item/preview-item.tsx";
import ItemWrapper from "@components/item-wrapper/item-wrapper.tsx";
import {
    showSkeletonsWhileLoading
} from "@/helpers/show-skeletons-while-loading.tsx";
import useFetchOnScroll from "@/hooks/use-intersection-observer.tsx";


const ShoesView = () => {
    const [shoes, setShoes] = useState<ShoeAPIType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [lastShoeId, setLastShoeId] = useState<number | undefined>();
    const [areAllShoesFetched, setAreAllShoesFetched] = useState(true);

    const lastShoeHTLMItemRef = useRef<HTMLElement>(null);

    const shoesFetchLimit = 15;

    useEffect(() => {
        if (!areAllShoesFetched) {
            return;
        }
        const controller = new AbortController();
        const getShoes = async () => {
            try {
                setIsLoading(true);
                const shoesData = await getAllShoes(controller.signal, lastShoeId);
                if (shoesData.length < shoesFetchLimit) {
                    setAreAllShoesFetched(false);
                }
                setShoes((prevShoes) => [...prevShoes, ...shoesData]);

            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        getShoes();

        return () => {
            controller.abort();
        };

    }, [lastShoeId]);

    const onIntersecting = () => {
        if (!shoes.length) {
            return;
        }
        setLastShoeId(shoes[shoes.length - 1]?.shoe_id ?? null);
    };


    useFetchOnScroll({
        observedHTMLElement: lastShoeHTLMItemRef,
        intersectingCallback: onIntersecting,
    });

    return (
        <div className="shoes-view">
            <h2 className="shoes-view__heading">All shoes</h2>
            <Button className="shoes-view__button" isNavlink path={'add-shoe'}>Add
                shoe</Button>
            <ItemWrapper>
                {!!shoes.length && shoes.map(({
                                                  shoe_id,
                                                  name,
                                                  picture
                                              }, index) => (
                    <PreviewItem key={shoe_id} name={name} picture={picture}
                                 path={`${shoe_id}`}
                                 ref={index === shoes.length - 1 ? lastShoeHTLMItemRef : null}
                    />))}
                {isLoading && showSkeletonsWhileLoading(5)}
            </ItemWrapper>
        </div>
    );
};

export default ShoesView;