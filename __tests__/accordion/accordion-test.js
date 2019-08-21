import React from 'react'
import { shallow } from '../enzyme';
import Accordion from '../../src/components/accordion/Accordion';
import Tab from '../../src/components/accordion/Tab';

const config = require('../../src/components/accordion/accordion.config');


describe('<Accordion />', () => {
  it('renders <Accordion /> component', () => {
    const wrapper = shallow(<Accordion config={ config } />);
    expect(wrapper.find(Tab).length).toBe(2);
  });
});
