import { PaymentInitParams, PaymentResponse } from "./types";

const MONEROO_API_URL = "https://api.moneroo.io/v1";

export async function initiatePayment(
  params: PaymentInitParams,
  secretKey: string
): Promise<PaymentResponse> {
  const response = await fetch(`${MONEROO_API_URL}/payments/initialize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secretKey}`,
      Accept: "application/json",
    },
    body: JSON.stringify({
      amount: params.amount,
      currency: params.currency,
      description: params.description,
      customer: {
        email: params.email,
        first_name: params.firstName,
        last_name: params.lastName,
      },
      return_url: params.returnUrl,
      methods: params.methods || ["mtn_bj"], // Par défaut, un moyen de paiement
    }),
  });

  if (!response.ok) {
    throw new Error(`Erreur Moneroo: ${response.statusText}`);
  }

  return response.json();
}
