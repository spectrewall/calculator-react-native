import React from 'react';
import {Text, StyleSheet, Dimensions, TouchableHighlight} from 'react-native';

export default props => {
  const sizes = ['default', 'double', 'triple'];
  const size = sizes.includes(props.size) ? props.size : 'default';

  const types = ['default', 'operation'];
  const type = types.includes(props.type) ? props.type : 'default';

  const stylesButton = [styles.Button];

  if (size == 'default') stylesButton.push(null);
  else if (size == 'double') stylesButton.push(styles.ButtonDouble);
  else if (size == 'triple') stylesButton.push(styles.ButtonTriple);

  if (type == 'default') stylesButton.push(null);
  else if (type == 'operation') stylesButton.push(styles.OperationButton);

  return (
    <TouchableHighlight onPress={() => props.onClick(props.label)}>
      <Text style={stylesButton}>{props.label}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  Button: {
    fontSize: 40,
    height: Dimensions.get('window').width / 4,
    width: Dimensions.get('window').width / 4,
    padding: 20,
    backgroundColor: 'rgba(170, 0, 170, 0.6)',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#262A29',
    color: '#F7BB5B',
  },
  OperationButton: {
    color: '#262A29',
    backgroundColor: 'rgba(57, 111, 180, 0.6)',
  },
  ButtonDouble: {
    width: (Dimensions.get('window').width / 4) * 2,
  },
  ButtonTriple: {
    width: (Dimensions.get('window').width / 4) * 3,
  },
});
