import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../screens/Home';

it('renders correctly', () => {
  const tree = renderer.create(<Home></Home>).toJSON();
  expect(tree).toMatchSnapshot();
});
