import { PRODUCT_LIST, INITIAL_CONFIG, PRODUCT_ERROR, IS_NO_ITEMS, IS_LOADING, PRODUCT_TOTAL, PRODUCT_HEADING } from '../../actions/psp/types.js';

// initial product state
export const initialState = {
  list: [],
  categoryTitle: '',
  totalProducts: 0,
  initialConfig: {
  },
  isNoResult: false,
  errMsg: '',
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST:
      return {
        ...state,
        list: action.payload
      };

    case PRODUCT_TOTAL:
      return {
        ...state,
        totalProducts: action.payload
      };

    case PRODUCT_HEADING:
      return {
        ...state,
        categoryTitle: action.payload
      };

    case INITIAL_CONFIG:
      return {
        ...state,
        initialConfig: action.payload
      };

    case PRODUCT_ERROR:
      return {
        ...state,
        errMsg: action.payload
      };

    case IS_NO_ITEMS:
      return {
        ...state,
        isNoResult: action.payload
      };
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };

    default:
      return state;
  }
}
