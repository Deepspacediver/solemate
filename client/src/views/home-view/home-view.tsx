import heroImageSrc from '@/assets/images/hero-shoe.jpg';
import '@views/home-view/home-view.scss';
import Button from "@components/button/button.tsx";
import LoadImage from "@components/load-image/load-image.tsx";

const HomeView = () => {

    return (
        <div className="home-view">
            <LoadImage wrapperClassName={'home-view__image-wrapper'}
                       src={heroImageSrc} altText="white sneakers on feet"/>
            <div className="home-view__info">
                <h2>Welcome to Solemate</h2>
                <p>Explore shoes and its categories</p>
                <div className="home-view__button-wrapper">
                    <Button isNavlink path="/shoes">Shoes</Button>
                    <Button isNavlink path="/categories">Categories</Button>
                </div>
            </div>
        </div>
    );
};

export default HomeView;