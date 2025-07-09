import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {login} from '@redux/slices/authSlice';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

const RegisterScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {isDarkMode} = useAppSelector(state => state.theme);
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const navigation = useNavigation();

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert(t('error'), t('please_fill_all_fields'));
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(t('error'), t('passwords_do_not_match'));
      return;
    }

    // For now, just dispatch login action without actual registration
    dispatch(
      login({
        user: {
          id: '1',
          email: email,
          name: name,
        },
        token: 'fake-token',
      }),
    );
  };

  const theme = {
    backgroundColor: isDarkMode ? '#111827' : '#F9FAFB',
    cardColor: isDarkMode ? '#1F2937' : '#FFFFFF',
    textColor: isDarkMode ? '#F9FAFB' : '#111827',
    borderColor: isDarkMode ? '#374151' : '#D1D5DB',
    inputColor: isDarkMode ? '#374151' : '#F9FAFB',
    primaryColor: '#3B82F6',
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={[styles.card, {backgroundColor: theme.cardColor}]}>
            <Text style={[styles.title, {color: theme.textColor}]}>
              {t('create_account')}
            </Text>
            <Text style={[styles.subtitle, {color: theme.textColor}]}>
              {t('sign_up_to_get_started')}
            </Text>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, {color: theme.textColor}]}>
                {t('full_name')}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.inputColor,
                    borderColor: theme.borderColor,
                    color: theme.textColor,
                  },
                ]}
                value={name}
                onChangeText={setName}
                placeholder={t('enter_full_name')}
                placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, {color: theme.textColor}]}>
                {t('email')}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.inputColor,
                    borderColor: theme.borderColor,
                    color: theme.textColor,
                  },
                ]}
                value={email}
                onChangeText={setEmail}
                placeholder={t('enter_email')}
                placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, {color: theme.textColor}]}>
                {t('password')}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.inputColor,
                    borderColor: theme.borderColor,
                    color: theme.textColor,
                  },
                ]}
                value={password}
                onChangeText={setPassword}
                placeholder={t('enter_password')}
                placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
                secureTextEntry
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, {color: theme.textColor}]}>
                {t('confirm_password')}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.inputColor,
                    borderColor: theme.borderColor,
                    color: theme.textColor,
                  },
                ]}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder={t('confirm_your_password')}
                placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              style={[
                styles.registerButton,
                {backgroundColor: theme.primaryColor},
              ]}
              onPress={handleRegister}>
              <Text style={styles.registerButtonText}>{t('sign_up')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginLink}
              onPress={() => navigation.navigate('Login' as never)}>
              <Text style={[styles.loginText, {color: theme.primaryColor}]}>
                {t('already_have_account')} {t('sign_in')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  card: {
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    opacity: 0.7,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  registerButton: {
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  loginLink: {
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default RegisterScreen;
