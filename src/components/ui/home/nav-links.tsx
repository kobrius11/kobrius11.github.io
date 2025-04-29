"use client";

import Link from "next/link";
import { Code, Home, Layers, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  {
    name: "About",
    href: "#about",
    icon: Home,
  },
  {
    name: "Projects",
    href: "#projects",
    icon: Code,
  },
  {
    name: "Tech Stack",
    href: "#tech-stack",
    icon: Layers,
  },
  {
    name: "Let's connect!",
    href: "#lets-connect",
    icon: Mail,
  },
];

export default function NavLinks() {
  const [activeHash, setActiveHash] = useState<string>("#about"); // Default to about section

  useEffect(() => {
    // Function to determine which section is currently in view
    const handleScroll = () => {
      // Get all section elements
      const sections = links
        .map((link) => document.querySelector(link.href) as HTMLElement)
        .filter(Boolean);

      // Find the section that's currently most visible in the viewport
      let currentSectionId = "#about"; // Default
      let maxVisibility = 0;

      sections.forEach((section) => {
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const visibleHeight =
          Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        const visiblePercentage = visibleHeight / section.offsetHeight;

        if (visiblePercentage > maxVisibility && visiblePercentage > 0.2) {
          // At least 20% visible
          maxVisibility = visiblePercentage;
          currentSectionId = `#${section.id}`;
        }
      });

      setActiveHash(currentSectionId);
    };

    // Initial check
    handleScroll();

    // Set up event listeners
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    // Handle direct hash changes in URL
    const handleHashChange = () => {
      const hash = window.location.hash || "#about";
      if (hash) setActiveHash(hash);
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <>
      {links.map((link) => {
        const isActive = activeHash === link.href;
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex text-nowrap space-x-2 hover:underline md:flex-none md:justify-start md:p-2 md:px-3 transition-colors duration-200",
              {
                "bg-sky-100 text-blue-600 rounded-md": isActive,
                "text-gray-600 hover:text-blue-600 hover:bg-sky-50 rounded-md":
                  !isActive,
              }
            )}
            onClick={(e) => {
              // Smooth scroll to the section
              const targetId = link.href.substring(1); // Remove the # character
              const targetElement = document.getElementById(targetId);
              if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: "smooth" });
                window.history.pushState(null, "", link.href);
                setActiveHash(link.href);
              }
            }}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
