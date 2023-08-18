import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import routes from '@consts/routes';

const Router = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='posts'>
                {routes.map(({ name, Component }, idx) => (
                    <Stack.Screen
                        name={name}
                        component={Component}
                        key={idx}
                        options={{ title: name }}
                    />
                ))}
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default Router;
