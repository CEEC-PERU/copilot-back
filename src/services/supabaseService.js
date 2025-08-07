const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcrypt');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Registro de usuario (crea usuario en tabla users de Supabase)
exports.registerUser = async (email, password, role_id) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from('User')
    .insert([{ email, password: hashedPassword, role_id }])
    .select();

  return { data, error };
};

// Login: busca usuario y compara password
exports.loginUser = async (email, password) => {
  const { data: users, error } = await supabase
    .from('User')
    .select('*')
    .eq('email', email);

  if (error || users.length === 0) {
    return { error: error || { message: 'User not found' } };
  }

  const user = users[0];
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return { error: { message: 'Invalid credentials' } };
  }

  return { user };
};
