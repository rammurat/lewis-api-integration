import React from "react";
import styled from 'styled-components'

// load components
import ProductList from '../../components/product-list.js'

const MainContainerStyle = styled.div`
  color: #000;
  font-family: Verdana, Geneva, Tahoma, sans-serif
`;

const PSP = () => {
    return (
        <MainContainerStyle>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <ProductList />
                    </div>
                </div>
            </div>
        </MainContainerStyle>
    )
}

export default PSP
