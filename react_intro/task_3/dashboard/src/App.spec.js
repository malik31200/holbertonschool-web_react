import { render, screen } from '@testing-library/react';
import App from './App.jsx';

test('renders 2 input elements', () => {
    render(<App />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test('renders Email and Password label', () => {
    render(<App />);

    expect(
        screen.getByText(/email/i, {selector: 'label'})).toBeInTheDocument();
    expect(
        screen.getByText(/password/i, {selector: 'label'})).toBeInTheDocument();
});

test('renders OK button', () => {
    render(<App />);

    expect(
        screen.getByRole('button', { name: /ok/i })
    ).toBeInTheDocument();
});
