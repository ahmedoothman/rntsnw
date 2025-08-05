import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import CustomInput from './CustomInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import {Text} from '@components/Text';

interface CustomTimePickerProps {
  label?: string;
  value?: string; // 24-hour format string (e.g., "14:30")
  onChange: (_time: string) => void; // Will receive 24-hour format
  errorMessage?: string;
  className?: string;
  placeholder?: string;
}

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
  label,
  value,
  onChange,
  errorMessage,
  className,
  placeholder,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const {t} = useTranslation();

  const handleTimeChange = (
    event: DateTimePickerEvent,
    selectedTime?: Date,
  ) => {
    setShowPicker(false);
    if (selectedTime) {
      onChange(formatTimeTo24Hour(selectedTime));
    }
  };

  // Convert Date object to 24-hour format string (HH:MM)
  const formatTimeTo24Hour = (time: Date): string => {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Convert 24-hour format string to 12-hour format for display
  const formatTimeTo12Hour = (time24: string): string => {
    if (!time24) {
      return '';
    }

    const [hoursStr, minutesStr] = time24.split(':');
    const hours = parseInt(hoursStr, 10);

    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;

    return `${displayHours}:${minutesStr} ${period}`;
  };

  // Convert 24-hour format string to Date object for the picker
  const getTimeAsDate = (time24?: string): Date => {
    const now = new Date();
    if (!time24) {
      return now;
    }

    const [hoursStr, minutesStr] = time24.split(':');
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  const displayValue = value ? formatTimeTo12Hour(value) : '';

  return (
    <View className={`w-full mb-2 ${className || ''}`}>
      {label && (
        <Text weight="medium" className="text-base text-gray-800 mb-2">
          {label}
        </Text>
      )}
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <CustomInput
          value={displayValue}
          placeholder={
            placeholder ||
            (label
              ? `${t('components.timePicker.selectTime')} ${label}`
              : t('components.timePicker.selectTime'))
          }
          onChangeText={() => {}}
          className={`bg-white opacity-90 ${
            errorMessage ? 'border-red-500' : ''
          }`}
          editable={false}
          icon={<Ionicons name="time-outline" size={20} color="#999" />}
        />
      </TouchableOpacity>

      {errorMessage && (
        <Text className="text-red-500 text-xs mt-0 ml-4">{errorMessage}</Text>
      )}

      {showPicker && (
        <DateTimePicker
          value={getTimeAsDate(value)}
          mode="time"
          display="default"
          onChange={handleTimeChange}
          is24Hour={false} // Show 12-hour format in picker
        />
      )}
    </View>
  );
};

export default CustomTimePicker;
