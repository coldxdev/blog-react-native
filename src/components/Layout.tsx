import { COLORS } from '@consts/theme';
import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View, ViewProps } from 'react-native';

interface LayoutProps extends ViewProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <View style={styles.layout}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                {children}
            </KeyboardAvoidingView>
        </View>
    );
};

export default Layout;

const styles = StyleSheet.create({
    layout: {
        padding: 15,
        backgroundColor: COLORS.background,
        flex: 1,
    },
    container: {
        flex: 1
    }
});
