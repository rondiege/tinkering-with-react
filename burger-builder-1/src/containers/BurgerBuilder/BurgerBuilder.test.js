import BurgerBuilder from "./BurgerBuilder";
import  BuildControls from "../../components/Burger/BuildControls/BuildControls"

import React from "react";
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});
// This prints to the console
describe('<BurgerBuilder />', () => {
    let wrapper;
    // do this for when an "it" uses the same thing multiple times
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder />);
    });

    it('should render <BuildControls /> when receiving ingredients', () => {
        // wrapper.setState({ingredients: {salad : 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(0);
    });

});


