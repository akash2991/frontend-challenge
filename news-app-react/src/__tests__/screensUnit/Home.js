import React from 'react';
import { render } from '@testing-library/react';
import Home from '../../screens/Home';
import { shallow } from 'enzyme';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// describe('', () => {});

// test('render App without crashing', () => {});

it('should render without crashing', () => {
  shallow(<Home />);
  //   const wrapper = shallow(<Home />);
  //   console.log(wrapper.debug());
});
