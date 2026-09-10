import React from 'react';

function WithLogging(WrappedComponent) {
    class WithLogging extends React.Component {
        componentDidMount() {
            const name = WrappedComponent.name || 'Component';
            console.log(`Component ${name} is mounted`);
        }

        componentWillUnmount() {
            const name = WrappedComponent.name || 'Component';
            console.log(`Component ${name} is going to unmount`);
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    const name = WrappedComponent.name || 'Component';
    WithLogging.displayName = `WithLogging(${name})`;

    return WithLogging;
}

export default WithLogging;
