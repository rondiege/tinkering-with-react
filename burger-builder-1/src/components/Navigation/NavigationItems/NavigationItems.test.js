import React from "react";
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from '../NavigationItem/NavigationItem';

configure({adapter: new Adapter()});
// This prints to the console
describe('<NavigationItems />', () => {
    let wrapper;
    // do this for when an "it" uses the same thing multiple times
    beforeEach(() => {
        wrapper = shallow(<NavigationItems itakepropstoo={'hello'}/>);
        //then if "it" needs new props then in the 'it' function do this:
        //  wrapper.setProps({propName:value});
    });

    // Writing this pre adding authentication
    it('should render two <NavigationItem/>', () => {
        // Shallow partially renders the container, it requires jsx
        // const wrapper = shallow(<NavigationItems itakepropstoo={'hello'}/>);

        // expect cannot have jsx
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should contain a nav link with the word Checkout', () => {
        expect(wrapper.contains(<NavigationItem link="/">Checkout</NavigationItem>)).toEqual(true);
    });
});
