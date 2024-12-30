import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const users = [];

  for (let i = 0; i < 10; i++) {
    const email = faker.internet.email();
    const name = faker.person.fullName();
    const username = faker.internet.username({ firstName: name });
    const password = await bcrypt.hash('password123', 10); // Use the same password for simplicity
    const avatar = faker.image.avatar();

    users.push({
      email,
      name,
      username,
      password,
      avatar,
    });
  }

  // Insert the generated users into the database
  for (const user of users) {
    await prisma.user.create({ data: user });
  }

  const customers = [];

  // Generate 10 fake customers
  for (let i = 0; i < 10; i++) {
    const email = faker.internet.email();
    const name = faker.person.fullName();
    const username = faker.internet.username({ firstName: name });
    const password = await bcrypt.hash('password123', 10); // Use the same password for simplicity
    const avatar = faker.image.avatar();
    const createdAt = faker.date.past();

    customers.push({
      email,
      name,
      username,
      password,
      avatar,
      createdAt,
    });
  }

  // Insert customers into the database
  for (const customer of customers) {
    await prisma.customer.create({ data: customer });
  }

  // Seed Vendors
  console.log('Seeding Vendors...');
  const vendors = [];
  for (let i = 0; i < 5; i++) {
    vendors.push(
      await prisma.vendor.create({
        data: {
          name: faker.company.name(),
          thumbnail: faker.image.urlPicsumPhotos(),
          createdAt: faker.date.past(),
        },
      }),
    );
  }

  // Seed Categories
  console.log('Seeding Categories...');
  const categories = [];
  for (let i = 0; i < 5; i++) {
    categories.push(
      await prisma.category.create({
        data: {
          name: faker.commerce.department(),
          thumbnail: faker.image.urlPicsumPhotos(),
          createdAt: faker.date.past(),
        },
      }),
    );
  }

  // Seed Products
  console.log('Seeding Products...');
  const products = [];
  for (let i = 0; i < 20; i++) {
    products.push(
      await prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          desc: faker.commerce.productDescription(),
          price: parseFloat(faker.commerce.price()),
          createdAt: faker.date.past(),
          vendorId: vendors[Math.floor(Math.random() * vendors.length)].id,
          categoryId:
            categories[Math.floor(Math.random() * categories.length)].id,
        },
      }),
    );
  }

  // Seed Orders
  console.log('Seeding Orders...');
  const orders = [];
  for (let i = 0; i < 10; i++) {
    const orderProducts = faker.helpers.arrayElements(
      products,
      faker.number.int({ min: 1, max: 5 }),
    );

    let totalPrice = 0;
    let quantity = 0;

    // Create Order
    const order = await prisma.order.create({
      data: {
        customerId: faker.number.int({ min: 0, max: 10 }),
        createdAt: faker.date.past(),
        quantity: 0, // Will update later
        totalPrice: 0, // Will update later
      },
    });

    // Create LineOrders for the Order
    for (const product of orderProducts) {
      const lineOrderQuantity = faker.number.int({ min: 1, max: 5 });
      const lineOrderPrice = product.price * lineOrderQuantity;

      await prisma.lineOrder.create({
        data: {
          quantity: lineOrderQuantity,
          price: lineOrderPrice,
          createdAt: faker.date.past(),
          productId: product.id,
          orderId: order.id,
        },
      });

      totalPrice += lineOrderPrice;
      quantity += lineOrderQuantity;
    }

    // Update Order with totalPrice and quantity
    orders.push(
      await prisma.order.update({
        where: { id: order.id },
        data: { totalPrice, quantity },
      }),
    );
  }

  await prisma.discountCode.create({
    data: {
      code: faker.string.nanoid(),
      description: faker.commerce.productDescription(),
      minAmount: faker.number.int({ min: 100, max: 10000 }),
      discountRate: faker.number.int({ min: 1, max: 100 }) / 100,
      numberCodeApply: faker.number.int({ min: 5, max: 20 }),
      productDiscountCodes: {
        createMany: {
          data: [
            { productId: faker.number.int({ min: 1, max: 100 }) },
            { productId: faker.number.int({ min: 1, max: 100 }) },
            { productId: faker.number.int({ min: 1, max: 100 }) },
          ],
        },
      },
    },
  });

  console.log('Discount codes seeded!');

  console.log('Fake user data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
