import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
});

export default function TaskCard({ task, fatherLayoutInfo, id }) {
  const { width } = fatherLayoutInfo;
  return (
    <View style={ { ...styles.container, width: width - 10 } }>
      <Text>{ task }</Text>
    </View>
  )
}
