import SkeletonPreview from "@components/skeleton-preview/skeleton-preview.tsx";

export const showSkeletonsWhileLoading = () => {
    return Array.from({length: 8}).map((_, index) =>
        <SkeletonPreview key={index}/>);
};