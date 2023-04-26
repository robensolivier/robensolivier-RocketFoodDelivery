import React from 'react';
import { Text } from 'react-native';

const CustomText = (props) => {
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: props.fontFamily || 'Arial' }]}
    >
      {props.children}
    </Text>
  );
};

export default CustomText;