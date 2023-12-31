import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {PlayerVoteCard} from '../types/playerVoteCard';
import {COLORS} from '../assets/constants';
import {observer} from '@legendapp/state/react';
import Button from './Buttons/Button';
import {ButtonVariant} from '../types/button.enum';

const Card: React.FC<PlayerVoteCard> = observer(
  ({player, increaseVoteCount, decreaseVoteCount, votes}) => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{player.name}</Text>
          <Text testID={player.name + '-vote'} style={styles.cardTitle}>
            {votes}
          </Text>
        </View>
        <Text style={styles.cardText}>
          {player.country} | {player.club}
        </Text>
        <Button onPress={() => increaseVoteCount(player.id)}>
          <Text style={styles.buttonText}>Vote</Text>
        </Button>
        <Button
          variant={ButtonVariant.DANGER}
          onPress={() => decreaseVoteCount(player.id)}>
          <Text style={styles.buttonText}>Unvote</Text>
        </Button>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.LIGHT,
    borderRadius: 8,
    padding: 16,
    elevation: 4, // Android elevation for shadow
    shadowColor: COLORS.DARK,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 4,
  },
  voteButton: {
    backgroundColor: COLORS.GREEN,
    padding: 10,
    borderRadius: 4,
    marginTop: 8,
    alignItems: 'center',
  },
  unvoteButton: {
    backgroundColor: COLORS.RED,
    padding: 10,
    borderRadius: 4,
    marginTop: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.LIGHT,
    fontWeight: 'bold',
  },
});

export default Card;
