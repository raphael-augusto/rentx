import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import {
  Calendar as CustomCalendar,
  LocaleConfig,
  DateCallbackHandler
} from 'react-native-calendars';

import { GenerateInterval } from './generateInterval';
import { ptBR } from './localeConfig';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

/** Period selected*/
interface MarkedDateProps {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disableTouchEvent?: boolean;
  },
};

/** Day selected*/
interface DayProps {
  dateString: string;
  year: number;
  month: number;
  day: number;
  timestamp: number;
}

interface CalendarProps {
  markedDates: MarkedDateProps;
  onDayPress: DateCallbackHandler;
}

function Calendar({ markedDates, onDayPress }: CalendarProps){
  const theme = useTheme();

  return (
    <CustomCalendar
      renderArrow={( direction ) =>
        <Feather
          name={direction === 'left' ? "chevron-left" : "chevron-right"}
          size={24}
          color={theme.colors.text}
        />
      }
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10
      }}
      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textDayFontSize: 10,
        textMonthFontFamily: theme.fonts.secondary_600,
        textMonthFontSize: 20,
        monthTextColor: theme.colors.title,
        arrowStyle: {
          marginHorizontal: -15
        }
      }}
      firstDay={1}
      minDate={new Date()}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    >
    </CustomCalendar>
  );
};

export {
  DayProps,
  MarkedDateProps,
  GenerateInterval,
  Calendar
}
