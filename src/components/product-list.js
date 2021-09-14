import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/psp.js';
import styled from 'styled-components'

const ProductListStyle = styled.div`
  padding: 20px 0px;
  border-bottom: 1px solid #ccc;
`;

class List extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // load data on component ready
    this.props.fetchProducts();
  }

  render() {
    const totalProducts = this.props.totalProducts
    const products = this.props.products

    const productItems = products && products.map(product => (
      <div key={product.productId}>
        <ProductListStyle>
          <div className="row">
                <p><img src="{product.image}" /></p>
                <p>{product.title}</p>
                <p>{product.currency}{product.now}</p>
            </div>
        </ProductListStyle>
      </div>
    ));

    return (
      <div className='product-list'>
        <div className="row justify-content-end">
            {!!totalProducts &&
              <p><strong>{totalProducts}</strong></p>
            }
        </div>

        {this.props.isNoResult && <p className="alert alert-danger" role="alert">{this.props.errMsg}</p>}

        {/** Load PSP items */}
        {productItems && productItems.length && productItems}
        {this.props.isLoading &&
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>}
      </div >
    );
  }
}

List.propTypes = {
  fetchProducts: PropTypes.func.isRequired,
  products: PropTypes.array,
  errMsg: PropTypes.string,
  isNoResult: PropTypes.bool,
  isLoading: PropTypes.bool
};

const mapStateToProps = state => ({
  isNoResult: state.products.isNoResult,
  errMsg: state.products.errMsg,
  products: state.products.repos,
  isLoading: state.products.isLoading
});

export default connect(
  mapStateToProps,
  { fetchProducts }
)(List);
