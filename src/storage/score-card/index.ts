import {observable} from '@legendapp/state';
import {ClubCode} from '../../types';

export const player$ = observable({
  players: [
    {
      id: 1,
      name: 'Messi',
      score: 0,
      club: ClubCode.PAR,
    },
    {
      id: 2,
      name: 'Rolando',
      score: 0,
      club: ClubCode.MAN,
    },
  ],
});
