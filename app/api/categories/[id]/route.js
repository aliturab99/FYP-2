import connectDB from "@/app/lib/mongoose";
import Category from "@/app/models/Category";

// GET single category
export async function GET(req, { params }) {
  try {
    await connectDB();
    const category = await Category.findOne({ id: params.id });
    if (!category) {
      return new Response(JSON.stringify({ error: 'Category not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(category), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch category' }), { status: 500 });
  }
}

// UPDATE category
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, description, icon, order, isActive } = body;
    
    if (!name) {
      return new Response(JSON.stringify({ error: 'Name is required' }), { status: 400 });
    }

    const updatedCategory = await Category.findOneAndUpdate(
      { id: params.id },
      {
        name,
        description: description || '',
        icon: icon || '📦',
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!updatedCategory) {
      return new Response(JSON.stringify({ error: 'Category not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true, category: updatedCategory }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update category' }), { status: 500 });
  }
}

// DELETE category
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const deletedCategory = await Category.findOneAndDelete({ id: params.id });
    
    if (!deletedCategory) {
      return new Response(JSON.stringify({ error: 'Category not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true, message: 'Category deleted successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete category' }), { status: 500 });
  }
}
