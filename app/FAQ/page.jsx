import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import React from 'react'
import Head from 'next/head';
export const generateMetadata = () => {
  return {
    title: "medMagic - FAQ",
    description:"medMagic FAQ page"
  }
}

const page = () => {
  return (
    <>
      <Head>
        <title>{generateMetadata().title}</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-gray-900 to-emerald-900 py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Find answers to common questions about Med Magic's AI-powered medical platform
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="bg-[#2a2a2a]/80 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-2xl p-8">
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border border-gray-600 rounded-lg overflow-hidden">
                <AccordionTrigger className="text-white hover:text-emerald-400 px-6 py-4 text-left font-semibold text-lg bg-[#333]/50 hover:bg-[#333]/70 transition-all">
                  How does the AI medical assistant work?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 px-6 py-4 bg-[#2a2a2a]/50 text-base leading-relaxed">
                  Our AI medical assistant uses advanced natural language processing to understand your symptoms and provide preliminary medical guidance. It can help identify potential conditions, suggest over-the-counter treatments, and recommend when to seek professional medical care. The AI is trained on medical literature but should not replace professional medical diagnosis.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border border-gray-600 rounded-lg overflow-hidden">
                <AccordionTrigger className="text-white hover:text-emerald-400 px-6 py-4 text-left font-semibold text-lg bg-[#333]/50 hover:bg-[#333]/70 transition-all">
                  What delivery options does Med Magic offer?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 px-6 py-4 bg-[#2a2a2a]/50 text-base leading-relaxed">
                  We partner with leading delivery providers including InDrive Courier and Yango Delivery to ensure fast and reliable service. Most orders are delivered within 24-48 hours, with express options available for urgent medical supplies. Delivery tracking is provided for all orders.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="border border-gray-600 rounded-lg overflow-hidden">
                <AccordionTrigger className="text-white hover:text-emerald-400 px-6 py-4 text-left font-semibold text-lg bg-[#333]/50 hover:bg-[#333]/70 transition-all">
                  What types of medical products do you offer?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 px-6 py-4 bg-[#2a2a2a]/50 text-base leading-relaxed">
                  We provide a comprehensive range of medical supplies including over-the-counter medications, medical devices (thermometers, blood pressure monitors, pulse oximeters), first aid supplies, hygiene products, and specialized equipment. All products are sourced from certified suppliers and meet international quality standards.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border border-gray-600 rounded-lg overflow-hidden">
                <AccordionTrigger className="text-white hover:text-emerald-400 px-6 py-4 text-left font-semibold text-lg bg-[#333]/50 hover:bg-[#333]/70 transition-all">
                  Is the AI medical assistant available 24/7?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 px-6 py-4 bg-[#2a2a2a]/50 text-base leading-relaxed">
                  Yes! Our AI medical assistant is available 24/7 through both voice and chat interfaces. You can access medical guidance anytime, anywhere. For complex cases requiring human intervention, our medical support team is available during business hours.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border border-gray-600 rounded-lg overflow-hidden">
                <AccordionTrigger className="text-white hover:text-emerald-400 px-6 py-4 text-left font-semibold text-lg bg-[#333]/50 hover:bg-[#333]/70 transition-all">
                  How secure is my medical information?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 px-6 py-4 bg-[#2a2a2a]/50 text-base leading-relaxed">
                  We take privacy and security seriously. All conversations with our AI assistant are encrypted and stored securely. We comply with healthcare data protection regulations and never share your personal medical information with third parties without your explicit consent.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border border-gray-600 rounded-lg overflow-hidden">
                <AccordionTrigger className="text-white hover:text-emerald-400 px-6 py-4 text-left font-semibold text-lg bg-[#333]/50 hover:bg-[#333]/70 transition-all">
                  Can I get prescription medications through Med Magic?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 px-6 py-4 bg-[#2a2a2a]/50 text-base leading-relaxed">
                  Currently, we focus on over-the-counter medications and medical supplies. For prescription medications, our AI assistant can help you understand your symptoms and recommend consulting with a healthcare provider. We're working on partnerships with licensed pharmacies to expand our prescription services in the future.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-emerald-600/20 to-blue-600/20 border border-emerald-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
              <p className="text-gray-300 mb-6">Our AI assistant and support team are here to help</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Chat with AI Assistant
                </button>
                <button className="border border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default page

