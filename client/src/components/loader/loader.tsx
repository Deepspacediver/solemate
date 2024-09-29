import '@components/loader/loader.scss';

export const LoaderSVG = ({className}: { className?: string }) => <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg" width="24"
    height="24"
    viewBox="0 0 24 24" fill="none" stroke="#000000"
    strokeWidth="2" strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M21 12a9 9 0 11-6.219-8.56"/>
</svg>;


const Loader = () => {
    return (
        <div className="loader">
            <LoaderSVG className="loader__icon"/>
        </div>
    );
};

export default Loader;