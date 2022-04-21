/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import App from './App';

// eslint-disable-next-line no-undef
test('renders header sentence', () => {
  // eslint-disable-next-line react/react-in-jsx-scope
  render(<App />);
  const h4Element = screen.getByText('Upcoming events');
<<<<<<< HEAD
=======
  // eslint-disable-next-line no-undef
>>>>>>> favorites
  expect(h4Element).toBeInTheDocument();
});
