import { render, screen } from '@testing-library/react';
import App from './App.jsx';

test('renders the h1 element', () => {
    render(<App />);

    const heading = screen.getByRole('heading', {
        name: /school dashboard/i,
    });

    expect(heading).toBeInTheDocument();
});

test('renders the correct paragraph texts', () => {
    render(<App />);

    expect(
        screen.getByText(/login to access the full dashboard/i)
    ).toBeInTheDocument();

    expect(
        screen.getByText(
            new RegExp(
                `Copyright ${new Date().getFullYear()} - holberton School`,
                'i'
            )
        )
    ).toBeInTheDocument();
});

test('renders the Holberton logo', () => {
    render(<App />);

    const image = screen.getByAltText(/holberton logo/i);

    expect(image).toBeInTheDocument();
});

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
