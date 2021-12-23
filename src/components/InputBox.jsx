import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function InputBox({ title }) {
  const [task, setTask] = useState('')

  return (
    <View style={ styles.container }>
      <Text style={ styles.textStyle }>{ title }</Text>
      <TextInput
        style={ styles.textInput }
        onChangeText={ setTask }
        value={ task }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  textStyle: {
    color: 'white',
    marginLeft: 10,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 7,
    marginTop: 6,
  },
});
