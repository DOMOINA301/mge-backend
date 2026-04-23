const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://mge_admin:Mge2026Secure123@cluster0.lfoewcc.mongodb.net/mge_db';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ CONNEXION RÉUSSIE !');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ ERREUR:', err.message);
    process.exit(1);
  });