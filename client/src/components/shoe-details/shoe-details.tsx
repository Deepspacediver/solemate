import '@components/shoe-details/shoe-details.scss';
import {ShoeWithCategoriesType} from "@/types/shoe-types.ts";
import {useEffect, useState} from "react";
import {getShoeById} from "@/services/shoe-services.ts";
import {useParams} from "react-router-dom";
import {AxiosError} from "axios";
import placeholderImgSource from '@/assets/images/category-placeholder.png';
import Button from "@components/button/button.tsx";


const ShoeDetails = () => {
    const [shoeData, setShoeData] = useState<ShoeWithCategoriesType | null>(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const {shoeId} = useParams();
    const parsedShoeId = shoeId ? +shoeId : null;

    useEffect(() => {
        const abortController = new AbortController();
        const getShoeDetails = async () => {
            if (!parsedShoeId) {
                return;
            }
            try {
                setIsLoading(true);
                const data = await getShoeById(parsedShoeId, abortController.signal);
                setShoeData(data);

            } catch (err) {
                const error = err as AxiosError;
                const errorData = error?.response?.data as { error: string };
                setError(errorData?.error ?? error.message != 'canceled' ? error.message : '    ');
            } finally {
                setIsLoading(false);
            }
        };

        getShoeDetails();

        return () => {
            abortController.abort();
        };
    }, [parsedShoeId]);


    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="shoe-details">
            {!!error && <p className="shoe-details__error">{error}</p>}
            <div className="shoe-details__info">
                <div className="shoe-details__image-wrapper">
                    <img alt={shoeData?.name}
                         src={!shoeData?.picture ? placeholderImgSource : shoeData.picture}/>
                </div>
                <div className="shoe-details__details">
                    <h2>{shoeData?.name}</h2>
                    <p>{shoeData?.description}</p>
                    {!!shoeData?.categories.length && <h3>Categories</h3>}
                    <ul className="shoe-details__categories-list">
                        {!!shoeData?.categories.length && shoeData.categories.map(({name}) => {
                            return <li
                                className="shoe-details__category-item">{name}</li>;
                        })}

                    </ul>
                </div>
            </div>
            <Button className="shoe-details__button" isNavlink path="edit-shoe">Edit
                shoe</Button>
        </div>
    );
};

export default ShoeDetails;