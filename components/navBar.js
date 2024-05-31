import Image from "next/image";
import Link from "next/link";
//shadcn
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
//icons
import { FaPlusCircle } from "react-icons/fa";
import { RiCopperCoinFill } from "react-icons/ri";
import { TbProgressAlert, TbProgressBolt } from "react-icons/tb";

const navList = [
  {
    icon: <TbProgressBolt className="h-[20px] w-[20px]" />,
    title: "Request Feature",
    href: "/request",
  },
  {
    icon: <TbProgressAlert className="h-[20px] w-[20px]" />,
    title: "Report Bug",
    href: "/report",
  },
];

//Render Element
export function Navigation() {
  return (
    //navBar
    <nav className="fixed z-50 min-w-full px-6 top-4">
      {/* navContainer */}
      <div className="z-50 flex items-center justify-between rounded-md border-[1px] border-gray-950 bg-background px-3 py-2">
        {/* logoContainer */}
        <Link
          href={"/"}
          className="flex flex-row items-center justify-center gap-2"
        >
          {/* logo */}
          <Image
            className="relative lg:mr-4"
            src="/logo.svg"
            alt="Logo"
            width={40}
            height={35}
            priority
          />
          {/* logoText */}
          <p className="text-lg italic font-bold text-gray-950 max-sm:hidden lg:hidden">
            T.V.S.
          </p>
          <p className="hidden text-lg font-bold text-gray-950 lg:block">
            The Video Summarizer
          </p>
        </Link>

        {/* Buttons */}
        <ul className="flex items-center gap-4">
          {navList.map((nav, index) => {
            return (
              <li key={index}>
                <Link
                  className="flex items-center gap-1 rounded-lg border border-red-500 px-2 py-1 text-center text-[14px] font-medium text-gray-950 hover:bg-red-500 hover:text-white"
                  href={nav.href}
                >
                  {nav.icon}
                  <div className="max-sm:hidden">{nav.title}</div>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* profile */}
        <div className="flex items-center gap-4">
          {/* creditsMenu */}
          <div className="flex items-center gap-1 border-yellow-400 rounded-md bg-foreground">
            {/* remainingCredits */}
            <div className="flex items-center gap-1 px-2 py-[6px]">
              <RiCopperCoinFill
                className="h-[15px] w-[15px] transform"
                color="#E3A008"
              />
              <p className="text-[10px] text-background max-sm:hidden">
                Free Credits
              </p>
            </div>
            {/* addCredits */}
            <Link
              href={"/credits"}
              className="rounded-r-md bg-red-500 bg-gradient-to-br from-yellow-400 to-red-500 px-2 py-[6px] text-gray-950 hover:bg-gradient-to-bl "
            >
              <FaPlusCircle className="h-[15px] w-[15px] transform transition-transform hover:scale-125" />
            </Link>
          </div>

          {/* profilePic / Menu */}
          <Avatar className="h-[35px] w-[35px]">
            <AvatarImage src="" />
            <AvatarFallback className="bg-red-500 text-md text-gray-950">
              Ai
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
}
