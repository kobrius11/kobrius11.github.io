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
import {
  Section,
  SectionContent,
  SectionHeader,
  SectionTitle,
  SectionDescription,
  SectionFooter,
} from "@/components/ui/home/section";
import { ProjectSectionContent } from "@/components/ui/home/projects-section";
import { fetchProjectsForHome } from "@/lib/data/data";
import { TechSectionContent } from "@/components/ui/home/tech-section";

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

const techStack = [
  {
    title: "Cloud",
    stack: ['AWS', 'Vercel']
  },
  {
    title: "Databases",
    stack: ['PostgreSQL', 'MongoDB']
  },
  {
    title: "Backend",
    stack: ['Django', 'FastAPI', 'nginx']
  },
  {
    title: "Frontend",
    stack: ['React', 'NextJS']
  },
  {
    title: "Data Engineering/Analytics",
    stack: ['Spark', 'Pandas', 'SQL', 'PowerBI']
  },
];

export default async function Home() {
  const projects = await fetchProjectsForHome();

  return (
    <main className="h-screen w-full snap-y overflow-y-scroll snap-mandatory sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Section id="about">
        <SectionHeader className="text-center items-center justify-center">
          <SectionContent className="flex flex-col items-center justify-center">
            <Avatar className="h-64 w-64">
              <AvatarImage
                src="https://avatars.githubusercontent.com/u/74487224?s=400&u=e6144de6bcbf5095208568b6a049c1efbaf3c6a1&v=4"
                alt="@kobrius11"
              />
              <AvatarFallback>
                <Skeleton className="w-64 h-64 rounded-full" />
              </AvatarFallback>
            </Avatar>
            <SectionTitle>Žygimantas Bičkus</SectionTitle>
            <SectionDescription className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Building digital experiences with modern technologies. Focused on
              creating elegant solutions to complex problems.
            </SectionDescription>
          </SectionContent>
        </SectionHeader>
        <SectionContent className="flex justify-center space-x-1">
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
        </SectionContent>
        <SectionFooter className="my-12 justify-center text-center">
          <SectionDescription>
            <p>
              &quot;Just do good things, and good things will happen to
              you&quot;
            </p>
            <p>- Sassy The Sasquatch</p>
          </SectionDescription>
        </SectionFooter>
      </Section>

      <Section id="projects">
        <SectionHeader className="text-center items-center justify-center">
          <SectionContent>
            <SectionTitle>Projects</SectionTitle>
            <SectionDescription>My latest ventures</SectionDescription>
          </SectionContent>
        </SectionHeader>
        {/* <SectionContent className="flex flex-col justify-center items-center space-y-5 my-5">
          <SearchBar className="w-xl" placeholder="Search for projects..." />
          <ProjectTags />
        </SectionContent> */}

        <ProjectSectionContent projects={projects} className="my-10" />
      </Section>

      <Section id="tech-stack">
        <SectionHeader className="text-center">
          <SectionContent>
            <SectionTitle>Tech Stack</SectionTitle>
            <SectionDescription>What I can and cannot do</SectionDescription>
          </SectionContent>
        </SectionHeader>
        <SectionContent className="flex items-center justify-center flex-col">
            <TechSectionContent techStack={techStack}/>
        </SectionContent>

      </Section>

      <Section id="lets-connect">
        <SectionHeader className="text-center items-center justify-center">
          <SectionContent>
            <SectionTitle>Let&apos;s Connect !</SectionTitle>
            <SectionDescription>Let&apos;s become friends</SectionDescription>
          </SectionContent>
        </SectionHeader>
        <SectionContent className="flex items-center justify-center">
          <Card className="text-center w-md lg:w-xl">
            <CardTitle>Leave me a message</CardTitle>
            <CardDescription>And I&apos;ll reach out to you</CardDescription>
            <CardContent>
              <MessageForm />
            </CardContent>
          </Card>
        </SectionContent>
      </Section>
    </main>
  );
}
