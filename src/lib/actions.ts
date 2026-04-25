"use server";

import { revalidatePath } from 'next/cache';

export async function addToCart(formData: FormData) {
  const productId = formData.get('productId');
  
  // Simulate database or API call
  console.log(`Adding product ${productId} to cart...`);
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, you'd update a cookie or database here
  
  revalidatePath('/');
}

