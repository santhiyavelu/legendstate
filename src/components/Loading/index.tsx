import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';

interface LoadingProps {
  size?: number | 'small' | 'large' | undefined;
  color?: string;
}

const Loading: React.FC<LoadingProps> = ({size = 'large', color = 'blue'}) => {
  return (
    <View testID="loading" style={styles.centered}>
      <ActivityIndicator
        testID="activity-indicator"
        size={size}
        color={color}
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
