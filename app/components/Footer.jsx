import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white p-4 container mx-auto text-center"> 
      <p>&copy; {new Date().getFullYear()} medMagic. All rights reserved.</p>
    </footer>
  );
};

export default Footer;