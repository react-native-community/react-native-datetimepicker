/**
 * @format
 * @flow strict-local
 */

import type {SyntheticEvent} from 'CoreEventTypes';
import type {NativeComponent} from 'ReactNative';
import type {ViewProps} from 'ViewPropTypes';
import type {ElementRef} from 'react';
import type {ColorValue} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {ANDROID_MODE, DISPLAY} from './constants';

type IOSMode = 'date' | 'time' | 'datetime' | 'countdown';
type AndroidMode = $Keys<typeof ANDROID_MODE>;
type Display = $Keys<typeof DISPLAY>;
type MinuteIntervalIOS = ?(1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30);
type MinuteIntervalAndroid = ?(1 | 5 | 10 | 15 | 20 | 30);

export type Event = SyntheticEvent<
  $ReadOnly<{|
    timestamp: number,
  |}>,
>;

export type AndroidEvent = {|
  type: string,
  nativeEvent: {|
    timestamp?: number,
  |},
|};

type BaseOptions = {|
  /**
   * The currently selected date.
   */
  value?: ?Date,

  /**
   * Date change handler.
   *
   * This is called when the user changes the date or time in the UI.
   * The first argument is an Event, the second a selected Date.
   */
  onChange?: ?(event: Event, date?: Date) => void,
|};

type DateOptions = {|
  ...BaseOptions,

  /**
   * Maximum date.
   *
   * Restricts the range of possible date/time values.
   */
  maximumDate?: ?Date,

  /**
   * Minimum date.
   *
   * Restricts the range of possible date/time values.
   */
  minimumDate?: ?Date,
|};

type TimeOptions = $ReadOnly<{|
  ...BaseOptions,

  /**
   * Display TimePicker in 24 hour.
   */
  is24Hour?: ?boolean,
|}>;

export type BaseProps = $ReadOnly<{|
  ...ViewProps,
  ...DateOptions,
|}>;

export type IOSNativeProps = $ReadOnly<{|
  ...BaseProps,
  date?: ?Date,

  /**
   * The date picker locale.
   */
  locale?: ?string,

  /**
   * The interval at which minutes can be selected.
   */
  minuteInterval?: MinuteIntervalIOS,

  /**
   * The date picker mode.
   */
  mode?: IOSMode,

  /**
   * Timezone offset in minutes.
   *
   * By default, the date picker will use the device's timezone. With this
   * parameter, it is possible to force a certain timezone offset. For
   * instance, to show times in Pacific Standard Time, pass -7 * 60.
   */
  timeZoneOffsetInMinutes?: ?number,

  /**
   * The date picker text color.
   */
  textColor?: ?ColorValue,
|}>;

export type AndroidNativeProps = $ReadOnly<{|
  ...BaseProps,
  ...DateOptions,
  ...TimeOptions,

  /**
   * The date picker mode.
   */
  mode: AndroidMode,

  /**
   * The display options.
   */
  display: Display,

  /**
   * The interval at which minutes can be selected.
   * NOTE: setting minute interval other than '1' or '5' will override display mode to 'spinner'!
   */
  minuteInterval?: MinuteIntervalAndroid,

  onChange: (event: AndroidEvent, date?: Date) => void,
  neutralButtonLabel?: string,
|}>;

export type DatePickerOptions = {|
  ...DateOptions,
  display?: Display,
|};

export type TimePickerOptions = {|
  ...TimeOptions,
  minuteInterval?: MinuteIntervalAndroid,
  display?: Display,
|};

export type DateTimePickerResult = $ReadOnly<{|
  action: ?('timeSetAction' | 'dateSetAction' | 'dismissedAction'),
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
|}>;

export type RCTDateTimePickerNative = Class<NativeComponent<IOSNativeProps>>;
export type NativeRef = {
  current: ElementRef<RCTDateTimePickerNative> | null,
};
