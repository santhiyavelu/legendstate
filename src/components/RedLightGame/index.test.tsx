import * as React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import RedLightGame from '.';

jest.useFakeTimers();

describe('RED LIGHT GREEN LIGHT', () => {
  it('should render successfully', async () => {
    const {getByText, getByTestId} = render(<RedLightGame />);
    const button = getByText('Start Game');

    fireEvent.press(button);

    // const trickyButton = getByTestId('trickyButton');
    const trickyText = getByTestId('trickyText');

    let attempts = 0;
    const maxAttempts = 10;
    const checkInterval = 1000;

    while (attempts < maxAttempts) {
      await act(async () => {
        jest.advanceTimersByTime(checkInterval);
      });

      // Check the button's color and label
      if (trickyText.props.children === 'Click now!') {
        // expect(trickyText).toHaveTextContent('Click now!');
        expect(trickyText.props.children).toBe('Click now!');
        fireEvent.press(trickyText);
        expect(getByText('Victory')).toBeTruthy();

        break; // Break out of the loop if condition met
      }

      attempts++;
    }

    // Check if the condition was met within the allowed attempts.
    expect(attempts).toBeLessThan(maxAttempts);
  });
});
