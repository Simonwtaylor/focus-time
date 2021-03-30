import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';
import { colours, fontSizes } from '../../utils/index';
import { Countdown } from '../../components/countdown';
import { RoundedButton } from '../../components/rounded-button';
import { Timing } from './timing';

const DEFAULT_TIME = 1;

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();

  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <Text style={styles.title}>Focusing on:</Text>
      <Text style={styles.task}>{focusSubject}</Text>
      <View style={{ marginTop: 20 }}>
        <ProgressBar
          color={'#5e84e2'}
          style={{ height: 10 }}
          progress={progress}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        <RoundedButton
          title={!isStarted ? 'start' : 'pause'}
          size={100}
          onPress={() => setIsStarted(!isStarted)}
        />
      </View>
      <View>
        <RoundedButton title={'-'} size={50} onPress={() => clearSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  task: {
    color: colours.white,
    fontSize: fontSizes.lg,
    textAlign: 'center',
  },
  title: {
    color: colours.white,
    fontSize: fontSizes.md,
    textAlign: 'center',
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    alignItems: 'center',
    flex: 0.3,
    padding: 15,
    justifyContent: 'center',
  },
});
