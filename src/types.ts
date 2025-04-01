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
  message: string;
  data: {
    id: string;
    checkout_url: string;
  };
  errors?: any;
}

export interface TransactionStatus {
  status: string;
  message: string;
}
