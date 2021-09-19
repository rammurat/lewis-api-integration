// @ts-nocheck
import React from 'react'
import { Provider } from 'react-redux'
import List from './product-list'
import toJson from 'enzyme-to-json'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const store = {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => {}
}

test('Loading products snapshot', () => {
    const props = {
        products: [{
            productId: 1,
            image: './cat.jpeg',
            title: 'currencySign',
            currencySign: '£',
            priceNow: '20'
        }, {
            productId: 2,
            image: './mouse.jpeg',
            title: 'currencySign',
            currencySign: '£',
            priceNow: '40'
        }],
        errMsg: '',
        isNoResult: false,
        isLoading: false,
        totalProducts: 1,
        categoryTitle: "Title 1"
    }
    const wrapper = shallow(<Provider store={store}><List {...props} /></Provider>)
    expect(toJson(wrapper)).toMatchSnapshot()
});

test('Loading state snapshot', () => {
    const props = {
        products: [],
        errMsg: '',
        isNoResult: false,
        isLoading: true,
        totalProducts: 0,
        categoryTitle: ""
    }
    const wrapper = shallow(<Provider store={store}><List {...props} /></Provider>)
    expect(toJson(wrapper)).toMatchSnapshot()
});

test('Error page snapshot', () => {
    const props = {
        products: [],
        errMsg: 'There is an error from server',
        isNoResult: true,
        isLoading: false,
        totalProducts: 0,
        categoryTitle: ""
    }
    const wrapper = shallow(<Provider store={store}><List {...props} /></Provider>)
    expect(toJson(wrapper)).toMatchSnapshot()
});
