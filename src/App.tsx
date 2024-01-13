import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {TamaguiProvider} from 'tamagui';
import appConfig from '../tamagui.config';
import Tabs from './containers/tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import HookForm from './screens/HookForm';
import MoviesScreen from './screens/Movies';
import ReactQuery from './screens/ReactQuery';
import RedLightGame from './components/RedLightGame';
import CalculatorView from './components/mvvm/view';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={appConfig}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Tabs">
            <Stack.Screen
              name="Tabs"
              component={Tabs}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="HookForm" component={HookForm} />
            <Stack.Screen name="MoviesScreen" component={MoviesScreen} />
            <Stack.Screen name="ReactQuery" component={ReactQuery} />
            <Stack.Screen name="Game" component={RedLightGame} />
            <Stack.Screen name="Calculator" component={CalculatorView} />
          </Stack.Navigator>
        </NavigationContainer>
      </TamaguiProvider>
    </QueryClientProvider>
  );
};

export default App;
