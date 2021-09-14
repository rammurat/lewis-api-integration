import React from "react";

// load components
import ProductList from '../../components/product-list/product-list.js';

import './psp.scss';

const PSP = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <ProductList />
                </div>
            </div>
        </div>
    )
}

export default PSP
