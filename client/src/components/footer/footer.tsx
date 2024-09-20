import '@components/footer/footer.scss';
import CustomNavlink from "@components/custom-navlink/custom-navlink.tsx";
import githubSVG from '@/assets/icons/github-mark.svg';


const gitHubLink = "https://github.com/Deepspacediver/solemate";
const freepikLink = "https://www.freepik.com/";

const Footer = () => {
    return (
        <footer className="footer">
            <span className="footer__credit-wrapper">
            <p className="footer__paragraph">Created by Deepspacediver </p>
            <CustomNavlink className="footer__link footer__link--with-icon"
                           path={gitHubLink}>
                <img alt={'github project'} className="footer__icon"
                     src={githubSVG}/>
            </CustomNavlink>
                </span>

            <p>Images used from <CustomNavlink name={'freepik'}
                                               path={freepikLink}/>
            </p>
        </footer>
    );
};

export default Footer;