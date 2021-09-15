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
      <div className="product-card" key={product.productId}>
        <div className="product-card__image">
          <img src={product.image} />
        </div>
        <div className="product-card__info">
          <h5>{product.title}</h5>
          <p>{product.displaySpecialOffer}</p>
          <h6>{product.currencySign}{product.now}</h6>
        </div>
      </div>
    ));

    return (
      <div className='psp-page-cnt'>
        <div className="psp-page-cnt__heading">
            {!!totalProducts &&
              <h1>{this.props.categoryTitle} ({totalProducts})</h1>
            }
        </div>

        {/* {this.props.isNoResult && <p className="alert alert-danger" role="alert">{this.props.errMsg}</p>} */}

        {/** Load PSP items */}
        <section className="psp-page-cnt__list">
          {productItems && productItems.length && productItems}
        </section>
        
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
  isLoading: PropTypes.bool,
  totalProducts: PropTypes.number,
  categoryTitle: PropTypes.string
};

const mapStateToProps = state => ({
  isNoResult: state.psp.isNoResult,
  errMsg: state.psp.errMsg,
  products: state.psp.list,
  isLoading: state.psp.isLoading,
  totalProducts: state.psp.totalProducts,
  categoryTitle: state.psp.categoryTitle
});

export default connect(
  mapStateToProps,
  { fetchProducts }
)(List);
