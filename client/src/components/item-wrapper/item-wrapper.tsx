import {PropsWithChildren} from "react";
import '@components/item-wrapper/item-wrapper.scss';


const ItemWrapper = ({children}: PropsWithChildren) => {
    return (
        <div className="item-wrapper">
            {children}
        </div>
    );
};

export default ItemWrapper;