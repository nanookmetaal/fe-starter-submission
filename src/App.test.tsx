import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders greeting text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello Nature Intel/i);
  expect(linkElement).toBeInTheDocument();
});
