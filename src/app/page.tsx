import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Github, Linkedin, Mail } from "lucide-react";
import MessageForm from "@/components/ui/home/contact-form";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const socials = [
  {
    title: "GitHub",
    href: "https://github.com/kobrius11",
    icon: Github,
  },
  {
    title: "Linkedin",
    href: "https://www.linkedin.com/in/software-developer-zygimantas-bickus/",
    icon: Linkedin,
  },
  // {
  //   title: "X",
  //   href: "https://x.com/ZBickus",
  //   icon: X,
  // },
  {
    title: "Mail",
    href: "mailto:zygimantas.bickus@gmail.com",
    icon: Mail,
  },
];

export default function Home() {
  return (
    <main className="h-screen w-full sm:p-20 scroll-smooth snap-y overflow-y-scroll snap-mandatory font-[family-name:var(--font-geist-sans)]">
      <section
        id="about"
        className="snap-start h-screen py-8 md:py-24 lg:py-16"
      >
        <div className="container p-x-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <Avatar className="h-64 w-64">
              <AvatarImage
                src="https://avatars.githubusercontent.com/u/74487224?s=400&u=e6144de6bcbf5095208568b6a049c1efbaf3c6a1&v=4"
                alt="@kobrius11"
              />
              <AvatarFallback>
                <Skeleton className="w-64 h-64 rounded-full" />
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h1 className="text-3xl bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Žygimantas Bičkus
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Building digital experiences with modern technologies. Focused
                on creating elegant solutions to complex problems.
              </p>
              <div className="space-x-1 mt-6">
                {socials.map((social) => {
                  const LinkIcon = social.icon;
                  return (
                    <Link key={social.title} href={social.href} target="_blank">
                      <Button variant="outline" size="icon">
                        <LinkIcon className="h-4 w-4" />
                        <span className="sr-only">{social.title}</span>
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="snap-start h-screen py-8 md:py-24 lg:py-16"
        id="projects"
      >
        <div className="text-center container p-x-4 md:px-6">
          <h2 className="text-3xl bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Projects
          </h2>
        </div>
      </section>

      <section
        className="snap-start h-screen py-8 md:py-24 lg:py-16"
        id="tech-stack"
      >
        <div className="text-center container p-x-4 md:px-6">
          <h2 className="text-3xl bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Tech Stack
          </h2>
        </div>
      </section>

      <section
        className="snap-start h-screen py-8 md:py-24 lg:py-16"
        id="lets-connect"
      >
        <div className="flex flex-col items-center text-center container p-x-4 md:px-6">
          <h2 className="text-3xl bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none my-5">
            Let&apos;s Connect !
          </h2>
          <Card className="w-md lg:w-xl">
            <CardTitle>Leave me a message</CardTitle>
            <CardDescription>And I&apos;ll reach out to you</CardDescription>
            <CardContent>
              <MessageForm />
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
