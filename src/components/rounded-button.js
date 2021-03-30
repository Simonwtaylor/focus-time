import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const RoundedButton = ({ 
  style = {},
  textStyle = {},
  size = 125,
  onPress,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles(size).radius, style ]}
      onPress={onPress}
    >
      <Text
       style={[styles(size).text, style]}>{props.title}</Text>
    </TouchableOpacity>
  )
};

const styles = (size) => StyleSheet.create({
  radius:{
    borderRadius: size/2,
    width: size,
    height: size,
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 2,
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  text: {
    color: '#fff',
    fontSize: size / 3,
  }
})
