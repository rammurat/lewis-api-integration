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

test('validate HTML', () => {
    const props = {
        products: {
            initialConfig: {
                isLoading: false
            }
        },
        isNoResult: false
    }
    const wrapper = shallow(<Provider store={store}><Details {...props} /></Provider>)
    expect(toJson(wrapper)).toMatchSnapshot()
});