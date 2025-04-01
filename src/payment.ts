import { PaymentInitParams, PaymentResponse } from "./types";

const MONEROO_API_URL = "https://api.moneroo.io/v1";

export async function initiatePayment(
  params: PaymentInitParams,
  secretKey: string
  //   autoRedirect: boolean = true
): Promise<void> {
  console.log("🔍 SDK - Données envoyées :", params);

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
      methods: params.methods || ["mtn_bj"],
    }),
  });

  if (!response.ok) {
    throw new Error(`Erreur Moneroo: ${response.statusText}`);
  }

  window.location.href = response.data?.checkout_url;

  //   const PaymentResponse = await response.json();
  //   console.log("✅ Réponse Moneroo :", PaymentResponse);

  //   if (!PaymentResponse.data?.checkout_url) {
  //     console.error("❌ checkout_url est manquant dans la réponse !");
  //     throw new Error("checkout_url est manquant !");
  //   }

  //   // Redirection automatique depuis le SDK
  //   //   if (autoRedirect) {
  //   console.log("🔗 Redirection vers :", PaymentResponse.data.checkout_url);
  //   window.location.href = PaymentResponse.data.checkout_url;
  //   //   }

  return;
}
