import {RefObject, useEffect} from "react";

type useIntersectionObserverProps = {
    observedHTMLElement: RefObject<HTMLElement>,
    intersectingCallback: () => void,

}

const useIntersectionObserver = ({
                                     observedHTMLElement,
                                     intersectingCallback,
                                 }: useIntersectionObserverProps) => {

    useEffect(() => {
        const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
            if (!observedHTMLElement.current) {
                return;
            }

            const lastEntry = entries[entries.length - 1];
            if (lastEntry.isIntersecting) {
                intersectingCallback();
                observer.unobserve(observedHTMLElement.current);
            }
        };

        if (!observedHTMLElement.current) {
            return;
        }

        const observer = new IntersectionObserver(intersectionCallback);
        observer.observe(observedHTMLElement.current);

        return () => {
            observer.disconnect();
        };

    }, [observedHTMLElement, intersectingCallback]);

    return {
        observedHTMLElement
    };
};

export default useIntersectionObserver;