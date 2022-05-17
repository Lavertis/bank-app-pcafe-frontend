import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import {BrowserRouter} from "react-router-dom";

test('renders bank app navbar brand', () => {
  render(<BrowserRouter><App/></BrowserRouter>);
  const linkElement = screen.getByText(/Bank App/i);
  expect(linkElement).toBeInTheDocument();
});
