const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// URI de connexion à Atlas
const MONGO_URI = 'mongodb+srv://mge_admin:Mge2026Secure123@cluster0.lfoewcc.mongodb.net/mge_db';

const userSchema = new mongoose.Schema({
  nom: String,
  email: String,
  password: String,
  role: String,
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', default: null }
});

const User = mongoose.model('User', userSchema);

async function addAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connecté à MongoDB Atlas');
    
    // Supprimer l'ancien admin s'il existe
    const deleted = await User.deleteMany({ email: 'admin@gmail.com' });
    console.log(`🗑️ Supprimé: ${deleted.deletedCount} document(s)`);
    
    // Créer le hash du mot de passe
    const hashedPassword = await bcrypt.hash('admin123', 10);
    console.log('🔑 Hash créé');
    
    // Créer le nouvel admin
    const admin = new User({
      nom: 'Administrateur',
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: 'ADMIN'
    });
    
    await admin.save();
    console.log('✅ Admin créé avec succès !');
    console.log('📧 Email: admin@gmail.com');
    console.log('🔑 Mot de passe: admin123');
    console.log('🆔 ID:', admin._id);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
}

addAdmin();