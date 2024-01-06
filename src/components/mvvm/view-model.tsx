import React from 'react';
import {View, Text, Button} from 'react-native';
import {CalculatorModel} from './model';

interface CalculatorViewModelProps {
  model: CalculatorModel;
}

const CalculatorViewModel: React.FC<CalculatorViewModelProps> = ({model}) => {
  return (
    <View>
      <Text>Result: {model.result}</Text>
      <Button title="Add 5" onPress={() => model.add(5)} />
      <Button title="Subtract 3" onPress={() => model.subtract(3)} />
      <Button title="Multiply by 2" onPress={() => model.multiply(2)} />
      <Button title="Divide by 2" onPress={() => model.divide(2)} />
    </View>
  );
};

export default CalculatorViewModel;
