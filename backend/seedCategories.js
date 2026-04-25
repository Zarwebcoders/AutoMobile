const mongoose = require('mongoose');
const Category = require('./models/Category');

const MONGO_URI = 'mongodb://localhost:27017/mobex';

const categories = [
  {
    id: "air-conditioning",
    name: "Air conditioning",
    icon: "https://enovathemes.com/mobex/wp-content/uploads/category-icon-1.svg",
    subcategories: [
      { name: "Ac compressor", href: "/shop?category=air-conditioning&query=compressor" },
      { name: "Condenser", href: "/shop?category=air-conditioning&query=condenser" },
      { name: "Evaporator", href: "/shop?category=air-conditioning&query=evaporator" },
      { name: "View all", href: "/shop?category=air-conditioning", isViewAll: true }
    ]
  },
  {
    id: "brakes",
    name: "Brakes",
    icon: "https://enovathemes.com/mobex/wp-content/uploads/category-icon-2.svg",
    subcategories: [
      { name: "Brake pads", href: "/shop?category=brakes&query=pads" },
      { name: "Brake discs", href: "/shop?category=brakes&query=discs" },
      { name: "Brake calipers", href: "/shop?category=brakes&query=calipers" },
      { name: "View all", href: "/shop?category=brakes", isViewAll: true }
    ]
  },
  {
    id: "engine",
    name: "Engine",
    icon: "https://enovathemes.com/mobex/wp-content/uploads/category-icon-3.svg",
    subcategories: [
      { name: "Cylinder head", href: "/shop?category=engine&query=cylinder-head" },
      { name: "Crankshaft", href: "/shop?category=engine&query=crankshaft" },
      { name: "Pistons", href: "/shop?category=engine&query=pistons" },
      { name: "View all", href: "/shop?category=engine", isViewAll: true }
    ]
  },
  {
    id: "filters",
    name: "Filters",
    icon: "https://enovathemes.com/mobex/wp-content/uploads/category-icon-4.svg",
    subcategories: [
      { name: "Air filter", href: "/shop?category=filters&query=air-filter" },
      { name: "Oil filter", href: "/shop?category=filters&query=oil-filter" },
      { name: "Fuel filter", href: "/shop?category=filters&query=fuel-filter" },
      { name: "View all", href: "/shop?category=filters", isViewAll: true }
    ]
  },
  {
    id: "lighting",
    name: "Lighting",
    icon: "https://enovathemes.com/mobex/wp-content/uploads/category-icon-5.svg",
    subcategories: [
      { name: "Headlights", href: "/shop?category=lighting&query=headlights" },
      { name: "Tail lights", href: "/shop?category=lighting&query=tail-lights" },
      { name: "Fog lights", href: "/shop?category=lighting&query=fog-lights" },
      { name: "View all", href: "/shop?category=lighting", isViewAll: true }
    ]
  },
  {
    id: "suspension",
    name: "Suspension",
    icon: "https://enovathemes.com/mobex/wp-content/uploads/category-icon-6.svg",
    subcategories: [
      { name: "Shock absorbers", href: "/shop?category=suspension&query=shocks" },
      { name: "Control arms", href: "/shop?category=suspension&query=arms" },
      { name: "Coil springs", href: "/shop?category=suspension&query=springs" },
      { name: "View all", href: "/shop?category=suspension", isViewAll: true }
    ]
  },
  {
    id: "transmission",
    name: "Transmission",
    icon: "https://enovathemes.com/mobex/wp-content/uploads/category-icon-7.svg",
    subcategories: [
      { name: "Clutch kit", href: "/shop?category=transmission&query=clutch" },
      { name: "Flywheel", href: "/shop?category=transmission&query=flywheel" },
      { name: "Drive shaft", href: "/shop?category=transmission&query=shaft" },
      { name: "View all", href: "/shop?category=transmission", isViewAll: true }
    ]
  }
];

const seedCategories = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    await Category.deleteMany();
    console.log('Deleted existing categories');

    await Category.insertMany(categories);
    console.log('Inserted categories successfully');

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedCategories();
