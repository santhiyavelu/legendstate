import React from 'react';
import {View} from 'react-native';
import {useCalculatorModel} from './model';
import CalculatorViewModel from './view-model';

const CalculatorView: React.FC = () => {
  const calculatorModel = useCalculatorModel();

  return (
    <View>
      <CalculatorViewModel model={calculatorModel} />
    </View>
  );
};

export default CalculatorView;
