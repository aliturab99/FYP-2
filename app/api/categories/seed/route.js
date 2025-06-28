import connectDB from "@/app/lib/mongoose";
import Category from "@/app/models/Category";
import { DEFAULT_CATEGORIES } from "@/app/lib/categories";

export async function POST() {
  try {
    await connectDB();
    
    // Check if we have enough categories (less than 3 means we should add more)
    const existingCategories = await Category.find();
    if (existingCategories.length >= 3) {
      return new Response(JSON.stringify({ 
        message: 'Categories already exist', 
        count: existingCategories.length 
      }), { status: 200 });
    }

    // Get existing category IDs to avoid duplicates
    const existingIds = existingCategories.map(cat => cat.id);
    const categoriesToAdd = DEFAULT_CATEGORIES.filter(cat => !existingIds.includes(cat.id));

    if (categoriesToAdd.length === 0) {
      return new Response(JSON.stringify({ 
        message: 'All default categories already exist', 
        count: existingCategories.length 
      }), { status: 200 });
    }

    // Insert remaining default categories
    const categories = await Category.insertMany(categoriesToAdd.map(cat => ({
      ...cat,
      description: `Default ${cat.name.toLowerCase()} category`,
      isActive: true
    })));

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Added ${categories.length} new categories`, 
      categories,
      total: existingCategories.length + categories.length
    }), { status: 201 });
    
  } catch (error) {
    console.error('Error seeding categories:', error);
    return new Response(JSON.stringify({ error: 'Failed to seed categories' }), { status: 500 });
  }
}
