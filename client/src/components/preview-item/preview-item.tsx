import {NavLink} from "react-router-dom";
import previewImagePlaceholderSrc
    from "@/assets/images/category-placeholder.png";
import '@components/preview-item/preview-item.scss';
import {useRef} from "react";

type PreviewItemProps = {
    path: string,
    picture: string,
    name: string,

}

const PreviewItem = ({path, picture, name}: PreviewItemProps) => {
    const imageRef = useRef<HTMLImageElement | null>(null);
    return (
        <article className="preview-item">
            <NavLink className="preview-item__link" to={path}>
                <div className="preview-item__image-wrapper">
                    <img onLoad={() => {
                        if (!imageRef.current) {
                            return;
                        }
                        imageRef.current.classList?.remove("preview-item__image--loading");
                    }}
                         className="preview-item__image preview-item__image--loading"
                         src={previewImagePlaceholderSrc || picture}
                         ref={imageRef}
                         alt={name}/>
                </div>
                <div className="preview-item__info-wrap">
                    <h3>{name}</h3>
                </div>

            </NavLink>

        </article>
    );
};

export default PreviewItem;