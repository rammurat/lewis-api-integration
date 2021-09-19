// @ts-nocheck
import React from 'react'
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import PDP from './pdp'

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

const store = {
    subscribe: () => { },
    dispatch: () => { },
    getState: () => ({
        products: {
            initialConfig: {
            }
        },
        isNoResult: false
    })
}

it('renders correctly', () => {
    const tree = renderer
        .create(<Provider store={store}><PDP /></Provider>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});