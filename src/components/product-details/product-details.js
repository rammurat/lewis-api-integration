import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProductDetails } from '../../actions/pdp/pdp.js';
import Carousel from '../carousel/carousel'

class ProductDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const productId = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
    // load data on component ready
    this.props.fetchProductDetails(productId);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.productDetails !== this.props.productDetails) || (nextProps.isLoading !== this.props.isLoading);
  }

  render() {
    const productDetails = this.props.productDetails;
    const image = '\/\/johnlewis.scene7.com\/is\/image\/JohnLewis\/239968644?';
    const  productSpecs = this.props.productDetails.details && this.props.productDetails.details.features;
    const features = productSpecs && productSpecs[0].attributes || []
    const guaranteeServices = (productDetails.additionalServices && productDetails.additionalServices.includedServices) || [];

    const _productSpecs = features && features.map((specs,index) => (
      <div className="item" key={index}>
        <div className="key">{specs.name}</div>
        <div className="value">{specs.value}</div>
      </div>
    ));
    const images = (productDetails.media && productDetails.media.images.urls) || [];

    const _guaranteeServices = guaranteeServices.length && guaranteeServices.map((specs, index) => (
      <p key={index}>{specs}</p>
    ));

    function createMarkup(_html) {
      return {__html: _html};
    }

    return (
      <div className='pdp-page-cnt'>
        <div className="pdp-page-cnt__heading">
            {productDetails.title}
        </div>

        {/* Load PDP items */}
        <section className="pdp-page-cnt__details">
          {this.props.isNoResult && <p className="alert alert-danger" role="alert">{this.props.errMsg}</p>}

          {this.props.isLoading &&
            <div className="loader" role="status">
              Loading...
            </div>
          }
          
          <div className="product-image">
            <Carousel slides={images} />
          </div>

          <div className="product-pricing">
            <div className="product-pricing__price">{productDetails.currencySign}{productDetails.priceNow}</div>
            {guaranteeServices.length ? _guaranteeServices : false}
          </div>

          <div className="product-information">
            <h3>Product information</h3>
            <div className="product-information__product-html" dangerouslySetInnerHTML={createMarkup(productDetails.details && productDetails.details.productInformation)} />
            <h4>Product code: 34234234</h4>

            <h3 className="product-information__specs-heading">Product specification</h3>
            <div className="product-specification">
              {productSpecs && productSpecs.length ? _productSpecs : false}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  fetchProductDetails: PropTypes.func.isRequired,
  productDetails: PropTypes.object,
  errMsg: PropTypes.string,
  isNoResult: PropTypes.bool,
  isLoading: PropTypes.bool,
};

const mapStateToProps = state => ({
  isNoResult: state.pdp.isNoResult,
  errMsg: state.pdp.errMsg,
  productDetails: state.pdp.productDetails,
  isLoading: state.pdp.isLoading
});

export default connect(
  mapStateToProps,
  { fetchProductDetails }
)(ProductDetails);
