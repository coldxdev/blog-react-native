import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import routes from '@consts/routes';
import { POSTS_PATH } from '@consts/paths';

export type StackParamList = {
  Post: { postId: number };
  Posts: undefined;
};

const Router = () => {
  const Stack = createNativeStackNavigator<StackParamList>();
  return (
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
  );
};
export default Router;
