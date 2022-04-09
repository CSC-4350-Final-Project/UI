import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header sentence', () => {
  render(<App />);
  const h4Element = screen.getByText("Upcoming events");
  expect(h4Element).toBeInTheDocument();
});
