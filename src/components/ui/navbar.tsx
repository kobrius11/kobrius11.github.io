"use client";

import Link from "next/link";
import { BookOpen, User, CodeIcon, AlignJustifyIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/mode-toggle";
import TypingEffect from "@/components/ui/typing-effect";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "#about", label: "About Me", icon: <User /> },
  { href: "#tech-stack", label: "Blog", icon: <BookOpen /> },
  { href: "#projects", label: "Projects", icon: <CodeIcon /> },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="grid grid-cols-2 sm:px-20">
        <div className="flex items-center px-5 space-x-4">
          <div className="w-30">
            <Link href="/">
            <TypingEffect text="@kobrius11" speed={170} className=" text-xl bold tracking-tighter text-nowrap" />
            </Link>
          </div>
          <DesktopNavigation />
          <MobileNavigation />
        </div>
        <div className="flex justify-center items-center space-x-4 my-1">
          <ModeToggle />
          <Button variant="outline">
            Resume
          </Button>
        </div>
      </div>
    </header>
  );
}

function DesktopNavigation() {
  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList className="flex">
        {navItems.map((item, index) => (
          <NavigationMenuLink
            key={index}
            className="flex flex-row items-center text-nowrap text-lg "
            href={item.href}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavigationMenuLink>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function MobileNavigation() {
  return (
    <NavigationMenu className="flex lg:hidden justify-end w-full my-3">
      <NavigationMenuItem className="list-none">
        <NavigationMenuTrigger>
          <AlignJustifyIcon />
        </NavigationMenuTrigger>
        <NavigationMenuContent className="flex flex-col ">
          {navItems.map((item, index) => (
            <NavigationMenuLink
              key={index}
              href={item.href}
              className="p-2 text-nowrap items-center flex-row text-lg"
            >
              {item.icon}
              <span>{item.label}</span>
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenu>
  );
}
