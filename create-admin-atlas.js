const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  nom: String,
  email: String,
  password: String,
  role: String,
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', default: null }
});

const User = mongoose.model('User', userSchema);

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connecté à MongoDB Atlas');
    
    // Supprimer l'ancien admin s'il existe
    await User.deleteMany({ email: 'admin@gmail.com' });
    console.log('Ancien admin supprimé');
    
    // Créer le hash du mot de passe
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    // Créer le nouvel admin
    const admin = new User({
      nom: 'Administrateur',
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: 'ADMIN'
    });
    
    await admin.save();
    console.log('✅ Admin créé avec succès dans Atlas !');
    console.log('📧 Email: admin@gmail.com');
    console.log('🔑 Mot de passe: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Erreur:', error);
    process.exit(1);
  }
}

createAdmin();