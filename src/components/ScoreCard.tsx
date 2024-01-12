import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {COLORS} from '../assets/constants';
import {Player} from '../types/player';
import HorizontalLine from './HorizontalLine';
import {player$} from '../storage/score-card';
import Button from './Buttons/Button';
import {enableReactTracking} from '@legendapp/state/config/enableReactTracking';

enableReactTracking({auto: true});

interface ScoreCardProp {
  players: Player[];
}

const ScoreCard: React.FC<ScoreCardProp> = () => {
  return (
    <View style={[styles.cardContainer]}>
      <View style={[styles.sectionHeader]}>
        <Text style={[styles.cardTitle]}>Score Card</Text>
      </View>

      <HorizontalLine />

      <View style={styles.sectionContainer}>
        {player$.players.map(p => (
          <View key={p.id.get()} style={styles.sectionRow}>
            <Text style={styles.cardTitle}>{p.name.get()}</Text>
            <Text testID={'score-' + p.name.get()}>{p.score.get()}</Text>
            <View style={styles.group}>
              <Button
                testID={'add-btn-' + p.id.get()}
                small
                onPress={() => p.score.set(currentScore => currentScore + 1)}>
                <Text style={styles.buttonText}>Add</Text>
              </Button>
              <Button
                testID={'dec-btn-' + p.id.get()}
                small
                onPress={() => p.score.set(currentScore => currentScore - 1)}>
                <Text style={styles.buttonText}>Dec</Text>
              </Button>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  group: {flexDirection: 'row', gap: 4, alignItems: 'center'},
  buttonText: {
    color: COLORS.LIGHT,
    fontWeight: 'bold',
  },
  cardContainer: {
    backgroundColor: COLORS.LIGHT,
    borderRadius: 8,
    elevation: 4, // Android elevation for shadow
    shadowColor: COLORS.DARK,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  sectionContainer: {
    padding: 16,
    gap: 8,
  },
  sectionHeader: {
    padding: 16,
    backgroundColor: COLORS.GREEN,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ScoreCard;
