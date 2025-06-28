import connectDB from "@/app/lib/mongoose";
import Category from "@/app/models/Category";

// GET all categories
export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find().sort({ order: 1, name: 1 });
    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch categories' }), { status: 500 });
  }
}

// POST new category
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { id, name, description, icon, order } = body;
    
    if (!id || !name) {
      return new Response(JSON.stringify({ error: 'ID and name are required' }), { status: 400 });
    }

    // Check if category with this ID already exists
    const existingCategory = await Category.findOne({ id });
    if (existingCategory) {
      return new Response(JSON.stringify({ error: 'Category with this ID already exists' }), { status: 400 });
    }

    const newCategory = await Category.create({
      id,
      name,
      description: description || '',
      icon: icon || '📦',
      order: order || 0,
      isActive: true
    });

    return new Response(JSON.stringify({ success: true, category: newCategory }), { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return new Response(JSON.stringify({ error: 'Failed to create category' }), { status: 500 });
  }
}
