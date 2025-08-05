import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import CustomInput from './CustomInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import {Text} from '@components/Text';

interface CustomDatePickerProps {
  label?: string;
  value?: string;
  onChange: (_date: string) => void;
  minimumDate?: Date;
  maximumDate?: Date;
  errorMessage?: string;
  className?: string;
  placeholder?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  value,
  onChange,
  minimumDate,
  maximumDate,
  errorMessage,
  className,
  placeholder,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const {t} = useTranslation();

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    setShowPicker(false);
    if (selectedDate) {
      onChange(formatDate(selectedDate));
    }
  };

  const formatDate = (date: Date): string => date.toISOString().split('T')[0];

  return (
    <View className={`w-full mb-2 ${className || ''}`}>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <CustomInput
          label={label}
          value={value}
          placeholder={
            placeholder ||
            (label
              ? `${t('components.datePicker.selectDate')} ${label}`
              : t('components.datePicker.selectDate'))
          }
          onChangeText={() => {}}
          className={`bg-white opacity-90 ${
            errorMessage ? 'border-red-500' : ''
          }`}
          editable={false}
          icon={<Ionicons name="calendar-clear" size={20} color="#999" />}
        />
      </TouchableOpacity>

      {errorMessage && (
        <Text className="text-red-500 text-xs mt-0 ml-4">{errorMessage}</Text>
      )}

      {showPicker && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </View>
  );
};

export default CustomDatePicker;
