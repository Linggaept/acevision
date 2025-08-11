import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@radix-ui/react-avatar";
import {
  LocateIcon,
  MailCheckIcon,
  PhoneCall,
  PhoneCallIcon,
} from "lucide-react";
import Link from "next/link";

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="space-y-8 py-12 md:py-24">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">
              Get in touch
            </h1>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Feel free to leave any enquiries below, or give us a call to speak
              with our helpful sales team.
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <h3 className="text-2xl font-bold">Contact Details</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <LocateIcon width={16} height={16} />
                  <span>1234 Street, City, State, 56789</span>
                </div>
                <div className="flex items-center space-x-2">
                  <PhoneCallIcon width={16} height={16} />
                  <span>(123) 456-7890</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MailCheckIcon width={16} height={16} />
                  <Link href="#" prefetch={false}>
                    info@example.com
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h3 className="text-2xl font-bold">Leave a Message</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Enter your email" type="email" />
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Enter your message"
                  className="min-h-[100px]"
                />
                <Button>Send message</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ChevronDownIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function FlagIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}
