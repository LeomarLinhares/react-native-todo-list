import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
  },
  textStyle: {
    marginHorizontal: 10,
  }
});

export default function TaskCard({ task, fatherLayoutInfo, id }) {
  const { width } = fatherLayoutInfo;
  return (
    <View
      style={ { ...styles.container, width: width - 10 } }
    >
      <Text style={ styles.textStyle }>{ task }</Text>
    </View>
  )
}
