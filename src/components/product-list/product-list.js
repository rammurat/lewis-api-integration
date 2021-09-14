import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProducts } from '../../actions/psp.js';

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
            <section className="products">
              <div className="product-card">
                <div className="product-image">
                  <img src={product.image} />
                </div>
                <div className="product-info">
                  <h5>{product.title}</h5>
                  <h6>{product.currencySign}{product.now}</h6>
                </div>
              </div>
            </section>
      </div>
    ));

    return (
      <div className='product-cnt'>
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
          </div>
        }
      </div>
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
