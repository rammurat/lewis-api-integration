// @ts-nocheck
import * as types from '../../actions/pdp/types';
import reducer, {initialState} from './pdp'
import config from '../../app-config'

describe('actions', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should check if no items has been set', () => {
        const action = {
            type: types.IS_NO_ITEMS,
            payload: true
        }

        const expectedAction = {
            ...initialState,
            isNoResult: true
        }
        expect(reducer(undefined, action)).toEqual(expectedAction)
    })

    it('should check for error message', () => {
        const action = {
            type: types.PRODUCT_ERROR,
            payload: config.errorMsgs.noList
        }

        const expectedAction = {
            ...initialState,
            errMsg: config.errorMsgs.noList
        }
        expect(reducer(undefined, action)).toEqual(expectedAction)
    })

    it('should add item to list', () => {
        const data = {
            id: 11
        }
        const action = {
            type: types.PRODUCT_DETAILS,
            payload: [data]
        }

        const expectedAction = {
            ...initialState,
            productDetails: [data]
        }
        expect(reducer(undefined, action)).toEqual(expectedAction)
    })
})