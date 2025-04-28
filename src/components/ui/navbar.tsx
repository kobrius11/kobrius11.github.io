"use client";

import { BookOpen, User, CodeIcon, AlignJustifyIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/mode-toggle";

const navItems = [
  { href: "/", label: "About Me", icon: <User /> },
  { href: "/", label: "Blog", icon: <BookOpen /> },
  { href: "/", label: "Projects", icon: <CodeIcon /> },
];

export default function Navbar() {
  return (
    <div className="grid grid-cols-2 sm:px-20">
      <div>{/* Image */}</div>
      <div className="flex justify-center items-center space-x-4 my-1">
        <DesktopNavigation />
        <MobileNavigation />
        <ModeToggle />
      </div>
    </div>
  );
}

function DesktopNavigation() {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="flex space-x-8">
        {navItems.map((item, index) => (
          <NavigationMenuLink
            key={index}
            className="flex flex-row items-center space-x-2 text-lg"
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
    <NavigationMenu className="flex md:hidden justify-end w-full my-3">
      <NavigationMenuItem className="list-none">
        <NavigationMenuTrigger>
          <AlignJustifyIcon />
        </NavigationMenuTrigger>
        <NavigationMenuContent className="flex flex-col ">
          {navItems.map((item, index) => (
            <NavigationMenuLink
              key={index}
              href={item.href}
              className="p-2 text-nowrap space-x-2 items-center flex-row text-lg"
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
