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
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800">Our Vision</h2>
              <p className="mt-4 text-gray-600">
                At Med Magic, we envision a world where quality healthcare
                products are accessible to everyone. Our mission is to bridge the
                gap between medical innovation and customer satisfaction.
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <span
                    className="w-6 h-6 bg-blue-600 text-white flex items-center justify-center rounded-full mr-3"
                  >✔</span
                  >
                  <p className="text-gray-600">
                    Ensuring the availability of high-quality medical products.
                  </p>
                </li>
                <li className="flex items-start">
                  <span
                    className="w-6 h-6 bg-blue-600 text-white flex items-center justify-center rounded-full mr-3"
                  >✔</span
                  >
                  <p className="text-gray-600">
                    Promoting innovation in healthcare delivery.
                  </p>
                </li>
                <li className="flex items-start">
                  <span
                    className="w-6 h-6 bg-blue-600 text-white flex items-center justify-center rounded-full mr-3"
                  >✔</span
                  >
                  <p className="text-gray-600">
                    Fostering trust and transparency with our customers.
                  </p>
                </li>
              </ul>
            </div>
            <div>
              <Image src="/vision.jpg" alt="Our Vision" className="rounded-3xl shadow-lg" width={600} height={400} />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800">Our Journey</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-blue-600 text-5xl font-bold">2024</div>
              <p className="mt-4 text-gray-600">
                Established with a vision to redefine healthcare.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-blue-600 text-5xl font-bold">50k+</div>
              <p className="mt-4 text-gray-600">Happy customers served globally.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-blue-600 text-5xl font-bold">100+</div>
              <p className="mt-4 text-gray-600">
                Products added to our inventory every month.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-800 text-center">
            Meet Our Executives
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg text-center p-6">
              <Image src={"/mypic.png"} width={150} height={150} alt='Team Member' className="mx-auto rounded-full w-24 h-24" />
              <h3 className="mt-4 text-lg font-bold text-gray-800">Mr. Saim Maqsood</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg text-center p-6">
              <Image src={"/operations_manager.jpg"} width={150} height={150} alt='Team Member' className="mx-auto rounded-full w-24 h-24" />
              <h3 className="mt-4 text-lg font-bold text-gray-800">Mr. M. Aslam</h3>
              <p className="text-gray-600">Operations Manager</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg text-center p-6">
              <Image src={"/customer_support_lead.jpg"} width={150} height={150} alt='Team Member' className="mx-auto rounded-full w-24 h-24" />
              <h3 className="mt-4 text-lg font-bold text-gray-800">Ms. Sana</h3>
              <p className="text-gray-600">Customer Support Lead</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold">What Our Clients Say</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6">
              <p className="italic">
                "Med Magic has transformed the way we purchase medical supplies.
                Their service is outstanding!"
              </p>
              <h3 className="mt-4 text-lg font-bold">-Hammad</h3>
            </div>
            <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6">
              <p className="italic">
                "Exceptional quality and customer service. Highly recommend Med
                Magic!"
              </p>
              <h3 className="mt-4 text-lg font-bold">- Abdullah</h3>
            </div>
            <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6">
              <p className="italic">
                "A reliable partner in our healthcare journey. Thank you Med
                Magic!"
              </p>
              <h3 className="mt-4 text-lg font-bold">- Anna</h3>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default page
