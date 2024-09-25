import '@components/load-image/load-image.scss';
import {useState} from "react";
import clsx from "clsx";

type LoadImageProps = {
    src: string,
    altText: string,
    wrapperClassName?: string,
    imageClassName?: string
}

const LoadImage = ({
                       src,
                       altText,
                       wrapperClassName,
                       imageClassName
                   }: LoadImageProps) => {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <div
            className={clsx("load-image", isLoading && "load-image--loading", wrapperClassName)}>
            <img
                className={clsx('load-image__img', isLoading && 'load-image__img--loading', imageClassName)}
                src={src} alt={altText}
                onLoad={() => {
                    setIsLoading(false);
                }}/>
        </div>
    );
};

export default LoadImage;