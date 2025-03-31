import { TransactionStatus } from "./types";

export async function checkTransactionStatus(
  transactionId: string,
  secretKey: string
): Promise<TransactionStatus> {
  const response = await fetch(
    `https://api.moneroo.io/v1/payments/${transactionId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Erreur Moneroo: ${response.statusText}`);
  }

  return response.json();
}
