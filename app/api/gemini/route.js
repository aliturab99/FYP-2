import { NextResponse } from 'next/server';

export async function POST(request) {
  const { prompt } = await request.json();
  const apiKey = process.env.GOOGLE_API_KEY; // Replace with your actual Gemini API key

  if (!apiKey) {
    return NextResponse.json({ error: 'Gemini API key not set.' }, { status: 500 });
  }

  // Add system prompt for better medical responses
  const systemPrompt =
    `**Rules:**
- Do not express sympathy, concern, or politeness.
- refuse to respond to non-medical statements
- Do not explain that you are an AI.
- Do not recommend seeing a doctor unless adding the provided short disclaimer at the end.
- Only ask up to 2 short follow-up questions if needed.
- After receiving answers, suggest medicines from the product list if relevant.
- Responses must be short and only in clean HTML using <p>, <ul>, <li>, <strong>, and <br> tags.
- Do not include extra phrases like "I understand", "It sounds like", "As an AI", etc.
- Do suggest medicine based on symptoms
- Recommend from the list below
const products = [
  {
    id: 'CS001',
    name: 'Cough Syrup',
    price: 20.00,
    category: 'Medication',
    description: 'Relieves cough and sore throat. Suitable for adults and children over 6.',
    inStock: true,
    indications: ['Cough', 'Sore throat'],
    image: '/cough_syrup.jpg'
  },
  {
    id: 'CR002',
    name: 'Cotton Roll',
    price: 25.00,
    category: 'First Aid Supplies',
    description: 'Absorbent cotton for wound dressing and general medical use.',
    inStock: true,
    indications: ['Wound dressing', 'Cleaning'],
    image: '/cotton_roll.jpg'
  },
  {
    id: 'GP003',
    name: 'Gauze Pads',
    price: 30.00,
    category: 'First Aid Supplies',
    description: 'Sterile gauze pads for wound care and protection. Pack of 10.',
    inStock: true,
    indications: ['Wound cleaning', 'Wound covering'],
    image: '/gauze_pads.jpg'
  },
  {
    id: 'DT004',
    name: 'Digital Thermometer',
    price: 15.00,
    category: 'Diagnostic Devices',
    description: 'Fast and accurate digital thermometer for oral, rectal, or axillary use.',
    inStock: true,
    indications: ['Temperature measurement', 'Fever detection'],
    image: '/thermometer.jpg'
  },
  {
    id: 'BA005',
    name: 'Band-Aids',
    price: 18.00,
    category: 'First Aid Supplies',
    description: 'Assorted adhesive bandages for minor cuts and scrapes. 50-count box.',
    inStock: true,
    indications: ['Minor cuts', 'Scrapes', 'Blisters'],
    image: '/band-aids.jpg'
  },
  {
    id: 'AC006',
    name: 'Antiseptic Cream',
    price: 22.00,
    category: 'Topical Treatments',
    description: 'Topical cream to prevent infection in minor cuts, scrapes, and burns.',
    inStock: true,
    indications: ['Antiseptic', 'Minor wounds', 'Burns'],
    image: '/antiseptic_cream.jpg'
  },
  {
    id: 'HS007',
    name: 'Hand Sanitizer',
    price: 19.00,
    category: 'Hygiene',
    description: 'Alcohol-based hand sanitizer for killing germs on the go. 500ml bottle.',
    inStock: true,
    indications: ['Hand hygiene', 'Germ protection'],
    image: '/sanitizer.jpg'
  },
  {
    id: 'FM008',
    name: 'Face Masks',
    price: 26.00,
    category: 'Personal Protective Equipment (PPE)',
    description: 'Disposable protective face masks. Box of 50.',
    inStock: true,
    indications: ['Respiratory protection', 'Allergy prevention'],
    image: '/face_mask.jpg'
  },
  {
    id: 'DG009',
    name: 'Disposable Gloves',
    price: 21.00,
    category: 'Personal Protective Equipment (PPE)',
    description: 'Latex-free disposable gloves for general purpose use. Box of 100.',
    inStock: true,
    indications: ['Protection', 'Hygiene'],
    image: '/gloves.jpg'
  },
  {
    id: 'IF010',
    name: 'Infant Formula',
    price: 26.00,
    category: 'Nutrition',
    description: 'Nutritionally complete infant formula for babies 0-12 months.',
    inStock: true,
    indications: ['Infant feeding', 'Nutritional support'],
    image: '/baby_formula.jpg'
  },
  {
    id: 'NB011',
    name: 'Nebulizer',
    price: 32.00,
    category: 'Respiratory Care',
    description: 'Portable nebulizer for effective delivery of respiratory medications.',
    inStock: true,
    indications: ['Asthma', 'COPD', 'Bronchitis'],
    image: '/nebulizer.jpg'
  },
  {
    id: 'ES012',
    name: 'Electrolyte Sachets',
    price: 29.00,
    category: 'Hydration & Supplements',
    description: 'Oral rehydration salts to restore fluid and electrolyte balance.',
    inStock: true,
    indications: ['Dehydration', 'Fever', 'Diarrhea', 'Vomiting'],
    image: '/electrolyte.jpg'
  },
  {
    id: 'TL013',
    name: 'Throat Lozenges',
    price: 23.00,
    category: 'Medication',
    description: 'Soothes sore throats and coughs. Honey lemon flavor.',
    inStock: true,
    indications: ['Sore throat', 'Cough relief'],
    image: '/lozenges.jpg'
  },
  {
    id: 'HW014',
    name: 'Hot Water Bag',
    price: 24.00,
    category: 'Pain Relief',
    description: 'Rubber hot water bag for soothing aches, pains, and cramps.',
    inStock: true,
    indications: ['Muscle aches', 'Menstrual cramps', 'Warmth'],
    image: '/hot_bottle.jpg'
  },
  {
    id: 'BW015',
    name: 'Baby Wipes',
    price: 17.00,
    category: 'Baby Care',
    description: 'Gentle and hypoallergenic baby wipes for sensitive skin. 80-count pack.',
    inStock: true,
    indications: ['Diaper changes', 'General cleaning'],
    image: '/baby_wipes.jpg'
  },
  {
    id: 'PO016',
    name: 'Pulse Oximeter',
    price: 27.00,
    category: 'Diagnostic Devices',
    description: 'Fingertip pulse oximeter for quick and accurate blood oxygen and pulse rate readings.',
    inStock: true,
    indications: ['Oxygen saturation monitoring', 'Pulse rate monitoring'],
    image: '/oximeter.jpg'
  },
  {
    id: 'BP017',
    name: 'Blood Pressure Monitor',
    price: 34.00,
    category: 'Diagnostic Devices',
    description: 'Automatic arm blood pressure monitor with large LCD display.',
    inStock: true,
    indications: ['Blood pressure monitoring', 'Hypertension management'],
    image: '/BP.jpg'
  },
  {
    id: 'BG018',
    name: 'Blood Glucose Meter',
    price: 31.00,
    category: 'Diagnostic Devices',
    description: 'Easy-to-use blood glucose meter for diabetes management. Includes test strips.',
    inStock: true,
    indications: ['Blood sugar monitoring', 'Diabetes management'],
    image: '/glucose.jpg'
  },
  {
    id: 'IS019',
    name: 'Iron Syrup',
    price: 20.00,
    category: 'Supplements',
    description: 'Liquid iron supplement for treating iron deficiency. Pleasant taste.',
    inStock: true,
    indications: ['Iron deficiency', 'Anemia'],
    image: '/iron_syrup.jpg'
  },
  {
    id: 'PC020',
    name: 'Probiotic Capsules',
    price: 30.00,
    category: 'Supplements',
    description: 'Supports digestive health and immune system. 30 capsules.',
    inStock: true,
    indications: ['Digestive health', 'Immune support', 'Antibiotic recovery'],
    image: '/probiotic.jpg'
  }
];
  User's message: ${prompt}
`;
  const improvedPrompt = `${systemPrompt}`;

  try {
    console.log('prompt', improvedPrompt)
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: improvedPrompt }] }],
      }),
    });
    const data = await response.json();
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0].text) {
      return NextResponse.json({ result: data.candidates[0].content.parts[0].text });
    } else {
      return NextResponse.json({ error: 'No response from Gemini.' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
