const {PrismaClient} = require("@prisma/client");
const  { hash } = require( "bcrypt");
async function createDefaultUser() {
    const prisma = new PrismaClient();
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email: 'default@example.com' },
      });
      console.log(existingUser)
  
      if (!existingUser) {
        const createdUser = await prisma.user.create({
          data: {
            email: 'default@example.com',
            password: await hash('password123', 10),
          },
        });
        
        console.log('Default user created:', createdUser);
      } else {
        console.log('Default user already exists.');
      }
  
    } catch (error) {
      console.error('Error creating default user:', error);
    } finally {
      await prisma.$disconnect();
    }
}
  
createDefaultUser();

