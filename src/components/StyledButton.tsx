import { COLORS, FONT } from '@consts/theme';
import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';

interface ButtonProps extends TouchableOpacityProps {
    children: React.ReactNode;
}

const StyledButton: React.FC<ButtonProps> = ({ children, ...props }) => {
    const StyledTouchableOpacity = styled.TouchableOpacity`
        background-color: ${COLORS.secondary};
        border-radius: 8px;
        justify-content: center;
        align-items: center;
    `;

    const StyledText = styled.Text`
        font-family: ${FONT.BOLD};
        padding: 12px;
        font-size: 16px;
        color: ${COLORS.white};
    `;

    return (
        <StyledTouchableOpacity {...props}>
            <StyledText>{children}</StyledText>
        </StyledTouchableOpacity>
    );
};

export default StyledButton;
