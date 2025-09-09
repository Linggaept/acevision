"use client";

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
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { signInService } from "@/services/auth-services";
import { clientTokenManager } from "@/utils/clientTokenManager";
import { zodResolver } from "@hookform/resolvers/zod";
import AlertModal from "../alertModal";

import GoogleLoginButton from "../button/googleLoginButton";

const formSchema = z.object({
  email: z.string().email({
    message: "Email must be valid.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function SignInClientPage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const response = await signInService(values.email, values.password);

      if (response && response.access_token) {
        // Gunakan token manager untuk menyimpan token
        clientTokenManager.setToken({
          access_token: response.access_token,
          refresh_token: response.refresh_token,
          expires_at: response.expires_at, // Timestamp dalam seconds
          token_type: response.token_type || "Bearer",
        });

        setShowSuccessAlert(true);

        // Tunggu modal ditutup sebelum redirect
        setTimeout(() => {
          router.push("/");
          window.location.reload();
        }, 1500);
      } else {
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setShowErrorAlert(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <AlertModal
        title="Login Successful"
        description="You have successfully logged in. Redirecting to dashboard..."
        isOpen={showSuccessAlert}
        onClose={() => setShowSuccessAlert(false)}
      />

      <AlertModal
        title="Login Failed"
        description="Invalid credentials. Please check your email and password."
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
            <h1 className="text-xl font-bold">Welcome to AceVision.</h1>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
            </form>
            {/* Google Login Button */}
            <GoogleLoginButton />
          </Form>
        </div>
        <div className="text-muted-foreground text-center text-xs text-balance mx-auto">
          By clicking continue, you agree to our Terms of Service and Privacy
          Policy.
        </div>
      </div>
    </>
  );
}
