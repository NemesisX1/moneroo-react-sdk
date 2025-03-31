export interface PaymentInitParams {
  amount: number;
  currency: string;
  description: string;
  email: string;
  firstName: string;
  lastName: string;
  returnUrl: string;
  methods?: string[];
}

export interface PaymentResponse {
  checkout_url: string;
}

export interface TransactionStatus {
  status: string;
  message: string;
}
