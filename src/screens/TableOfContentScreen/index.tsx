import React from 'react';
import {TouchableOpacity} from 'react-native';
import {ScrollView, Text} from 'tamagui';
import {useNavigation} from '@react-navigation/native';
// import {RootStackParamList} from '../../navigations/types';

const TableOfContentScreen = () => {
  const navigation = useNavigation();

  const sections = [
    {title: 'Hook Form', screen: 'HookForm'},
    {title: 'Movies', screen: 'MoviesScreen'},
    {title: 'React Query', screen: 'ReactQuery'},
    {title: 'Red/Green Light Game', screen: 'Game'},
    {title: 'Calculator', screen: 'Calculator'},
    {title: 'RadioCard', screen: 'RadioCard'},
  ];

  const handleSectionPress = screen => {
    navigation.navigate(screen);
  };

  return (
    <ScrollView style={{flex: 1, paddingTop: 50, padding: 16}}>
      <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>
        App Features
      </Text>

      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
        Table of Contents
      </Text>
      {sections.map((section, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleSectionPress(section.screen)}>
          <Text style={{fontSize: 16, marginBottom: 5}}>{section.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default TableOfContentScreen;
