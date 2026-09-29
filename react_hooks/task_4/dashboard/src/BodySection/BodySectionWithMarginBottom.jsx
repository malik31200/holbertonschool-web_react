import React from 'react';
import BodySection from './BodySection';

class BodySectionWithMarginBottom extends React.Component {
    render() {
        const { title, children } = this.props;

        return (
            <div className='bodySectionWithMargin mb-10'>
                <BodySection title={title}>
                    {children}
                </BodySection>
            </div>
        );
    }
}

export default BodySectionWithMarginBottom;
