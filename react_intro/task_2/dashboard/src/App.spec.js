import { render, screen } from '@testing-library/react';
import App from './App.jsx';

test('renders the h1 element', () => {
    render(<App />);

    const heading = screen.getByRole('heading', {
        name: /school dashboard/i,
    });

    expect(heading).toBeInTheDocument();
});

test('rebders the correct paragraph texts', () => {
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
