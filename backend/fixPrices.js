const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Product = require('./models/Product');

dotenv.config();

const fixPrices = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');

    const fileContent = fs.readFileSync('../src/assets/jsonformatter.txt', 'utf8');
    const jsonData = JSON.parse(fileContent);
    const productsData = jsonData.data.products.default;

    console.log(`Read ${productsData.length} products from JSON.`);

    let updatedCount = 0;

    for (const pData of productsData) {
      let price = 0;
      let originalPrice = undefined;

      // Extract price from price_html or prices_by_currency
      const priceHtml = pData.price_html;
      
      if (priceHtml.includes('<ins')) {
        // Sale price
        const delMatch = priceHtml.match(/<del.*?&#36;<\/span>([\d.,]+)/);
        const insMatch = priceHtml.match(/<ins.*?&#36;<\/span>([\d.,]+)/);
        
        if (insMatch) price = parseFloat(insMatch[1].replace(/,/g, ''));
        if (delMatch) originalPrice = parseFloat(delMatch[1].replace(/,/g, ''));
      } else {
        const match = priceHtml.match(/&#36;<\/span>([\d.,]+)/);
        if (match) price = parseFloat(match[1].replace(/,/g, ''));
      }

      if (price > 0) {
        const result = await Product.updateOne(
          { sku: pData.sku },
          { $set: { price, originalPrice } }
        );
        if (result.modifiedCount > 0) updatedCount++;
      }
    }

    console.log(`Updated prices for ${updatedCount} products.`);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

fixPrices();
