import {useState} from 'react';

export interface CalculatorModel {
  result: number;
  add: (value: number) => void;
  subtract: (value: number) => void;
  multiply: (value: number) => void;
  divide: (value: number) => void;
}

export const useCalculatorModel = (): CalculatorModel => {
  const [result, setResult] = useState(0);

  const add = (value: number) => {
    setResult(result + value);
  };

  const subtract = (value: number) => {
    setResult(result - value);
  };

  const multiply = (value: number) => {
    setResult(result * value);
  };

  const divide = (value: number) => {
    setResult(result / value);
  };

  return {
    result,
    add,
    subtract,
    multiply,
    divide,
  };
};
