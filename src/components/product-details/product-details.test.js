// @ts-nocheck
import React from 'react'
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import Details from './product-details'
import toJson from 'enzyme-to-json'

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

const store = {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => {}
}

test('Loading product snapshot', () => {
    const props = {
        productDetails: {
            title: 'product A',
            currencySign: '£',
            priceNow: '20'
        },
        errMsg: '',
        isNoResult: false,
        isLoading: false,
    }
    const wrapper = shallow(<Provider store={store}><Details {...props} /></Provider>)
    expect(toJson(wrapper)).toMatchSnapshot()
});

test('Loading state snapshot', () => {
    const props = {
        productDetails: [],
        errMsg: '',
        isNoResult: false,
        isLoading: true
    }
    const wrapper = shallow(<Provider store={store}><Details {...props} /></Provider>)
    expect(toJson(wrapper)).toMatchSnapshot()
});

test('Error page snapshot', () => {
    const props = {
        productDetails: [],
        errMsg: 'There is an error from server',
        isNoResult: true,
        isLoading: false
    }
    const wrapper = shallow(<Provider store={store}><Details {...props} /></Provider>)
    expect(toJson(wrapper)).toMatchSnapshot()
});