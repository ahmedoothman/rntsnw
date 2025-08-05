import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, TextInput} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Text} from '@components/Text';

interface CounterInputProps {
  label: string;
  count?: number;
  onChange?: (_value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

const CounterInput: React.FC<CounterInputProps> = ({
  label,
  count = 0,
  onChange,
  min = 0,
  max,
  className,
}) => {
  const [value, setValue] = useState(count);
  const [inputValue, setInputValue] = useState(count.toString());

  // Sync state when count changes from parent
  useEffect(() => {
    setValue(count);
    setInputValue(count.toString());
  }, [count]);

  const handleIncrement = () => {
    if (max !== undefined && value >= max) {
      return;
    }
    const newValue = value + 1;
    setValue(newValue);
    setInputValue(newValue.toString());
    onChange?.(newValue);
  };

  const handleDecrement = () => {
    if (value > min) {
      const newValue = value - 1;
      setValue(newValue);
      setInputValue(newValue.toString());
      onChange?.(newValue);
    }
  };

  const handleInputChange = (text: string) => {
    // Allow empty string during typing
    setInputValue(text);

    // Only update the actual value if it's a valid number
    const numValue = parseInt(text, 10);
    if (!isNaN(numValue)) {
      // Apply min/max constraints
      let constrainedValue = numValue;
      if (min !== undefined && numValue < min) {
        constrainedValue = min;
      } else if (max !== undefined && numValue > max) {
        constrainedValue = max;
      }

      if (numValue !== constrainedValue) {
        // If we had to constrain the value, update the input
        setInputValue(constrainedValue.toString());
      }

      setValue(constrainedValue);
      onChange?.(constrainedValue);
    }
  };

  const handleBlur = () => {
    // On blur, reset to current value if input is empty or invalid
    if (inputValue === '' || isNaN(parseInt(inputValue, 10))) {
      setInputValue(value.toString());
    }
  };

  return (
    <View
      className={`flex-row justify-between items-center mt-4 px-4 ${
        className || ''
      }`}>
      <Text weight="medium" className="text-base text-primary-600">
        {label}
      </Text>
      <View className="flex-row items-center gap-3">
        <TouchableOpacity onPress={handleDecrement} disabled={value <= min}>
          <AntDesign
            name="minuscircleo"
            size={24}
            color={value <= min ? '#9CA3AF' : '#E5843B'}
          />
        </TouchableOpacity>

        <TextInput
          className="min-w-12 text-center p-1 border border-gray-400 rounded-lg text-base text-primary-600"
          keyboardType="numeric"
          value={inputValue}
          onChangeText={handleInputChange}
          onBlur={handleBlur}
          selectTextOnFocus
        />

        <TouchableOpacity
          onPress={handleIncrement}
          disabled={max !== undefined && value >= max}>
          <AntDesign
            name="pluscircleo"
            size={24}
            color={max !== undefined && value >= max ? '#9CA3AF' : '#E5843B'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(CounterInput);
