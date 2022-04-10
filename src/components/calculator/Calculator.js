import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import Sound from 'react-native-sound';

import CalculatorButton from './Button';
import CalculatorDisplay from './Display';

import MainSoundFile from './sounds/mainSound.m4a';
import MainImageFile from './img/ger.jpg';

export default ({}) => {
  const [displayValueState, setDisplayValueState] = useState('0');
  const [clearDisplayState, setClearDisplayState] = useState(true);
  const [operationState, setOperationState] = useState(null);
  const [valuesState, setValuesState] = useState([0, 0]);
  const [currentValueState, setCurrentValueState] = useState(0);
  const [mainSoundPlaying, setMainSoundPlaying] = useState(0);

  Sound.setCategory('Playback');

  let mainSound = new Sound(MainSoundFile, error => {
    if (error) {
      mainSound = null;
      return;
    }
    mainSound.setVolume(1.0);
  });

  const addDigit = digit => {
    let valuesStateCopy = [...valuesState];
    let displayValueStateCopy = displayValueState;
    let currentValueStateCopy = currentValueState;

    if (currentValueState == 1 && operationState == null) {
      valuesStateCopy = [0, 0];
      displayValueStateCopy = '0';
      currentValueStateCopy = 0;

      setValuesState(valuesStateCopy);
      setDisplayValueState(displayValueStateCopy);
      setCurrentValueState(currentValueStateCopy);
    }

    const clearDisplay = displayValueStateCopy == '0' || clearDisplayState;

    if (digit === '.' && !clearDisplay && displayValueStateCopy.includes('.')) {
      return;
    }

    const currentValue = clearDisplay ? '' : displayValueState;
    const displayValue = currentValue + digit;
    setDisplayValueState(displayValue);
    setClearDisplayState(false);

    if (digit !== '.') {
      const newValue = parseFloat(displayValue);
      valuesStateCopy[currentValueStateCopy] = newValue;
      setValuesState(valuesStateCopy);
    }
  };

  const clearMemory = () => {
    setDisplayValueState('0');
    setClearDisplayState(true);
    setOperationState(null);
    setValuesState([0, 0]);
    setCurrentValueState(0);
  };

  const clearMemoryWithSound = () => {
    if (mainSound) {
      setMainSoundPlaying(1);
      mainSound.play(success => {
        if (success) {
          setTimeout(() => {
            clearMemory();
            setMainSoundPlaying(0);
          }, mainSound.getDuration());
        } else {
          clearMemory();
          setMainSoundPlaying(0);
        }
      });
    } else {
      clearMemory();
    }
  };

  const setOperation = operation => {
    const equals = operation === '=';

    if (operationState == null && equals) return;

    if (operation === '-' && clearDisplayState) {
      const values = [...valuesState];
      values[currentValueState] = 0;

      setDisplayValueState(operation);
      setValuesState(values);
      setClearDisplayState(false);
    } else if (currentValueState == 0) {
      setOperationState(operation);
      setCurrentValueState(1);
      setClearDisplayState(true);
    } else {
      const values = [...valuesState];

      try {
        values[0] = eval(`(${values[0]}) ${operationState} (${values[1]})`);
      } catch (e) {
        values[0] = valuesState[0];
      }

      values[1] = 0;
      setDisplayValueState(`${values[0]}`);
      setOperationState(equals ? null : operation);
      setCurrentValueState(1);
      setClearDisplayState(true);
      setValuesState(values);
    }
  };

  return (
    <View
      style={styles.Container}
      pointerEvents={mainSoundPlaying ? 'none' : 'auto'}>
      <CalculatorDisplay
        value={displayValueState}
        operator={operationState}
        firstValue={valuesState[0]}
        secondValue={valuesState[1]}
      />
      <ImageBackground
        source={MainImageFile}
        resizeMode="cover"
        style={styles.image}>
        <View
          style={
            mainSoundPlaying
              ? [styles.Buttons, styles.Disabled]
              : styles.Buttons
          }>
          <CalculatorButton
            label="AC"
            size="triple"
            onClick={clearMemoryWithSound}
          />
          <CalculatorButton label="/" type="operation" onClick={setOperation} />
          <CalculatorButton label="7" onClick={addDigit} />
          <CalculatorButton label="8" onClick={addDigit} />
          <CalculatorButton label="9" onClick={addDigit} />
          <CalculatorButton label="*" type="operation" onClick={setOperation} />
          <CalculatorButton label="4" onClick={addDigit} />
          <CalculatorButton label="5" onClick={addDigit} />
          <CalculatorButton label="6" onClick={addDigit} />
          <CalculatorButton label="-" type="operation" onClick={setOperation} />
          <CalculatorButton label="1" onClick={addDigit} />
          <CalculatorButton label="2" onClick={addDigit} />
          <CalculatorButton label="3" onClick={addDigit} />
          <CalculatorButton label="+" type="operation" onClick={setOperation} />
          <CalculatorButton label="0" size={'double'} onClick={addDigit} />
          <CalculatorButton label="." onClick={addDigit} />
          <CalculatorButton label="=" type="operation" onClick={setOperation} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flexGrow: 1,
  },
  Buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  Disabled: {
    opacity: 0.6,
  },
});
