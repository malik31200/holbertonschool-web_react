import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import WithLogging from './WithLogging';

class MockApp extends React.Component {
    render() {
        return (
            <h1>
                Hello from Mock App Component
            </h1>
        );
    }
}

const WrappedComponent = WithLogging(MockApp);

describe('WithLogging', () => {
    afterEach(() => {
        cleanup();
    });

    test('renders the wrapped component', () => {
        render(<WrappedComponent />);

        expect(
            screen.getByRole('heading', {
                name: 'Hello from Mock App Component',
            }),
        ).toBeInTheDocument();
    });
});
