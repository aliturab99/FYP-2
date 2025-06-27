import connectDB from "@/app/lib/mongoose";
import Product from "@/app/models/Product";

export async function GET() {
  try {
    await connectDB();
    
    // Get all products
    const products = await Product.find();
    
    // Calculate basic stats
    const totalProducts = products.length;
    const totalCategories = [...new Set(products.map(p => p.category))].length;
    const averagePrice = products.length > 0 ? products.reduce((sum, p) => sum + p.price, 0) / products.length : 0;
    
    // Category breakdown
    const categoryStats = {};
    products.forEach(product => {
      if (categoryStats[product.category]) {
        categoryStats[product.category]++;
      } else {
        categoryStats[product.category] = 1;
      }
    });
    
    // Price range breakdown
    const priceRanges = {
      'under25': products.filter(p => p.price < 25).length,
      '25to50': products.filter(p => p.price >= 25 && p.price < 50).length,
      '50to100': products.filter(p => p.price >= 50 && p.price < 100).length,
      'over100': products.filter(p => p.price >= 100).length
    };
    
    // Most expensive and cheapest products
    const sortedByPrice = products.sort((a, b) => b.price - a.price);
    const mostExpensive = sortedByPrice[0] || null;
    const cheapest = sortedByPrice[sortedByPrice.length - 1] || null;
    
    // Recent products (last 10)
    const recentProducts = await Product.find().sort({ createdAt: -1 }).limit(10);
    
    return new Response(JSON.stringify({
      overview: {
        totalProducts,
        totalCategories,
        averagePrice,
        mostExpensive,
        cheapest
      },
      categoryStats,
      priceRanges,
      recentProducts,
      allProducts: products
    }), { status: 200 });
    
  } catch (error) {
    console.error('Stats API error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch stats' }), { status: 500 });
  }
}
