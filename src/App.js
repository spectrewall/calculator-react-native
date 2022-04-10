import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import Calculator from './components/calculator/Calculator';

export default ({}) => {
  return (
    <SafeAreaView style={styles.screen}>
      <Calculator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
  },
});
