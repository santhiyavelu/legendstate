import * as React from 'react';
import {render, screen} from '@testing-library/react-native';
import SettingsScreen from '..';
import {TamaguiProvider} from 'tamagui';
import appConfig from '../../../../tamagui.config';

describe('SettingsScreen', () => {
  const partialProps = {
    route: {
      params: {
        data: {
          squadName: 'Test Squad',
          homeTown: 'Test Town',
          formed: 2022,
          secretBase: 'Test Base',
          active: true,
          members: [],
        },
      },
    },
  };

  // it has partial props
  const setup = () =>
    render(
      <TamaguiProvider config={appConfig}>
        <SettingsScreen {...partialProps} />
      </TamaguiProvider>,
    );

  // it has no props
  const setupWithNoProps = () =>
    render(
      <TamaguiProvider config={appConfig}>
        <SettingsScreen />
      </TamaguiProvider>,
    );
  test('renders with partial props', () => {
    setup();
    const squadNameElement = screen.getByText(/Test Squad/i);
    expect(squadNameElement).toBeTruthy();
  });

  test('renders without squad data', () => {
    setupWithNoProps();

    // Assert that the component renders without crashing
    const noDataElement = screen.getByText(/No data/i);
    expect(noDataElement).toBeTruthy();
  });
});
