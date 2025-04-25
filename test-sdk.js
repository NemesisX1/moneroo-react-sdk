import { checkTransactionStatus } from "./dist/transaction.js"; // Assure-toi que le chemin est correct

async function testTransaction() {
  console.log("🧪 Test de la récupération du statut de transaction...");

  try {
    const transactionId = "py_mnelmvz2qvqs"; // Remplace par une transaction valide
    const secretKey = "pvk_pg8twv|01JQH06R52P7ZR3H05B2TA6ZRM"; // Remplace par ta clé API valide

    const status = await checkTransactionStatus(transactionId, secretKey);
    console.log("✅ Statut de la transaction :", status);
  } catch (error) {
    console.error("❌ Erreur lors du test de la transaction :", error);
  }
}

testTransaction();
