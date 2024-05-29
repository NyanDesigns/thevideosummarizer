import Image from "next/image";
import Link from "next/link";
import { FaDiscord, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

//list of socialMedia Contacts
const contactList = [
  {
    icon: (
      <FaInstagram
        className="h-[22px] w-[22px] transform transition-transform hover:scale-125"
        color="#ffffff"
      />
    ),
    href: "https://www.instagram.com",
  },
  {
    icon: (
      <FaTiktok
        className="h-[22px] w-[22px] transform transition-transform hover:scale-125"
        color="#ffffff"
      />
    ),
    href: "https://www.tiktok.com",
  },
  {
    icon: (
      <FaXTwitter
        className="h-[22px] w-[22px] transform transition-transform hover:scale-125"
        color="#ffffff"
      />
    ),
    href: "https://www.twitter.com",
  },
  {
    icon: (
      <FaDiscord
        className="h-[22px] w-[22px] transform transition-transform hover:scale-125"
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
        <div>
          <Avatar className="h-[30px] w-[30px]">
            <AvatarImage src="" />
            <AvatarFallback className="text-md bg-red-500">Ai</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
}
