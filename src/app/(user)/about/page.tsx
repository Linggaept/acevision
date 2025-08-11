import { Button } from "@/components/ui/button";
import { ChevronDownIcon, FlagIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-12 md:py-24 ">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">
                About Us
              </h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                We&apos;re on a mission to help teams build, deploy, and scale
                the best web experiences.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-3xl items-start gap-4 lg:max-w-5xl lg:grid-cols-2">
            <div className="flex flex-col items-center justify-center space-y-2 text-center lg:items-start lg:space-y-4 lg:text-left">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-3xl/relaxed lg:text-4xl xl:text-5xl">
                  Our Story
                </h2>
                <p className="max-w-prose text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Founded in 2020, our company started as a small team of
                  developers with a big idea: to make the web more accessible
                  and enjoyable for everyone. Over the years, we&apos;ve grown
                  into a global platform that powers millions of websites, apps,
                  and e-commerce experiences.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 text-center lg:items-start lg:space-y-4 lg:text-left">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-3xl/relaxed lg:text-4xl xl:text-5xl">
                  Our Mission
                </h2>
                <p className="max-w-prose text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  We believe in the power of the web to connect, inspire, and
                  transform. Our mission is to empower innovation by providing
                  the tools and technologies that enable developers to build the
                  future of the internet.
                </p>
              </div>
            </div>
          </div>
          <div className="grid max-w-sm gap-4 mx-auto items-start sm:max-w-4xl sm:grid-cols-2 md:gap-8 lg:max-w-5xl lg:grid-cols-3">
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <Image
                src="/placeholder.svg"
                width="300"
                height="300"
                alt="Team member"
                className="mx-auto rounded-full overflow-hidden aspect-square object-cover object-center border border-gray-200 dark:border-gray-800 dark:filter dark:brightness-90"
              />
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">Alice Johnson</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Product Manager
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <Image
                src="/placeholder.svg"
                width="300"
                height="300"
                alt="Team member"
                className="mx-auto rounded-full overflow-hidden aspect-square object-cover object-center border  border-gray-200 dark:border-gray-800 dark:filter dark:brightness-90"
              />
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">Bob Smith</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Software Engineer
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <Image
                src="/placeholder.svg"
                width="300"
                height="300"
                alt="Team member"
                className="mx-auto rounded-full overflow-hidden aspect-square object-cover object-center border border-gray-200 dark:border-gray-800 dark:filter dark:brightness-90"
              />
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">Ella Brown</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  UX Designer
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
