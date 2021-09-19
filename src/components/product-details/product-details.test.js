// @ts-nocheck
import React from 'react'
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import Details from './product-details'

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

const store = {
    subscribe: () => { },
    dispatch: () => { },
    getState: () => ({
        products: {
            initialConfig: {
                isLoading: false
            }
        },
        isNoResult: false
    })
}

it('renders correctly', () => {
    const tree = renderer
        .create(<Provider store={store}><Details /></Provider>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
