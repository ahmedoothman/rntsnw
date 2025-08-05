import React, {useRef, useState, useEffect, useCallback} from 'react';
import {
  View,
  TextInput,
  Keyboard,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  StyleSheet,
} from 'react-native';

interface CustomOTPInputProps {
  value?: string;
  length?: number;
  onComplete?: (_otp: string) => void;
  onChange?: (_otp: string) => void;
  className?: string;
  autoFocus?: boolean;
  secureTextEntry?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

const CustomOTPInput: React.FC<CustomOTPInputProps> = ({
  value = '',
  length = 4,
  onComplete,
  onChange,
  className,
  autoFocus = true,
  secureTextEntry = false,
  disabled = false,
  placeholder,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Handle incoming value changes
  useEffect(() => {
    if (value) {
      const valueArray = value.split('').slice(0, length);
      const newOtp = [
        ...valueArray,
        ...Array(length - valueArray.length).fill(''),
      ].slice(0, length);

      setOtp(newOtp);

      if (valueArray.length === length && onComplete) {
        onComplete(value);
      }
    } else {
      setOtp(Array(length).fill(''));
    }
  }, [value, length, onComplete]);

  // Auto focus first input when component mounts
  useEffect(() => {
    if (autoFocus && !disabled && inputRefs.current[0]) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [autoFocus, disabled]);

  // Handle pasting OTP code
  const handlePaste = useCallback(
    (pastedText: string, index: number) => {
      if (pastedText) {
        const digits = pastedText
          .split('')
          .filter(char => /\d/.test(char))
          .slice(0, length - index);

        if (digits.length > 0) {
          const newOtp = [...otp];

          digits.forEach((digit, i) => {
            if (index + i < length) {
              newOtp[index + i] = digit;
            }
          });

          setOtp(newOtp);

          if (onChange) {
            onChange(newOtp.join(''));
          }

          const nextIndex = Math.min(index + digits.length, length - 1);
          if (nextIndex < length) {
            inputRefs.current[nextIndex]?.focus();
          } else {
            Keyboard.dismiss();
          }

          if (newOtp.every(digit => digit) && onComplete) {
            onComplete(newOtp.join(''));
            Keyboard.dismiss();
          }
        }
      }
    },
    [otp, length, onChange, onComplete],
  );

  const handleChange = useCallback(
    (text: string, index: number) => {
      if (text.length > 1) {
        handlePaste(text, index);
        return;
      }

      const digit = text.replace(/[^0-9]/g, '');
      const newOtp = [...otp];
      newOtp[index] = digit;
      setOtp(newOtp);

      if (onChange) {
        onChange(newOtp.join(''));
      }

      if (digit && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      const otpValue = newOtp.join('');
      if (newOtp.every(d => d) && onComplete) {
        onComplete(otpValue);
        Keyboard.dismiss();
      }
    },
    [otp, length, onChange, onComplete, handlePaste],
  );

  const handleKeyPress = useCallback(
    (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
      if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      if (e.nativeEvent.key === 'Backspace' && otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);

        if (onChange) {
          onChange(newOtp.join(''));
        }
      }
    },
    [otp, onChange],
  );

  // Create consistent styles
  const getInputStyle = (index: number) => {
    const hasValue = otp[index];
    return [
      styles.input,
      hasValue ? styles.inputFilled : styles.inputEmpty,
      disabled && styles.inputDisabled,
    ];
  };

  return (
    <View style={[styles.container, {direction: 'ltr'}]}>
      {Array(length)
        .fill(0)
        .map((_, index) => (
          <TextInput
            key={index}
            ref={ref => {
              inputRefs.current[index] = ref;
            }}
            style={[getInputStyle(index), {writingDirection: 'ltr'}]}
            maxLength={1}
            keyboardType="number-pad"
            value={otp[index]}
            onChangeText={text => handleChange(text, index)}
            onKeyPress={e => handleKeyPress(e, index)}
            secureTextEntry={secureTextEntry}
            selectTextOnFocus
            autoFocus={autoFocus && index === 0}
            editable={!disabled}
            placeholder={placeholder || ''}
            placeholderTextColor="#9CA3AF"
            textAlign="center"
            accessibilityLabel={`OTP digit ${index + 1} of ${length}`}
            accessibilityHint={`Enter digit ${index + 1} for verification code`}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 8,
  },
  input: {
    width: 60,
    height: 60,
    paddingHorizontal: 20,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    borderBottomWidth: 2,
  },
  inputFilled: {
    backgroundColor: '#ffffff',
    color: '#E5843B', // primary-600
    borderBottomColor: '#E5843B', // primary-500
  },
  inputEmpty: {
    backgroundColor: '#f9fafb', // gray-50
    color: '#9ca3af', // gray-400
    borderBottomColor: '#d1d5db', // gray-300
  },
  inputDisabled: {
    opacity: 0.5,
  },
});

export default CustomOTPInput;
