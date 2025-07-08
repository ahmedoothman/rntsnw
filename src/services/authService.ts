import axiosInstance from '../../axiosInstance';
import {
  LoginPayload,
  RegisterPayload,
  OtpPayload,
  ForgetPasswordPayload,
  ResetPasswordPayload,
  ChangePasswordPayload,
} from '../types/auth';
export const login = async (data: LoginPayload) => {
  const response = await axiosInstance.post('clients/auth/login', data);
  return response.data;
};

export const register = async (data: RegisterPayload) => {
  const response = await axiosInstance.post('clients/auth/register', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const verifyOtp = async (data: OtpPayload) => {
  const response = await axiosInstance.post('clients/auth/otp/verify', data);
  return response.data;
};
export const resendOtp = async () => {
  const response = await axiosInstance.get('clients/auth/otp/resend');
  return response.data;
};

export const getProfile = async () => {
  const respone = await axiosInstance.get('clients/auth/profile');
  return respone.data;
};
export const forgetPassword = async (data: ForgetPasswordPayload) => {
  const response = await axiosInstance.post(
    'clients/auth/forget-password',
    data,
  );
  return response.data;
};

export const resetPassword = async (data: ResetPasswordPayload) => {
  const response = await axiosInstance.post(
    'clients/auth/reset-password',
    data,
  );
  return response.data;
};
export const updateProfile = async (data: RegisterPayload) => {
  const response = await axiosInstance.post(
    'clients/auth/update-client-profile',
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};

export const changePassword = async (data: ChangePasswordPayload) => {
  const response = await axiosInstance.post(
    'clients/auth/client-change-password',
    data,
  );
  return response.data;
};
