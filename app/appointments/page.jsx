import Head from "next/head"
export const generateMetadata = () => {
    return {
      title:"medMagic - Appointments",
      description:"Book your appointment now with the best doctors"
    }
  }
const page = () => {
    return (
        <>
        <Head>
            <title>{generateMetadata().title}</title>
            <meta name="description" content={generateMetadata().description} />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-gray-900 to-emerald-900 py-16 px-6">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                        Book Your Appointment
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Schedule a consultation with our certified medical professionals. Get expert advice powered by AI insights.
                    </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-[#2a2a2a]/80 backdrop-blur-sm rounded-xl border border-gray-700 p-6 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-white font-semibold mb-2">Quick Scheduling</h3>
                        <p className="text-gray-400 text-sm">Book appointments in just a few clicks with our streamlined process</p>
                    </div>
                    <div className="bg-[#2a2a2a]/80 backdrop-blur-sm rounded-xl border border-gray-700 p-6 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h3 className="text-white font-semibold mb-2">Certified Doctors</h3>
                        <p className="text-gray-400 text-sm">Connect with qualified healthcare professionals</p>
                    </div>
                    <div className="bg-[#2a2a2a]/80 backdrop-blur-sm rounded-xl border border-gray-700 p-6 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <h3 className="text-white font-semibold mb-2">AI-Enhanced Care</h3>
                        <p className="text-gray-400 text-sm">Benefit from AI-powered medical insights during your consultation</p>
                    </div>
                </div>

                {/* Calendar Container */}
                <div className="bg-[#2a2a2a]/80 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-600 to-blue-600 p-6">
                        <h2 className="text-2xl font-bold text-white text-center">
                            Select Your Preferred Date & Time
                        </h2>
                        <p className="text-emerald-100 text-center mt-2">
                            Choose from available slots with our healthcare professionals
                        </p>
                    </div>
                    <div className="p-4 bg-white">
                        <iframe 
                            src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3G2C9SBINbiDvhNCQnwp3E1frCV9rXp3AxfY77bT3L9C1wRHMETEfYblBYg6zcMd8WrzBMMRoh?gv=true" 
                            style={{ border: 0, borderRadius: '12px' }} 
                            width="100%" 
                            height="600"
                            className="rounded-xl"
                        />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default page
