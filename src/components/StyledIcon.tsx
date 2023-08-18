import React from 'react';
import { ImageProps } from 'react-native';
import styled from 'styled-components/native';

interface StyledIconProps extends ImageProps {
    size?: string;
}

const StyledIcon: React.FC<StyledIconProps> = ({
    source,
    size = '30px',
    ...restProps
}) => {
    const Icon = styled.Image`
        width: ${size};
        height: ${size};
    `;

    return <Icon source={source} {...restProps} />;
};

export default StyledIcon;
