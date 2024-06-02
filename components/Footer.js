import Image from "next/image";
import Link from "next/link";
//icons
import { FaDiscord, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiMailSendFill } from "react-icons/ri";

//list of Contacts
const contactList = [
  {
    icon: (
      <RiMailSendFill className="h-[20px] w-[20px] transform text-background transition-transform hover:scale-150 hover:text-red-500" />
    ),
    href: "https://www.gmail.com",
  },
  {
    icon: (
      <FaInstagram className="h-[20px] w-[20px] transform text-background transition-transform hover:scale-150 hover:text-red-500" />
    ),
    href: "https://www.instagram.com",
  },
  {
    icon: (
      <FaTiktok className="h-[20px] w-[20px] transform text-background transition-transform hover:scale-150 hover:text-red-500" />
    ),
    href: "https://www.tiktok.com",
  },
  {
    icon: (
      <FaXTwitter className="h-[20px] w-[20px] transform text-background transition-transform hover:scale-150 hover:text-red-500" />
    ),
    href: "https://www.twitter.com",
  },
  {
    icon: (
      <FaDiscord className="h-[20px] w-[20px] transform text-background transition-transform hover:scale-150 hover:text-red-500" />
    ),
    href: "https://www.discord.com",
  },
];

export function Footer() {
  return (
    //footer
    <footer className="flex flex-col min-w-screen">
      {/* contactsBanner */}
      <div className="flex w-full items-center justify-between gap-10 bg-gray-950 px-6 py-[12px]">
        <p className="text-sm text-slate-400">Connect with us //</p>
        {/* socialLogos */}
        <ul className="flex flex-row items-center justify-between grow">
          {contactList.map((nav, index) => {
            return (
              <li key={index}>
                <Link href={nav.href}>{nav.icon}</Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* copyrightBanner */}
      <div className="flex items-center justify-between w-full gap-4 px-6 py-2">
        {/* logoContainer */}
        <Link href={"/"} className="flex flex-row items-center justify-center">
          {/* logo */}
          <Image
            className="relative"
            src="/logo.svg"
            alt="Logo"
            width={30}
            height={20}
            style={{ width: "auto", height: "auto" }} //Fix CSS error
            priority
          />
        </Link>
        <p className="text-[10px] text-slate-400">
          © 2024 TheVideoSummarizer. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
