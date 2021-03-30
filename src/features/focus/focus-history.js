import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import { fontSizes, paddingSizes } from '../../utils/index';
import { RoundedButton } from '../../components/rounded-button';

const getItemColour = (status) => (status > 1 ? 'red' : 'green');

const historyItem = ({ item, index }) => {
  return (
    <Text style={[
      styles.historyItem,
      {
        color: getItemColour(item.status)
      }
      ]} key={`item${index}`}>
      {item.subject}
    </Text>
  );
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        {focusHistory.length > 0 && (
          <>
            <Text style={styles.title}>Things weve focused on:</Text>
            <FlatList
              style={{
                flex: 1,
              }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={historyItem}
            />
          </>
        )}
      </SafeAreaView>
      <View style={styles.clearContainer}>
        <RoundedButton size={75} title={'-'} onPress={clearHistory}/>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: {
    fontSize: fontSizes.md,
  },
  title: {
    color: 'white',
    fontSize: fontSizes.md,
  },
  clearContainer: {
    alignItems: 'center',
    padding: paddingSizes.md,
  }
});
