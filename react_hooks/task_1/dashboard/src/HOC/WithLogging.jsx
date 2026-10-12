import React from 'react';

function WithLogging(WrappedComponent) {
    const name = WrappedComponent.name || 'Component';
    class WithLogging extends React.Component {
        componentDidMount() {
            console.log(`Component ${name} is mounted`);
        }

        componentWillUnmount() {
            console.log(`Component ${name} is going to unmount`);
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    WithLogging.displayName = `WithLogging(${name})`;

    return WithLogging;
}

export default WithLogging;
