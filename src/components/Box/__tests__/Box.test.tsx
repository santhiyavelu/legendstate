import * as React from 'react';
import {render, screen} from '@testing-library/react-native';
import Box from '..';
import {ReactTestInstance} from 'react-test-renderer';
import {COLORS} from '../../../assets/constants';

// mocks the COLORS
// every time the test encouter COLORS, it will point to this mock
jest.mock('../../../assets/constants', () => ({
  COLORS: {
    GREEN: 'green',
    RED: 'red',
  },
}));

describe('Box Component', () => {
  let box: ReactTestInstance;
  beforeEach(() => {
    render(<Box color={COLORS.GREEN} />);
    box = screen.getByTestId('box');
  });

  it('should not crash', () => {
    expect(box).toBeTruthy();
  });

  it('should have a height of 200px', () => {
    expect(box.props.style[0].height).toEqual(200);
  });
  it('should have a widt of 100%', () => {
    expect(box.props.style[0].width).toEqual('100%');
  });

  it('should have justifyContent: center', () => {
    const {getByTestId} = render(<Box />);
    expect(getByTestId('box').props.style[0].width).toEqual('100%');
  });

  it('should have an initial background of green', () => {
    expect(box.props.style[1].backgroundColor).toEqual(COLORS.GREEN);
  });

  it('text should have a fontSize: 24', () => {
    const {getByText} = render(<Box />);
    expect(getByText('ms').props.style.fontSize).toEqual(24);
  });

  it('should have a background of red', () => {
    const {getByTestId} = render(<Box color={COLORS.RED} />);
    expect(getByTestId('box').props.style[1].backgroundColor).toEqual(
      COLORS.RED,
    );
  });
});
