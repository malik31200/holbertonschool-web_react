import React from 'react';
import { render, screen } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

describe('BodySectionWithMarginBottom', () => {
    test('renders a div with the class bodySectionWithMargin', () => {
        render(
            <BodySectionWithMarginBottom title="test">
                <p>test</p>
            </BodySectionWithMarginBottom>,
        );

        const div = document.querySelector('.bodySectionWithMargin');

        expect(div).toBeInTheDocument();
    });

    test('renders the BodySection component', () => {
        render(
            <BodySectionWithMarginBottom title="test">
                <p>test</p>
            </BodySectionWithMarginBottom>,
        );

        const heading = screen.getByRole('heading', { level: 2 });

        expect(heading).toHaveTextContent('test');
    });
});

