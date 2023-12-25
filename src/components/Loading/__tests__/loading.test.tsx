import * as React from 'react';
import {render, within} from '@testing-library/react-native';
import {ReactTestInstance} from 'react-test-renderer';
import Loading from '..';

describe('Loading Component', () => {
  let loading: ReactTestInstance;
  beforeEach(() => {
    const {getByTestId} = render(<Loading />);
    loading = getByTestId('loading');
  });
  it('should render successfully', () => {
    expect(loading).toBeDefined();
  });

  it('should have correct default styles', () => {
    expect(loading.props.style.flex).toEqual(1);
    expect(loading.props.style.justifyContent).toEqual('center');
    expect(loading.props.style.alignItems).toEqual('center');
  });

  it('should render default props', () => {
    const activityIndicator = within(loading).getByTestId('activity-indicator');

    expect(activityIndicator.props.size).toEqual('large');
    expect(activityIndicator.props.color).toEqual('blue');
  });

  it('should render correct props', () => {
    const {getByTestId} = render(<Loading size={'small'} color={'red'} />);
    const activityIndicator = getByTestId('activity-indicator');

    expect(activityIndicator.props.size).toEqual('small');
    expect(activityIndicator.props.color).toEqual('red');
  });
});
