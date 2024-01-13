import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import SettingsScreen from '../screens/SettingsScreen';
import TableOfContentScreen from '../screens/TableOfContentScreen';
import {StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {View} from 'tamagui';
import Home from '../screens/Home';

const Tab = createBottomTabNavigator();

// parameters can be improved by using objects
const renderIcon = (
  isFocused,
  src = require('../assets/icons/home-96.png'),
  text = 'Icon Text',
  style, // this can be improved. but i don't know yet. lol
) => (
  <View style={styles(isFocused).tabView}>
    <Image
      source={src}
      resizeMode="contain"
      style={[styles(isFocused).icon, style]}
    />
    <Text style={[styles(isFocused).tabText]}>{text}</Text>
  </View>
);

const CustomTabBarButton = ({children, onPress, focused}) => (
  <TouchableOpacity
    style={[styles(focused).customTabBarButton, styles(focused).shadow]}
    onPress={onPress}>
    <View style={styles(focused).customTabBarView}>{children}</View>
  </TouchableOpacity>
);

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            position: 'absolute',
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: '#f0f8ff',
            borderRadius: 15,
            height: 90,
            ...styles.shadow,
          },
        ],
      })}>
      <Tab.Screen
        name="LegentState"
        component={Home}
        options={{
          tabBarIcon: ({focused}) =>
            renderIcon(focused, require('../assets/icons/home-96.png'), 'Home'),
        }}
      />
      <Tab.Screen
        name="Table Of Content"
        component={TableOfContentScreen}
        options={{
          tabBarIcon: () =>
            renderIcon(false, require('../assets/icons/list-1000.png'), '', {
              tintColor: 'white',
            }),
          tabBarButton: props => CustomTabBarButton({...props}),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({focused}) =>
            renderIcon(
              focused,
              require('../assets/icons/settings-1500.png'),
              'Settings',
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = (isFocused = false) => {
  return StyleSheet.create({
    shadow: {
      shadowColor: '#7fffd4',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
    },
    customTabBarButton: {
      paddingVertical: 42,
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    customTabBarView: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: '#32cd32',
    },
    tabView: {alignItems: 'center', justifyContent: 'center', top: 10},
    icon: {
      width: 25,
      height: 25,
      tintColor: isFocused ? '#32cd32' : '#748c94',
    },
    tabText: {
      color: isFocused ? '#32cd32' : '#748c94',
      fontSize: 12,
    },
  });
};

export default Tabs;
