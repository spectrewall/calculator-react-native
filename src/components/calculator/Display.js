import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import If from './If';

export default props => {
  const currentValue = props.value;
  const operator = props.operator ?? null;
  const firstValue = props.firstValue ?? null;
  const secondValue = props.secondValue ?? null;

  return (
    <View style={styles.Display}>
      <View>
        <If teste={firstValue}>
          <Text style={styles.Operation}>
            {firstValue}
            <If teste={operator}>
              {operator}
              <If teste={secondValue}>{secondValue}</If>
            </If>
          </Text>
        </If>
      </View>
      <Text style={styles.DisplayValue} numberOfLines={1}>
        {currentValue}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Display: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#404847',
    alignItems: 'flex-end',
  },
  DisplayValue: {
    fontSize: 60,
    color: '#F7B859',
  },
  Operation: {
    color: '#F7B859',
    fontSize: 20,
  },
});
