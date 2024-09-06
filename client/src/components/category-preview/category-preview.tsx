import './category-preview.scss';
import {CategoryType} from "@/types/category-types.ts";
import previewImageSrc from '../../assets/images/category-placeholder.png';
import {NavLink} from "react-router-dom";

const CategoryPreview = ({name, picture, description, categoryId}: CategoryType) => {
    console.log(categoryId);
    return (
        <article className="category-preview">
            <NavLink className={'category-preview__link'} to={`/category/${categoryId}`}>
                <div className="category-preview__image-wrapper">
                    <img className="category-preview__image" src={picture || previewImageSrc} alt={name}/>
                </div>
                <div className="category-preview__info-wrap">
                    <h3>{name}</h3>
                    <p>{description || 'Category of shoe'}</p>
                </div>
            </NavLink>
        </article>
    )
        ;
};

export default CategoryPreview;