import Head from 'next/head'
import Image from 'next/image'
export const generateMetadata = () => {
  return {
    title:"medMagic - About",
    description:"All information regarding Med Magic"
  }
}
const page = () => {
  return (
    <>
    <Head>
      <title>{generateMetadata().title}</title>
      <meta name="description" content={generateMetadata().description} />
    </Head>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1a1a1a] via-gray-900 to-emerald-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
            About Med Magic
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Revolutionizing healthcare through AI-powered medical assistance and premium medical supplies
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#1a1a1a] text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-emerald-400">Our Vision</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                At Med Magic, we envision a world where quality healthcare
                products and AI-powered medical assistance are accessible to everyone. 
                Our mission is to bridge the gap between medical innovation and customer satisfaction.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 text-white flex items-center justify-center rounded-full flex-shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-300 text-lg">
                    AI-powered medical consultation and symptom analysis
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 text-white flex items-center justify-center rounded-full flex-shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-300 text-lg">
                    Premium quality medical products and equipment
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 text-white flex items-center justify-center rounded-full flex-shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-300 text-lg">
                    24/7 customer support and medical guidance
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-3xl transform rotate-6"></div>
              <Image src="/vision.jpg" alt="Our Vision" className="relative rounded-3xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-300" width={600} height={400} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-gray-900 to-[#1a1a1a] py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Our Journey</h2>
          <p className="text-gray-400 text-lg mb-16 max-w-2xl mx-auto">
            Building the future of healthcare technology, one innovation at a time
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#2a2a2a] rounded-2xl shadow-xl p-8 hover:transform hover:scale-105 transition-all duration-300 border border-gray-700">
              <div className="text-transparent bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-6xl font-bold mb-4">2024</div>
              <p className="text-gray-300 text-lg">
                Established with a vision to redefine healthcare through AI technology
              </p>
            </div>
            <div className="bg-[#2a2a2a] rounded-2xl shadow-xl p-8 hover:transform hover:scale-105 transition-all duration-300 border border-gray-700">
              <div className="text-transparent bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-6xl font-bold mb-4">50k+</div>
              <p className="text-gray-300 text-lg">AI consultations provided to patients globally</p>
            </div>
            <div className="bg-[#2a2a2a] rounded-2xl shadow-xl p-8 hover:transform hover:scale-105 transition-all duration-300 border border-gray-700">
              <div className="text-transparent bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-6xl font-bold mb-4">100+</div>
              <p className="text-gray-300 text-lg">
                Medical products added to our AI-curated inventory
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#1a1a1a]">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            Meet Our Executives
          </h2>
          <p className="text-gray-400 text-lg text-center mb-16 max-w-2xl mx-auto">
            The visionaries behind Med Magic's revolutionary healthcare platform
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#2a2a2a] rounded-2xl shadow-xl text-center p-8 hover:transform hover:scale-105 transition-all duration-300 border border-gray-700">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full p-1">
                  <Image src={"/mypic.png"} width={120} height={120} alt='Team Member' className="rounded-full w-full h-full object-cover bg-gray-800" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Mr. Saim Maqsood</h3>
              <p className="text-emerald-400 font-medium mb-3">Founder & CEO</p>
              <p className="text-gray-400 text-sm">Leading the vision of AI-powered healthcare innovation</p>
            </div>
            <div className="bg-[#2a2a2a] rounded-2xl shadow-xl text-center p-8 hover:transform hover:scale-105 transition-all duration-300 border border-gray-700">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full p-1">
                  <Image src={"/operations_manager.jpg"} width={120} height={120} alt='Team Member' className="rounded-full w-full h-full object-cover bg-gray-800" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Mr. M. Aslam</h3>
              <p className="text-emerald-400 font-medium mb-3">Operations Manager</p>
              <p className="text-gray-400 text-sm">Ensuring seamless delivery of medical products and services</p>
            </div>
            <div className="bg-[#2a2a2a] rounded-2xl shadow-xl text-center p-8 hover:transform hover:scale-105 transition-all duration-300 border border-gray-700">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full p-1">
                  <Image src={"/customer_support_lead.jpg"} width={120} height={120} alt='Team Member' className="rounded-full w-full h-full object-cover bg-gray-800" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Ms. Sana</h3>
              <p className="text-emerald-400 font-medium mb-3">Customer Support Lead</p>
              <p className="text-gray-400 text-sm">Providing exceptional support and medical guidance</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-emerald-100 text-lg mb-16 max-w-2xl mx-auto">
            Real experiences from our satisfied customers using Med Magic's AI platform
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm text-white rounded-2xl shadow-xl p-8 hover:transform hover:scale-105 transition-all duration-300 border border-white/20">
              <div className="mb-4">
                <svg className="w-8 h-8 text-emerald-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p className="italic text-lg mb-6">
                "Med Magic's AI assistant helped me understand my symptoms and recommended the right products. Outstanding service!"
              </p>
              <h3 className="text-xl font-bold text-emerald-300">- Hammad</h3>
              <p className="text-emerald-200 text-sm">Healthcare Professional</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm text-white rounded-2xl shadow-xl p-8 hover:transform hover:scale-105 transition-all duration-300 border border-white/20">
              <div className="mb-4">
                <svg className="w-8 h-8 text-emerald-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p className="italic text-lg mb-6">
                "The AI chatbot is incredibly smart and the product quality is exceptional. Highly recommend Med Magic!"
              </p>
              <h3 className="text-xl font-bold text-emerald-300">- Abdullah</h3>
              <p className="text-emerald-200 text-sm">Regular Customer</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm text-white rounded-2xl shadow-xl p-8 hover:transform hover:scale-105 transition-all duration-300 border border-white/20">
              <div className="mb-4">
                <svg className="w-8 h-8 text-emerald-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p className="italic text-lg mb-6">
                "A reliable AI-powered partner in our healthcare journey. The future of medical assistance is here!"
              </p>
              <h3 className="text-xl font-bold text-emerald-300">- Anna</h3>
              <p className="text-emerald-200 text-sm">Medical Student</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default page
