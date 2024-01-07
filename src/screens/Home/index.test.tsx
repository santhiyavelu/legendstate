import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import Home from '.';
import appConfig from '../../../tamagui.config';
import {TamaguiProvider} from 'tamagui';
import {PlayerVoteProvider} from '../../contexts/PlayerVoteContext';

describe('Home', () => {
  const setup = () =>
    // Arrange
    render(
      <TamaguiProvider config={appConfig}>
        <Home />
      </TamaguiProvider>,
    );

  it('should render without crashing', () => {
    setup();
    expect(screen).toBeDefined();
  });
  it('should have heading', () => {
    setup();
    expect(screen.getByText('Legend State Implementation')).toBeDefined();
  });
  it('should have initial score', () => {
    setup();
    // expect(initScore).toBeTruthy;
    expect(screen.getByText('Messi: 0 - 0 :Ronaldo')).toBeDefined();
  });

  it('should have 8 buttons', () => {
    setup();

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(8);
  });

  it('should control Messi votes accordingly', () => {
    // Arrange
    setup();

    // Act
    const voteMessiButton = screen.getAllByRole('button')[0];
    fireEvent.press(voteMessiButton);

    // Expect
    expect(screen.getByText('Messi: 1 - 0 :Ronaldo')).toBeDefined();
    expect(screen.getByTestId('Messi-vote').props.children).toEqual(1);

    // Act
    const unvoteMessiButton = screen.getAllByRole('button')[1];
    fireEvent.press(unvoteMessiButton);

    // Expect
    expect(screen.getByText('Messi: 0 - 0 :Ronaldo')).toBeDefined();
    expect(screen.getByTestId('Messi-vote').props.children).toEqual(0);
  });

  it('should control Ronaldo votes accordingly', () => {
    // Arrange
    setup();

    // Act
    const voteRonaldoButton = screen.getAllByRole('button')[2];
    fireEvent.press(voteRonaldoButton);

    // Expect
    expect(screen.getByText('Messi: 0 - 1 :Ronaldo')).toBeDefined();
    expect(screen.getByTestId('Ronaldo-vote').props.children).toEqual(1);

    // Act
    const unvoteRonaldoButton = screen.getAllByRole('button')[3];
    fireEvent.press(unvoteRonaldoButton);

    // Expect
    expect(screen.getByText('Messi: 0 - 0 :Ronaldo')).toBeDefined();
    expect(screen.getByTestId('Ronaldo-vote').props.children).toEqual(0);
  });
});

describe('Home/Score Card', () => {
  it('should update Messi legend state', () => {
    render(
      <TamaguiProvider config={appConfig}>
        <PlayerVoteProvider>
          <Home />
        </PlayerVoteProvider>
      </TamaguiProvider>,
    );

    // Act
    const addVoteMess = screen.getByTestId('add-btn-1');

    fireEvent.press(addVoteMess);

    // Expect
    expect(screen.getByTestId('score-Messi').props.children).toEqual(1);

    // Act
    const decVoteMess = screen.getByTestId('dec-btn-1');
    fireEvent.press(decVoteMess);

    // Expect
    expect(screen.getByTestId('score-Messi').props.children).toEqual(0);
  });

  it('should update Rolando legend state', () => {
    render(
      <TamaguiProvider config={appConfig}>
        <PlayerVoteProvider>
          <Home />
        </PlayerVoteProvider>
      </TamaguiProvider>,
    );

    // Act
    const addVoteRol = screen.getByTestId('add-btn-2');

    fireEvent.press(addVoteRol);

    // Expect
    expect(screen.getByTestId('score-Rolando').props.children).toEqual(1);

    // Act
    const decVoteRol = screen.getByTestId('dec-btn-2');
    fireEvent.press(decVoteRol);

    // Expect
    expect(screen.getByTestId('score-Rolando').props.children).toEqual(0);
  });
});
