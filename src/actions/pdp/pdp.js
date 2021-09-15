import { PRODUCT_DETAILS, PRODUCT_ERROR, IS_NO_ITEMS, IS_LOADING } from './types.js';
import config from '../../app-config'

axios.defaults.baseURL = config.baseUrl;

import axios from 'axios'

// reset PSP data on filter change and initial load
export const updatePDP = (data) => dispatch => {
  const { productId, title, price, media, displaySpecialOffer, details, additionalServices, code } = data;
  const { now, currency } = price;
  let currencySign = '$';
  if(currency === 'GBP') {
    currencySign = '£';
  }
  const _data = {
    productId,
    title,
    priceNow: now,
    media,
    displaySpecialOffer,
    details,
    additionalServices,
    code,
    currency
  }

  const _items = !title;
  const _error = _items ? config.errorMsgs.noList : '';

  dispatch({
    type: PRODUCT_DETAILS,
    payload: _data
  })

  dispatch({
    type: PRODUCT_ERROR,
    payload: _error
  })
  dispatch({
    type: IS_NO_ITEMS,
    payload: _items
  })
};

const clearProducts = () => dispatch => {
  dispatch({
    type: PRODUCT_DETAILS,
    payload: {}
  })
}

// fetch latest products based on last filter action/default configuration
export const fetchProductDetails = (id) => dispatch => {
  // check for last client call, if it is same return without doing anything
  const currentCall = `${config.appUrls.pdp + id}`
  if(window && window.lastAjaxCall === currentCall) {
    return true;
  }

  // clear previous list before any call
  dispatch(clearProducts())
  
  try {
    dispatch({
      type: IS_LOADING,
      payload: true
    })
    window.lastAjaxCall = currentCall;

    axios.get(currentCall, {
      crossdomain: true
    })
      .then(function (response) {
        // update new records
        if (response.data) {
          dispatch(updatePDP(response.data))
        }
      })
      .finally(()=>{
        dispatch({
          type: IS_LOADING,
          payload: false
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  } catch (error) {
    console.error(error);
  }
};
