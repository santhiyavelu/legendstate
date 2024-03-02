import {RouteProp} from '@react-navigation/native';
import {Squad} from '../validation/schemas/type';

export interface Chapter {
  __typename: string;
  id: number;
  number: number | null;
  title: string;
}

export type ChapterScreenParams = {
  chapter: Chapter;
  // other properties if any
};

export type RootStackParamList = {
  Chapter: ChapterScreenParams;
  GraphQL: undefined;
  Game: undefined;
  RadioCard: undefined;

  // other screens and their params if any
};

export type SettingsScreenProp = {
  // Partial props allowed
  route?: Partial<RouteProp<TabStackParamList, 'Settings'>> & {
    params?: {data?: Squad};
  };
};

export type TabStackParamList = {
  LegendState: undefined;
  'Table Of Content': undefined;
  Settings: SettingsScreenProp;
  RadioCard: undefined;
};
