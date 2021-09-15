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

          <div className="">
            <img src={productDetails.media} />
          </div>

          <p>{productDetails.currencySign}{productDetails.now}</p>

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
