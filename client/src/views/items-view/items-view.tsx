import '@views/items-view/items-view.scss';
import Button from "@components/button/button.tsx";
import {getAllShoes} from "@/services/shoe-services.ts";
import {useEffect, useState} from "react";
import {ShoeAPIType} from "@/types/shoe-types.ts";
import PreviewItem from "@components/preview-item/preview-item.tsx";
import ItemWrapper from "@components/item-wrapper/item-wrapper.tsx";


const ItemsView = () => {
    const [shoes, setShoes] = useState<ShoeAPIType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    console.log(shoes);

    useEffect(() => {
        const controller = new AbortController();
        const getShoes = async () => {
            try {
                setIsLoading(true);
                const shoesData = await getAllShoes(controller.signal);
                setShoes(shoesData);

            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);

            }
            getShoes();

            return () => {
                controller.abort();
            };
        };
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="items-view">
            <h2>All items</h2>
            <Button className="items-view__button" isNavlink path={'add-item'}>Add
                item</Button>
            <ItemWrapper>
                {!!shoes.length && shoes.map(({shoe_id, name, picture}) => (
                    <PreviewItem name={name} picture={picture}
                                 path={`${shoe_id}`}/>))}
            </ItemWrapper>

        </div>
    );
};

export default ItemsView;