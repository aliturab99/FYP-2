import connectDB from "@/app/lib/mongoose";
import Product from "@/app/models/Product";

// GET single product
export async function GET(req, { params }) {
  try {
    await connectDB();
    const product = await Product.findById(params.id);
    if (!product) {
      return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch product' }), { status: 500 });
  }
}

// UPDATE product
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, price, image, link, category } = body;
    
    if (!name || !price || !image || !link || !category) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      params.id,
      {
        name,
        price: parseFloat(price),
        image,
        link,
        category,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!updatedProduct) {
      return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true, product: updatedProduct }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update product' }), { status: 500 });
  }
}

// DELETE product
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const deletedProduct = await Product.findByIdAndDelete(params.id);
    
    if (!deletedProduct) {
      return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true, message: 'Product deleted successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete product' }), { status: 500 });
  }
}
