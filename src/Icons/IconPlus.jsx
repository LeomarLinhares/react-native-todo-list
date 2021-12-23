import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function IconPlus() {
  return (
    <Svg
      width={ 24 }
      height={ 24 }
    >
      <Path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" fill="white" />
    </Svg>
  )
}
