require('dotenv').config();
const app = require('./app');
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcrypt');

const PORT = process.env.PORT || 3000;

// Inicializa el cliente de Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Encriptar el DNI y mostrar el hash en consola
const dni = '76607392';
bcrypt.hash(dni, 10).then((hash) => {
  console.log('hash10:' + hash);

  // Función para comprobar la conexión a Supabase y existencia de tablas
  async function checkSupabaseConnection() {
    try {
      // Intenta leer la tabla 'User'
      const { data, error } = await supabase.from('User').select('*').limit(1);

      if (error) {
        console.error(
          '❌ Error al conectar con Supabase o acceder a la tabla users:',
          error.message
        );
        process.exit(1);
      } else {
        console.log(
          '✅ Conexión exitosa a Supabase. Tabla "users" encontrada.'
        );
      }
    } catch (err) {
      console.error('❌ Error inesperado al conectar a Supabase:', err.message);
      process.exit(1);
    }
  }

  checkSupabaseConnection().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(
        'Puedes probar los endpoints en /api/auth/register y /api/auth/login'
      );
    });
  });
});
