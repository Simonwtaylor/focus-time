import React from 'react';
import { View, StyleSheet} from 'react-native';
import { RoundedButton } from '../../components/rounded-button';

export const Timing = ({
  onChangeTime,
}) => {
  return (
    <>
      <View>
        <RoundedButton size={75} title={"10"} onPress={() => onChangeTime(10)} />
      </View>
      <View>
        <RoundedButton size={75} title={"25"} onPress={() => onChangeTime(25)} />
      </View>
    </>
  )
}