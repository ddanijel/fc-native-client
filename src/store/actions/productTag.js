import {SCAN_PRODUCT_TAG} from "src/store/actions/actions";


export const getProductTagData = (productTagHash) => {
    return {
        type: SCAN_PRODUCT_TAG
    };
};