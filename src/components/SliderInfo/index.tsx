"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  FileText,
  Sparkles,
  Target,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Slider() {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const sliderData = [
    {
      bgColor: "bg-purple-200",
      icon: <Sparkles color="purple" />,
      title: "AI",
      description: "Ask literally anything. Notion will answer",
      link: "",
      imageSource: "/ai.png",
    },
    {
      bgColor: "bg-orange-200",
      icon: <FileText color="orange" />,
      title: "Docs",
      description: "Simple, powerful, beautiful. Next-gen notes & docs.",
      link: "",
      imageSource: "/docs.png",
    },
    {
      bgColor: "bg-red-200",
      icon: <BookOpen color="red" />,
      title: "Wikis",
      description: "Centralize your knowledge. No more hunting for answers.",
      link: "",
      imageSource: "/wikis.png",
    },
    {
      bgColor: "bg-blue-200",
      icon: <Target color="blue" />,
      title: "Projects",
      description: "Manage complex projects without the chaos.",
      link: "",
      imageSource: "/projects.png",
    },
    {
      bgColor: "bg-green-200",
      icon: <CalendarCheck color="green" />,
      title: "Calender",
      description: "Manage your time and projects, together.",
      link: "",
      imageSource: "/calendar.png",
    },
  ];

  return (
    <div className="mx-40">
      <div className="grid xl:grid-cols-5 h-full md:grid-cols-2 sm:grid-cols-2 sm:w-full ">
        {sliderData.map((item, index) => (
          <div
            className="p-1"
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(0)}
          >
            <Card
              className={`h-full dark:text-black ${
                index === hoveredIndex
                  ? "bg-white"
                  : "bg-slate-200 dark:bg-slate-300"
              }`}
            >
              <CardHeader>
                <CardTitle>
                  <div
                    className={`${item.bgColor} w-10 p-2 justify-center
                   rounded`}
                  >
                    {item.icon}
                  </div>
                  <p className="pt-3">{item.title}</p>
                </CardTitle>
              </CardHeader>
              <CardContent className="xl:text-xl">
                <p>{item.description}</p>
              </CardContent>
              <CardFooter className="flex flex-row ">
                <Link href={item.link} className="flex justify-center">
                  Learn more
                  <ArrowRight size={16} className="m-1" />
                </Link>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
      <div className="h-full">
        <div className="my-10">
          <Image
            src={sliderData[hoveredIndex].imageSource}
            height="1200"
            width="1400"
            className="object-contain hidden md:block xl:w-full xl:h-full"
            alt="Logo"
          />
        </div>
      </div>
    </div>
  );
}
