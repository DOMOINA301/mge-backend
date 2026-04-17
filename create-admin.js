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
    await mongoose.connect('mongodb://127.0.0.1:27017/mge_db');
    console.log('Connecté à MongoDB');
    
    const existingAdmin = await User.findOne({ email: 'admin@gmail.com' });
    
    if (existingAdmin) {
      console.log('Admin existe déjà');
      await User.deleteOne({ email: 'admin@gmail.com' });
      console.log('Ancien admin supprimé');
    }
    
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
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
    
    process.exit(0);
  } catch (error) {
    console.error('Erreur:', error);
    process.exit(1);
  }
}

createAdmin();