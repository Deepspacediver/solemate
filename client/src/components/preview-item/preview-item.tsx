import {NavLink} from "react-router-dom";
import previewImagePlaceholderSrc
    from "@/assets/images/category-placeholder.png";
import '@components/preview-item/preview-item.scss';
import LoadImage from "@components/load-image/load-image.tsx";
import {forwardRef} from "react";

type PreviewItemProps = {
    path: string,
    picture: string,
    name: string,

}

const PreviewItem = forwardRef<HTMLElement, PreviewItemProps>(({
                                                                   path,
                                                                   picture,
                                                                   name
                                                               }, ref) => {
    return (
        <article className="preview-item" ref={ref}>
            <NavLink className="preview-item__link" to={path}>
                <LoadImage wrapperClassName="preview-item__image-wrapper"
                           imageClassName="preview-item__image"
                           src={picture || previewImagePlaceholderSrc}
                           altText={name}/>
                <div className="preview-item__info-wrap">
                    <h3>{name}</h3>
                </div>

            </NavLink>

        </article>
    );
});

export default PreviewItem;