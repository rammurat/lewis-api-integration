// @ts-nocheck
import React from 'react'
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import List from './product-list'

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
        }
    })
}

it('renders correctly', () => {
    const tree = renderer
        .create(<Provider store={store}><List /></Provider>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
