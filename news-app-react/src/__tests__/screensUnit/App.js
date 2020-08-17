import React from 'react';
import App from '../../App';
import { shallow } from 'enzyme';

it('should render without crashing', () => {
  shallow(<App />);
});
