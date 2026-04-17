const bcrypt = require("bcrypt");

async function createHash() {
  try {
    const password = "123456"; // mot de passe du RESPONSABLE
    const saltRounds = 10;

    const hash = await bcrypt.hash(password, saltRounds);

    console.log("Mot de passe clair :", password);
    console.log("HASH À METTRE DANS LA BASE :");
    console.log(hash);
  } catch (error) {
    console.error("Erreur lors du hash :", error);
  }
}

createHash();