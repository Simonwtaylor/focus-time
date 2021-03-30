import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { colours, fontSizes, paddingSizes } from '../utils/index';

const minutesToMs = (min) => min * 1000 * 60;

const formatTime = (time) => time < 10 ? `0${time}` : time;

export const Countdown = ({
  minutes = 1,
  isPaused,
  onProgress,
  onEnd,
}) => {
  const interval = React.useRef(null);
  const [ms, setMs] = useState(minutesToMs(minutes));
  const countDown = () => {
    setMs((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        return time;
      }

      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    setMs(minutesToMs(minutes))
  }, [minutes]);

  useEffect(() => {
    onProgress(ms / minutesToMs(minutes));
    if (ms === 0) {
        onEnd();
    }
  }, [ms])

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused, minutes]);


  const min = Math.floor(ms / 1000 / 60) % 60;
  const sec = Math.floor(ms / 1000) % 60;

  return (
    <Text style={styles.text}>
      {formatTime(min)}:{formatTime(sec)}
    </Text>
  )
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxxl,
    fontStyle: 'bold',
    color: colours.white,
    padding: paddingSizes.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
    textAlign: 'center',
  },
})