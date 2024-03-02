import * as React from 'react';
import {SettingsScreenProp} from '../../navigations/types';
import {View, Text} from 'react-native';

const SettingsScreen: React.FC<SettingsScreenProp> = ({route}) => {
  const data = route?.params?.data; // handles undefined since it is optional in type

  const renderNoData = React.useCallback(() => {
    if (!data) {
      console.log('no data');
      return (
        <View>
          <Text>No data</Text>
        </View>
      );
    }
  }, [data]);

  return (
    <>
      {!data && renderNoData()}
      <View>
        <Text>Squad</Text>
        <Text>{JSON.stringify(data, null, 2)}</Text>
      </View>
    </>
  );
};

export default SettingsScreen;
