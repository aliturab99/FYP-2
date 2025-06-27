"use client"
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const products = [
  {
    id: 1,
    name: "Cough Syrup",
    price: 20.00,
    image: "/cough_syrup.jpg",
    link: "https://buy.stripe.com/test_5kA9CJaNm6t84pycMM",
    category: "medications"
  },
  {
    id: 2,
    name: "Cotton Roll",
    price: 25.00,
    image: "/cotton_roll.jpg",
    link: "https://buy.stripe.com/test_3cs6qx08I3gW3lu5kl",
    category: "medical-supplies"
  },
  {
    id: 3,
    name: "Gauze Pads",
    price: 30.00,
    image: "/gauze_pads.jpg",
    link: "https://buy.stripe.com/test_5kA4ip8Fe8Bg4py5km",
    category: "medical-supplies"
  },
  {
    id: 4,
    name: "Digital Thermometer",
    price: 15.00,
    image: "/thermometer.jpg",
    link: "https://buy.stripe.com/test_aEU7uB9Ji6t8e088wz",
    category: "devices"
  },
  {
    id: 5,
    name: "Band-Aids",
    price: 18.00,
    image: "/band-aids.jpg",
    link: "https://buy.stripe.com/test_00g2ahbRq9Fk5tC3cg",
    category: "first-aid"
  },
  {
    id: 6,
    name: "Antiseptic Cream",
    price: 22.00,
    image: "/antiseptic_cream.jpg",
    link: "https://buy.stripe.com/test_fZeeX34oYdVAg8gaEJ",
    category: "first-aid"
  },
  {
    id: 7,
    name: "Hand Sanitizer",
    price: 19.00,
    image: "/sanitizer.jpg",
    link: "https://buy.stripe.com/test_14k5mtf3C18O8FO8wC",
    category: "hygiene"
  },
  {
    id: 8,
    name: "Face Masks",
    price: 28.00,
    image: "/face_mask.jpg",
    link: "https://buy.stripe.com/test_7sI4ip3kU7xc09ibIP",
    category: "hygiene"
  },
  {
    id: 9,
    name: "Disposable Gloves",
    price: 21.00,
    image: "/gloves.jpg",
    link: "https://buy.stripe.com/test_eVabKR5t28Bg5tCcMU",
    category: "medical-supplies"
  },
  {
    id: 10,
    name: "Infant Formula",
    price: 26.00,
    image: "/baby_formula.jpg",
    link: "https://buy.stripe.com/test_14k5mt4oY8BgcW4fZ7",
    category: "baby-care"
  },
  {
    id: 11,
    name: "Nebulizer",
    price: 32.00,
    image: "/nebulizer.jpg",
    link: "https://buy.stripe.com/test_3csg178FebNsg8g28i",
    category: "devices"
  },
  {
    id: 12,
    name: "Electrolyte Sachets",
    price: 29.00,
    image: "/electrolyte.jpg",
    link: "https://buy.stripe.com/test_9AQ2ah8Fe6t84pyaEP",
    category: "medications"
  },
  {
    id: 13,
    name: "Throat Lozenges",
    price: 23.00,
    image: "/lozenges.jpg",
    link: "https://buy.stripe.com/test_eVag171cMg3I3lu5kw",
    category: "medications"
  },
  {
    id: 14,
    name: "Hot Water Bag",
    price: 24.00,
    image: "/hot_bottle.jpg",
    link: "https://buy.stripe.com/test_4gw6qx3kU9Fk6xGbIV",
    category: "first-aid"
  },
  {
    id: 15,
    name: "Baby Wipes",
    price: 17.00,
    image: "/baby_wipes.jpg",
    link: "https://buy.stripe.com/test_3csbKR4oY8Bg7BK8wK",
    category: "baby-care"
  },
  {
    id: 16,
    name: "Pulse Oximeter",
    price: 27.00,
    image: "/oximeter.jpg",
    link: "https://buy.stripe.com/test_9AQ6qx5t2dVA09i4gv",
    category: "devices"
  },
  {
    id: 17,
    name: "Blood Pressure Monitor",
    price: 34.00,
    image: "/BP.jpg",
    link: "https://buy.stripe.com/test_14kcOVf3C8BgbS05kA",
    category: "devices"
  },
  {
    id: 18,
    name: "Blood Glucose Meter",
    price: 31.00,
    image: "/glucose.jpg",
    link: "https://buy.stripe.com/test_bIYbKRf3CdVA7BK00h",
    category: "devices"
  },
  {
    id: 19,
    name: "Iron Syrup",
    price: 20.00,
    image: "/iron_syrup.jpg",
    link: "https://buy.stripe.com/test_8wMg178Fe04K3ludR8",
    category: "medications"
  },
  {
    id: 20,
    name: "Probiotic Capsules",
    price: 30.00,
    image: "/probiotic.jpg",
    link: "https://buy.stripe.com/test_9AQbKR08IaJo6xG9AT",
    category: "medications"
  }
];

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'medications', name: 'Medications' },
  { id: 'medical-supplies', name: 'Medical Supplies' },
  { id: 'devices', name: 'Medical Devices' },
  { id: 'first-aid', name: 'First Aid' },
  { id: 'hygiene', name: 'Hygiene Products' },
  { id: 'baby-care', name: 'Baby Care' }
];

const Page = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  // Use useEffect to set document title
  useEffect(() => {
    document.title = "medMagic - Store";
  }, []);

  return (
    <>
      <Head>
        <meta name="description" content="All products you need at your doorstep" />
      </Head>
      
      <section id="products" className="bg-[#1a1a1a] text-white min-h-screen py-12 px-6">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Our Products</h3>
          
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full transition ${activeCategory === category.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#333]'}`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="bg-[#2a2a2a] rounded-lg shadow-md overflow-hidden hover:shadow-xl transition hover:scale-105"
              >
                <div className="relative h-48 w-full">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-lg mb-2">{product.name}</h4>
                  <p className="text-blue-400 font-semibold">${product.price.toFixed(2)}</p>
                  <Link href={product.link}>
                    <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                      Buy Now
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Page