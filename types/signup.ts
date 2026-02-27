export interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  referralCode?: string | undefined;
  acceptTerms: boolean;
}