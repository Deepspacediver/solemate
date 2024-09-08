import {NavLink} from "react-router-dom";
import previewImagePlaceholderSrc from "@/assets/images/category-placeholder.png";
import '@components/preview-item/preview-item.scss';

type PreviewItemProps = {
    path: string,
    picture: string,
    name: string,

}

const PreviewItem = ({path, picture, name}: PreviewItemProps) => {
    return (
        <article className="preview-item">
            <NavLink className="preview-item__link" to={path}>
                <div className="preview-item__image-wrapper">
                    <img className="preview-item__image"
                         src={picture || previewImagePlaceholderSrc}
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