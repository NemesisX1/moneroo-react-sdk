import { initiatePayment } from "./dist/payment.js"; // Adapter selon l'export du SDK

const params = {
  amount: 1000,
  currency: "XOF",
  description: "Test paiement",
  email: "test@example.com",
  firstName: "John",
  lastName: "Doe",
  returnUrl: "https://example.com/thank-you",
};

const secretKey = "pvk_pg8twv|01JQH06R52P7ZR3H05B2TA6ZRM";

(async () => {
  try {
    console.log("🚀 Test du SDK en local...");
    await initiatePayment(params, secretKey);
  } catch (error) {
    console.error("❌ Erreur lors du test du SDK :", error);
  }
})();
