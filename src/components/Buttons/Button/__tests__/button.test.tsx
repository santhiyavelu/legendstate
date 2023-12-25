import * as React from 'react';
import {render} from '@testing-library/react-native';
import Button from '..';
import {ReactTestInstance} from 'react-test-renderer';
import {COLORS} from '../../../../assets/constants';
import {ButtonVariant} from '../../../../types/button.enum';
import {Text} from 'react-native';

jest.mock('../../../../assets/constants', () => ({
  COLORS: {
    LIGHT: 'white',
    DARK: 'black',
    GRAY: 'gray',
    GREEN: 'green',
    RED: 'redd',
  },
}));

describe('Button Component', () => {
  let button: ReactTestInstance;
  beforeEach(() => {
    const {getByRole} = render(<Button />);
    button = getByRole('button');
  });

  it('should render button', () => {
    expect(button).toBeTruthy();
  });

  it('should render SUCCESS variant initially', () => {
    expect(button.props.style.backgroundColor).toEqual(COLORS.GREEN);
  });

  it('should render correct size', () => {
    const {getByRole} = render(<Button small />);
    expect(getByRole('button').props.style.paddingVertical).toEqual(2);
    expect(getByRole('button').props.style.paddingHorizontal).toEqual(8);
    expect(getByRole('button').props.style.borderRadius).toEqual(4);
    expect(getByRole('button').props.style.alignItems).toEqual('center');
  });

  it('should render correct default size', () => {
    expect(button.props.style.padding).toEqual(10);
    expect(button.props.style.borderRadius).toEqual(4);
    expect(button.props.style.marginTop).toEqual(8);
    expect(button.props.style.alignItems).toEqual('center');
  });

  it('should render correctly based on props', () => {
    const {getByRole} = render(<Button variant={ButtonVariant.DANGER} />);

    expect(getByRole('button').props.style.backgroundColor).toEqual(COLORS.RED);
  });

  it('should render correct title', () => {
    const {getByText} = render(
      <Button>
        <Text>Submit</Text>
      </Button>,
    );

    expect(getByText('Submit')).toBeTruthy();
  });

  // you can check all props by logging it
  it('should be disabled when disabled', () => {
    const {getByRole} = render(<Button disabled />);

    expect(getByRole('button').props.accessibilityState.disabled).toBe(true);
  });
});
