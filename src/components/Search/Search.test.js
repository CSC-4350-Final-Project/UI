/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { render, screen } from '@testing-library/react';
import Search from './Search';

// eslint-disable-next-line no-undef
test('renders search header', () => {
  const name = 'Search for an Event';

  render(<Search />);

  const nameElement = screen.getByText(name);
  expect(nameElement).toBeInTheDocument();
});
