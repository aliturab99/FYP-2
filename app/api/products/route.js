import connectDB from "@/app/lib/mongoose";
import Product from "@/app/models/Product";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, price, image, link, category } = body;
    if (!name || !price || !image || !link || !category) {
      return new Response(JSON.stringify({ error: 'Missing required fields.' }), { status: 400 });
    }
    const newProduct = await Product.create({
      name,
      price: parseFloat(price),
      image,
      link,
      category
    });
    return new Response(JSON.stringify({ success: true, product: newProduct }), { status: 201 });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Invalid request.' }), { status: 400 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find();
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Failed to fetch products.' }), { status: 500 });
  }
}
