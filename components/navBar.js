import Image from "next/image";
import Link from "next/link";
//shadcn
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
//icons
import { FaDiscord, FaInstagram, FaPlusCircle, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiCopperCoinFill } from "react-icons/ri";

//list of socialMedia Contacts
const contactList = [
  {
    icon: (
      <FaInstagram
        className="h-[20px] w-[20px] transform transition-transform hover:scale-150"
        color="#ffffff"
      />
    ),
    href: "https://www.instagram.com",
  },
  {
    icon: (
      <FaTiktok
        className="h-[20px] w-[20px] transform transition-transform hover:scale-150"
        color="#ffffff"
      />
    ),
    href: "https://www.tiktok.com",
  },
  {
    icon: (
      <FaXTwitter
        className="h-[20px] w-[20px] transform transition-transform hover:scale-150"
        color="#ffffff"
      />
    ),
    href: "https://www.twitter.com",
  },
  {
    icon: (
      <FaDiscord
        className="h-[20px] w-[20px] transform transition-transform hover:scale-150"
        color="#ffffff"
      />
    ),
    href: "https://www.discord.com",
  },
];

//Render Element
export function Navigation() {
  return (
    //navBar
    <nav className="fixed top-4 z-50 w-screen px-4">
      {/* navContainer */}
      <div className="z-50 flex items-center justify-between rounded-md border-[1px] border-gray-100 bg-gray-500 bg-opacity-20 bg-clip-padding px-3 py-2 backdrop-blur-md backdrop-filter">
        {/* logoContainer */}
        <div className="flex flex-row items-center justify-center gap-2">
          {/* logo */}
          <Image
            className="relative"
            src="/logo.svg"
            alt="Next.js Logo"
            width={40}
            height={35}
            priority
          />
          {/* logoText */}
          <p className="text-lg font-bold italic text-white">VTS</p>
        </div>

        {/* socialLogos */}
        <ul className="flex items-center gap-4">
          {contactList.map((nav) => {
            return (
              <li key={nav.title}>
                <Link href={nav.href}>{nav.icon}</Link>
              </li>
            );
          })}
        </ul>

        {/* profile */}
        <div className="flex items-center gap-4">
          {/* profile */}
          <div className="flex items-center gap-1 rounded-md border-l-[1px] border-yellow-400 bg-black">
            {/* remainingCredits */}
            <div className="flex items-center gap-1 px-2 py-[6px]">
              <RiCopperCoinFill
                className="h-[15px] w-[15px] transform"
                color="#E3A008"
              />
              <p className="text-[10px] text-white">0 Credits</p>
            </div>
            {/* addCredits */}
            <div className="rounded-r-md bg-red-500 bg-gradient-to-br from-yellow-400 to-red-500 px-2 py-[6px] hover:bg-gradient-to-bl ">
              <FaPlusCircle className="h-[15px] w-[15px] transform transition-transform hover:scale-150" />
            </div>
          </div>
          <Avatar className="h-[30px] w-[30px]">
            <AvatarImage src="" />
            <AvatarFallback className="text-md bg-red-500">Ai</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
}
