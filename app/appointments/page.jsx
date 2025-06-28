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
        <div className="bg-white">
            <iframe src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3G2C9SBINbiDvhNCQnwp3E1frCV9rXp3AxfY77bT3L9C1wRHMETEfYblBYg6zcMd8WrzBMMRoh?gv=true" style={{ border: 0 }} width="100%" height="600">
            </iframe>
        </div>
        </>
    )
}

export default page
