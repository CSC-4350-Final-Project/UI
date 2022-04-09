import { render, screen } from '@testing-library/react';
import Search from './Search';

test('renders search header', () => {
  const name = 'Search for an Event';

  render(<Search />);

  const nameElement = screen.getByText(name);
  expect(nameElement).toBeInTheDocument();
});
