import bcrypt from 'bcrypt';
import prisma from './src/prisma.js';

async function main() {
  await prisma.usuario.deleteMany({ where: { email: 'davidbalbi@live.com' } });

  const hashedPassword = await bcrypt.hash('1234', 10);

  await prisma.usuario.create({
    data: {
      usuario_id: 51,
      nombre: 'David Balbi',
      email: 'davidbalbi@live.com',
      contrasena: hashedPassword,
      perfil_completo: false,
      rol: "3" // Pasamos el rol como un String plano
    },
  });

  console.log('Usuario creado exitosamente con contraseña hasheada.');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
