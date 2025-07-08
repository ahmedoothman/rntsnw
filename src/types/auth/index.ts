export type USER = {
  id?: string;
  email?: string;
  phone_number?: string;
  password?: string;
};

export type LoginPayload = {
  id?: string;
  email?: string;
  phone_number?: string;
  password?: string;
};

export type RegisterPayload = {
  id?: string;
  email?: string;
  phone_number?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  profile_picture?: string;
};

export type OtpPayload = {
  otp: string;
};

export type ForgetPasswordPayload = {
  identifier: string;
};

export type ResetPasswordPayload = {
  signature: string;
  otp: string;
  password: string;
  password_confirmation: string;
};

export type ChangePasswordPayload = {
  old_password: string;
  new_password: string;
  new_password_confirmation: string;
};
