import SkeletonPreview from "@components/skeleton-preview/skeleton-preview.tsx";

export const showSkeletonsWhileLoading = (arrayLength = 8) => {
    return Array.from({length: arrayLength}).map((_, index) =>
        <SkeletonPreview key={index}/>);
};