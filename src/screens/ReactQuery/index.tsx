import React from 'react';
import {View, Text} from 'tamagui';
import {Usetodos} from './Api Call/todoApi';
import {FlatList} from 'react-native';
import styles from './styles';

const ReactQuery = () => {
  const {isLoading, error, data} = Usetodos();

  const renderItem = ({item}) => (
    <View style={{}}>
      <Text style={styles.nameText}>{item.todo}</Text>
    </View>
  );

  if (isLoading) return <Text>Loading...</Text>;

  if (error) {
    return (
      <View>
        <Text>An error occurred while fetching the user data</Text>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.tittle}>TODO: </Text>
      <View>
        <FlatList
          data={data}
          renderItem={renderItem}
          alwaysBounceVertical={false}
        />
      </View>
    </View>
  );
};

export default ReactQuery;
