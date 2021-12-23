import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
});

export default function TaskCard({ task }) {
  return (
    <View>
      <Text>{ task }</Text>
    </View>
  )
}
