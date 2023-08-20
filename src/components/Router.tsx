import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import routes from '@consts/routes';
import { POSTS_PATH, POST_PATH } from '@consts/paths';
import store from '@redux/store';
import { Provider } from 'react-redux';

export type StackParamList = {
    Post: { postId: string };
    Posts: undefined;
};

const Router = () => {
    const Stack = createNativeStackNavigator<StackParamList>();
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={POSTS_PATH}>
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
        </Provider>
    );
};
export default Router;
