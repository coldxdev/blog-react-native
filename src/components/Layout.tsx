import { COLORS } from '@consts/theme';
import React from 'react';
import { ViewProps } from 'react-native';
import styled from 'styled-components/native';

interface LayoutProps extends ViewProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const StyledLayout = styled.View`
        padding: 0 15px 15px;
        background-color: ${COLORS.background};
        flex: 1;
    `;

    return <StyledLayout>{children}</StyledLayout>;
};

export default Layout;
