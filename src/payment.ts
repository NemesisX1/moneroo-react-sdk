import { PaymentInitParams, PaymentResponse } from "./types";

const MONEROO_API_URL = "https://api.moneroo.io/v1";

export async function initiatePayment(
  params: PaymentInitParams,
  secretKey: string
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

  console.log("📡 SDK - Réponse Moneroo brut :", response);

  if (!response.ok) {
    throw new Error(`Erreur Moneroo: ${response.statusText}`);
  }

  const data = await response.json();
  console.log("✅ SDK - Réponse JSON :", data);

  if (!data.checkout_url) {
    throw new Error("checkout_url est manquant !");
  }

  // ✅ Redirection automatique
  console.log("🔗 Redirection vers :", data.checkout_url);
  window.location.href = data.checkout_url;
}
