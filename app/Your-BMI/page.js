"use client";

import { useState } from 'react';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState({
    height: '',
    weight: ''
  });

  const validateInput = (value, type) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      return 'Please enter a valid number';
    }
    if (type === 'height') {
      if (numValue <= 0) return 'Height must be greater than zero';
      if (numValue > 300) return 'Height seems unrealistic (max 300cm)';
    }
    if (type === 'weight') {
      if (numValue < 20) return 'Weight must be at least 20kg';
      if (numValue > 500) return 'Weight seems unrealistic (max 500kg)';
    }
    return '';
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    
    const heightError = validateInput(height, 'height');
    const weightError = validateInput(weight, 'weight');
    
    setErrors({
      height: heightError,
      weight: weightError
    });

    if (heightError || weightError) {
      setBmi(null);
      setCategory('');
      return;
    }

    const heightInMeters = parseFloat(height) / 100;
    const calculatedBmi = parseFloat(weight) / (heightInMeters * heightInMeters);
    setBmi(parseFloat(calculatedBmi.toFixed(1)));

    if (calculatedBmi < 18.5) {
      setCategory('Underweight');
    } else if (calculatedBmi >= 18.5 && calculatedBmi < 25) {
      setCategory('Normal weight');
    } else if (calculatedBmi >= 25 && calculatedBmi < 30) {
      setCategory('Overweight');
    } else {
      setCategory('Obese');
    }
  };

  const handleReset = () => {
    setHeight('');
    setWeight('');
    setBmi(null);
    setCategory('');
    setErrors({ height: '', weight: '' });
  };

  const getCategoryColor = () => {
    if (!category) return '';
    if (category === 'Underweight') return 'bg-blue-100 text-blue-800';
    if (category === 'Normal weight') return 'bg-green-100 text-green-800';
    if (category === 'Overweight') return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md overflow-hidden space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">BMI Calculator</h2>
        <p className="text-gray-500">Check your body mass index</p>
      </div>
      
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="height" className="block text-sm font-medium text-gray-700">
            Height (cm)
          </label>
          <input
            type="text"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter your height"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.height 
                ? 'border-red-500 focus:ring-red-200' 
                : 'border-gray-300 focus:ring-blue-200'
            }`}
          />
          {errors.height && (
            <p className="mt-1 text-sm text-red-600">{errors.height}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
            Weight (kg)
          </label>
          <input
            type="text"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight (min 20kg)"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.weight 
                ? 'border-red-500 focus:ring-red-200' 
                : 'border-gray-300 focus:ring-blue-200'
            }`}
          />
          {errors.weight && (
            <p className="mt-1 text-sm text-red-600">{errors.weight}</p>
          )}
        </div>
        
        <div className="flex space-x-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition duration-200"
          >
            Calculate BMI
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-medium transition duration-200"
          >
            Reset
          </button>
        </div>
      </form>
      
      {bmi !== null && (
        <div className="p-4 bg-gray-50 rounded-lg space-y-4 animate-fade-in">
          <h3 className="text-lg font-semibold text-gray-800">Your Results</h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">BMI:</span>
            <strong className="text-2xl font-bold text-gray-900">{bmi}</strong>
          </div>
          <div className={`px-3 py-2 rounded-md text-center font-medium ${getCategoryColor()}`}>
            {category}
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Underweight</span>
              <span>Normal</span>
              <span>Overweight</span>
              <span>Obese</span>
            </div>
            <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
              <div className="absolute inset-0 flex">
                <div className={`h-full w-1/4 ${bmi < 18.5 ? 'bg-blue-500' : 'bg-blue-200'}`}></div>
                <div className={`h-full w-1/4 ${
                  bmi >= 18.5 && bmi < 25 ? 'bg-green-500' : 'bg-green-200'
                }`}></div>
                <div className={`h-full w-1/4 ${
                  bmi >= 25 && bmi < 30 ? 'bg-yellow-500' : 'bg-yellow-200'
                }`}></div>
                <div className={`h-full w-1/4 ${
                  bmi >= 30 ? 'bg-red-500' : 'bg-red-200'
                }`}></div>
              </div>
              <div 
                className="absolute top-0 h-full w-1 bg-black"
                style={{
                  left: `${Math.min(Math.max((bmi / 40) * 100, 2.5), 97.5)}%`
                }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>&lt; 18.5</span>
              <span>18.5 - 24.9</span>
              <span>25 - 29.9</span>
              <span>≥ 30</span>
            </div>
          </div>

          {/* WEIGHT LOSS TIPS SECTION (shown only if BMI ≥ 25) */}
          {bmi >= 25 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h4 className="font-bold text-blue-800 mb-2">Tips for Healthy Weight Loss:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li><span className="font-semibold">🍎 Eat more protein & fiber</span> - Keeps you full longer (try eggs, beans, veggies)</li>
                <li><span className="font-semibold">🚶 Walk 10,000 steps daily</span> - Burns ~300-500 calories</li>
                <li><span className="font-semibold">💤 Sleep 7-9 hours</span> - Poor sleep increases hunger hormones</li>
                <li><span className="font-semibold">🥤 Drink water before meals</span> - Reduces overeating</li>
                <li><span className="font-semibold">🏋️ Strength train 2-3x/week</span> - Muscle burns more calories at rest</li>
              </ul>
              <p className="mt-3 text-xs text-blue-600">
                <span className="font-semibold">Healthy goal:</span> Aim for 1-2 lbs (0.5-1 kg) weight loss per week.
              </p>
              <p className="mt-2 text-xs text-gray-500">
                Always consult a doctor before starting a new diet/exercise plan.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BMICalculator;