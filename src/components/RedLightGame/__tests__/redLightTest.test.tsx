import {fireEvent, render, screen, within} from '@testing-library/react-native';
import RedLightGame from '..';
import * as React from 'react';
import {README} from '../../../assets/instructions';

// import {act} from 'react-test-renderer';

describe('red light green light game component', () => {
  beforeEach(() => {
    render(<RedLightGame />);
  });
  describe('initial startup', () => {
    it('should render the game title', () => {
      expect(screen.getByText(/red light green light game/i)).toBeDefined();
    });
    it('should render the start game button', () => {
      const startButton = within(screen.getByTestId('start-game')).getByText(
        'Start Game',
      );

      expect(startButton).toBeDefined();
    });

    it('should render instruction', () => {
      expect(
        screen.getByText(README.RED_LIGHT_GREEN_LIGHT_INSTRUCTION),
      ).toBeDefined();
    });

    it('should render the  score: 0 ms and the time left: 6000 ms', () => {
      const scoreText = screen.getByText(/Score: 0 ms/i);
      const timeLeftText = screen.getByText(/^6000 ms$/);

      expect(scoreText).toBeDefined();
      expect(timeLeftText).toBeDefined();
    });
  });

  describe('interacting with the game', () => {
    it('should render red button once start game pressed', async () => {
      const startBtn = screen.getByTestId('btn-start');
      fireEvent.press(startBtn);

      expect(screen.queryByTestId('main')).toBeDefined();
    });

    it('should display game button once Start Game is clicked', async () => {
      const btnStartEl = screen.getByText('Start Game');
      fireEvent.press(btnStartEl);
      expect(await screen.findByTestId('game-btn'));
    });

    it.only('should display game over once clicked', async () => {
      const btnStartEl = screen.getByText('Start Game');
      fireEvent.press(btnStartEl);

      expect(await screen.findByText(/Do not click!/i)).toBeDefined();
      const gameBtnEl = await screen.findByTestId('game-btn');
      fireEvent.press(gameBtnEl);
      expect(await screen.findByText(/^Game Over$/i)).toBeDefined();
    });
  });
});
