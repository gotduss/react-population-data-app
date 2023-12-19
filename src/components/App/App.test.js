import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Population of the world heading', () => {
  render(<App />);
  const linkElement = screen.getByText(/Population of the world/i);
  expect(linkElement).toBeInTheDocument();
});
