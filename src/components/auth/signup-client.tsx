"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { signUpService } from "@/services/auth-services";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AlertModal from "../alertModal";
import { PrivacyPolicyDialog } from "../PolicyPrivacy";
import { TermsOfServiceDialog } from "../TermsAndService";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  avatar: z.string().url({
    message: "Avatar must be a valid URL.",
  }),
  email: z.string().email({
    message: "Email must be valid.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function SignUpClientPage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      avatar: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setErrorMessage("");

    try {
      console.log("Submitting signup with values:", values);

      // PERBAIKAN: Urutan parameter yang benar sesuai dengan service
      const response = await signUpService(
        values.name, // name
        values.avatar, // avatar
        values.email, // email
        values.password // password
      );

      console.log("Signup response:", response);

      if (response && response.id) {
        // Check jika response berhasil (biasanya ada ID)
        setShowSuccessAlert(true);

        // Tunggu modal ditutup sebelum redirect
        setTimeout(() => {
          router.push("/signin");
        }, 1500);
      } else {
        console.error("Signup failed: No user ID in response");
        setErrorMessage("Registration failed. Please try again.");
        setShowErrorAlert(true);
      }
    } catch (error: any) {
      console.error("Signup error:", error);

      // Extract error message yang lebih detail
      let message = "Registration failed. Please try again.";

      if (error.response?.data?.message) {
        message = Array.isArray(error.response.data.message)
          ? error.response.data.message.join(", ")
          : error.response.data.message;
      } else if (error.response?.statusText) {
        message = error.response.statusText;
      } else if (error.message) {
        message = error.message;
      }

      setErrorMessage(message);
      setShowErrorAlert(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <AlertModal
        title="Sign Up Successful"
        description="You have successfully signed up. Redirecting to sign in..."
        isOpen={showSuccessAlert}
        onClose={() => setShowSuccessAlert(false)}
      />

      <AlertModal
        title="Sign Up Failed"
        description={
          errorMessage ||
          "Registration failed. Please check your information and try again."
        }
        isOpen={showErrorAlert}
        onClose={() => setShowErrorAlert(false)}
      />

      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-16 items-center justify-center rounded-md">
                <Image
                  src={"/logo.png"}
                  alt="AceVision Logo"
                  width={1000}
                  height={1000}
                  className="h-16 w-16 object-cover"
                />
              </div>
              <span className="sr-only">AceVision.</span>
            </a>
            <h1 className="text-xl font-bold">Create your account</h1>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/signin" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avatar URL</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://example.com/avatar.jpg"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </Form>
        </div>
        <div className="text-muted-foreground text-center text-xs text-balance mx-auto">
          By clicking continue, you agree to our{" "}
          <div className="flex items-center mx-auto">
            <TermsOfServiceDialog />
            and <PrivacyPolicyDialog />
          </div>
        </div>
      </div>
    </>
  );
}
