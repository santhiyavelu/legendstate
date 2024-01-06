import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GraphQLScreen from '../screens/GraphQLScreen';
import ChapterScreen from '../screens/ChapterScreen';
import {RootStackParamList} from './types';
import RedLightGame from '../components/RedLightGame';

const Stack = createNativeStackNavigator<RootStackParamList>();

function GraphQLStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GraphQL"
        component={GraphQLScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Chapter"
        component={ChapterScreen}
        options={({
          route: {
            params: {
              chapter: {number, title},
            },
          },
        }) => ({
          title: number ? `Chapter ${number}: ${title}` : title,
          headerBackTitleVisible: false,
        })}
      />
      <Stack.Screen name="Game" component={RedLightGame} />
    </Stack.Navigator>
  );
}

export default GraphQLStack;
