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
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {login} from '../../redux/slices/authSlice';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {isDarkMode} = useAppSelector(state => state.theme);
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const navigation = useNavigation();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert(t('error'), t('please_fill_all_fields'));
      return;
    }

    // For now, just dispatch login action without actual authentication
    dispatch(
      login({
        user: {
          id: '1',
          email: email,
          name: 'Test User',
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
      <View style={styles.content}>
        <View style={[styles.card, {backgroundColor: theme.cardColor}]}>
          <Text style={[styles.title, {color: theme.textColor}]}>
            {t('welcome_back')}
          </Text>
          <Text style={[styles.subtitle, {color: theme.textColor}]}>
            {t('sign_in_to_continue')}
          </Text>

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

          <TouchableOpacity
            style={[styles.loginButton, {backgroundColor: theme.primaryColor}]}
            onPress={handleLogin}>
            <Text style={styles.loginButtonText}>{t('sign_in')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerLink}
            onPress={() => navigation.navigate('Register' as never)}>
            <Text style={[styles.registerText, {color: theme.primaryColor}]}>
              {t('dont_have_account')} {t('sign_up')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
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
  loginButton: {
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  registerLink: {
    alignItems: 'center',
  },
  registerText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LoginScreen;
