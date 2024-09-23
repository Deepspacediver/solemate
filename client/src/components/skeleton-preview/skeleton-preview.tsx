import clsx from "clsx";
import '@components/skeleton-preview/skeleton-preview.scss';

type SkeletonWrapperProps = {}

const SkeletonPreview = ({}: SkeletonWrapperProps) => {
    return (
        <div className={clsx('skeleton-preview')}>
            <div className="skeleton-preview__image"></div>
            <div className="skeleton-preview__text"></div>
        </div>
    );
};

export default SkeletonPreview;