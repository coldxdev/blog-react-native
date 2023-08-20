import StyledIcon from '@components/StyledIcon';
import React from 'react';
import {
    ImageSourcePropType,
    TouchableOpacityProps,
    TouchableOpacity,
} from 'react-native';

interface Props extends TouchableOpacityProps {
    iconSrc: ImageSourcePropType;
    size?: string;
}

const IconButton: React.FC<Props> = ({ iconSrc, size, ...restProps }) => {
    return (
        <TouchableOpacity {...restProps}>
            <StyledIcon size={size} source={iconSrc} />
        </TouchableOpacity>
    );
};

export default IconButton;
