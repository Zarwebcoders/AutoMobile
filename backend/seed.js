const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const Category = require('./models/Category');
const Blog = require('./models/Blog');
const FAQ = require('./models/FAQ');
const User = require('./models/User');

dotenv.config();

// Hardcoded data from the project (Manually simplified for seeding)
const products = [
  {
    id: 'ridex-295w0003',
    name: 'RIDEX 295W0003 Wiper Motor',
    brand: 'RIDEX',
    price: 55.25,
    originalPrice: 75.59,
    image: 'https://enovathemes.com/mobex/wp-content/uploads/product-124-img-1.webp',
    rating: 4.8,
    reviews: 124,
    badge: 'Sale',
    sku: '295W0003',
    brandLogo: 'https://enovathemes.com/mobex/wp-content/uploads/ridex.svg',
    category: 'Wiper and washers',
    description: 'The RIDEX 295W0003 Wiper Motor is an essential component...'
  },
  // Add more if needed, but start with a few
];

const categories = [
  {
    id: "air-conditioning",
    name: "Air conditioning",
    icon: "https://enovathemes.com/mobex/wp-content/uploads/air-conditioner.svg",
    subcategories: [
      { name: "Ac compressor", href: "/product-category/air-conditioning/ac-compressor/" },
    ]
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Clear existing data
    await Product.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();

    // Create Admin User
    await User.create({
      name: 'Super Admin',
      email: 'admin@mobex.com',
      password: 'password123',
      role: 'Super Admin'
    });

    // Insert data
    await Product.insertMany(products);
    await Category.insertMany(categories);

    console.log('Data Seeded Successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
