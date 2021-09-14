import { PRODUCT_LIST, PRODUCT_ERROR, IS_NO_ITEMS, IS_LOADING } from './types.js';
import config from '../app-config'

axios.defaults.baseURL = config.baseUrl;

import axios from 'axios'

// reset PSP data on filter change and initial load
export const updatePSP = (data) => dispatch => {
  const _data = data.products.map((obj) => {
    const { productId, title, price, image } = obj
    const { now, currency } = price

    return {
      productId, title, image, now, currency
    }
  })

  const _items = _data && !_data.length
  const _error = _items ? config.errorMsgs.noList : ''

  dispatch({
    type: PRODUCT_LIST,
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
    type: PRODUCT_LIST,
    payload: []
  })
}

// fetch latest products based on last filter action/default configuration
export const fetchProducts = () => dispatch => {
  // check for last client call, if it is same return without doing anything
  const currentCall = `${config.appUrls.search}`
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
    window.lastAjaxCall = currentCall
    axios.get(config.appUrls.search, {
      crossdomain: true
    })
      .then(function (response) {
        // update new records
        if (response.data ? response.data  : []) {
          dispatch(updatePSP(response.data))
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

