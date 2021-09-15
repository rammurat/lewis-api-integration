import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProductDetails } from '../../actions/pdp/pdp.js';
import config from '../../app-config'

class ProductDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const productId = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
    // load data on component ready
    this.props.fetchProductDetails(productId);
  }

  render() {
    const productDetails = this.props.productDetails;

    // const productItems = productDetails && productDetails.map(product => (
    //   <div className="product-card" key={product.productId}>
    //     <a href={config.appUrls.pdp + product.productId}>
    //       <div className="product-card__image">
    //         <img src={product.image} />
    //       </div>
    //       <div className="product-card__info">
    //         <h3>{product.title}</h3>
    //         <h6>{product.currencySign}{product.now}</h6>
    //       </div>
    //     </a>
    //   </div>
    // ));

    return (
      <div className='psp-page-cnt'>
        <div className="psp-page-cnt__heading">
            {}
        </div>

        {this.props.isNoResult && <p className="alert alert-danger" role="alert">{this.props.errMsg}</p>}

        {/* Load PSP items */}
        <section className="psp-page-cnt__list">
          {this.props.isLoading &&
            <div className="loader" role="status">
              Loading...
            </div>
          }

          {productDetails ? productDetails : false}
        </section>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  fetchProductDetails: PropTypes.func.isRequired,
  productDetails: PropTypes.array,
  errMsg: PropTypes.string,
  isNoResult: PropTypes.bool,
  isLoading: PropTypes.bool,
};

const mapStateToProps = state => ({
  isNoResult: state.psp.isNoResult,
  errMsg: state.psp.errMsg,
  productDetails: state.psp.productDetails,
  isLoading: state.psp.isLoading
});

export default connect(
  mapStateToProps,
  { fetchProductDetails }
)(ProductDetails);
