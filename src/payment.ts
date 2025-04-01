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

  if (!response.ok) {
    throw new Error(`Erreur Moneroo: ${response.statusText}`);
  }

  const data: PaymentResponse = await response.json();
  console.log("✅ Réponse Moneroo :", data);

  if (!data.data?.checkout_url) {
    console.error("❌ checkout_url est manquant dans la réponse !");
    throw new Error("checkout_url est manquant !");
  }
  
  // Vérification si l'environnement est un navigateur avant la redirection
  if (typeof window !== "undefined") {
    console.log("🔗 Redirection vers :", data.data.checkout_url);
    window.location.href = data.data.checkout_url;
  } else {
    console.log("🔗 Redirection non effectuée - environnement non navigateur.");
  }

  return;
}
