import { useFonts } from 'expo-font';
import Router from '@components/Router';

const App = () => {
    const [fontsLoaded] = useFonts({
        'Inter-Bold': require('@assets/fonts/Inter-Bold.ttf'),
        'Inter-Regular': require('./src/assets/fonts/Inter-Regular.ttf'),
        'Inter-SemiBold': require('@assets/fonts/Inter-SemiBold.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return <Router />;
};
export default App;
