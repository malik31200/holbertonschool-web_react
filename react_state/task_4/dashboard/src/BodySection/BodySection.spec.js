import React from 'react';
import { render, screen } from '@testing-library/react';
import BodySection from './BodySection';

describe('BodySection', () => {
    test('renders a heading with the title prop value', () => {
        render(<BodySection title="test" />);

        const heading = screen.getByRole('heading', { level: 2 });

        expect(heading).toHaveTextContent('test');
    });

    test('renders any number of children passed to it', () => {
        render(
            <BodySection title="test">
                <p>First child</p>
                <p>Second child</p>
                <p>Third child</p>
            </BodySection>,
        );

        expect(screen.getByText('First child')).toBeInTheDocument();
        expect(screen.getByText('Second child')).toBeInTheDocument();
        expect(screen.getByText('Third child')).toBeInTheDocument();
    });
});
