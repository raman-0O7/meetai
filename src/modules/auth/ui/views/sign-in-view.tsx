"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { FaGithub, FaGoogle } from "react-icons/fa";

const formSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1, { message: "Password is require" }),
});

export const SignInView = () => {
	const router = useRouter();
	const [pending, setPending] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		setError(null);
		setPending(true);
		authClient.signIn.email(
			{
				email: data.email,
				password: data.password,
				callbackURL: "/",
			},
			{
				onSuccess: () => {
					setPending(false);
					router.replace("/ ");
				},
				onError: ({ error }) => {
					setError(error.message);
					setPending(false);
				},
			}
		);
	};

	const onSocial = (provider: "google" | "github") => {
		setError(null);
		setPending(true);
		authClient.signIn.social(
			{
				provider: provider,
				callbackURL: "/",
			},
			{
				onSuccess: () => {
					setPending(false);
				},
				onError: ({ error }) => {
					setError(error.message);
					setPending(false);
				},
			}
		);
	};

	return (
		<div className="flex flex-col gap-6">
			<Card className="overflow-hidden p-0">
				<CardContent className="grid p-0 md:grid-cols-2">
					<Form {...form}>
						<form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
							<div className="flex flex-col gap-6">
								<div className="flex flex-col items-center justify-center">
									<h1 className="text-2xl font-bold">Welcome Back</h1>
									<p className="text-muted-foreground text-balance">
										Login to your account
									</p>
								</div>
								<div className="grid gap-3">
									<FormField
										name="email"
										control={form.control}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														type="email"
														placeholder="m@example.com"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="grid gap-3">
									<FormField
										name="password"
										control={form.control}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Password</FormLabel>
												<FormControl>
													<Input
														type="password"
														placeholder="********"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								{!!error && (
									<Alert className="bg-destructive/10 border-none">
										<OctagonAlert className="w-4 h-4 !text-destructive" />
										<AlertTitle>{error} </AlertTitle>
									</Alert>
								)}
								<Button type="submit" className="w-full" disabled={pending}>
									Sign In
								</Button>
								<div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:border-t after:top-1/2 after:z-0 after:flex after:items-center">
									<span className="bg-card text-muted-foreground z-10 relative px-2">
										Or continue with
									</span>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<Button
										type="button"
										variant={"outline"}
										className="w-full"
										disabled={pending}
										onClick={() => onSocial("google")}
									>
										<FaGoogle />
									</Button>
									<Button
										type="button"
										variant={"outline"}
										className="w-full"
										disabled={pending}
										onClick={() => onSocial("github")}
									>
										<FaGithub />
									</Button>
								</div>
							</div>
							<div className="text-sm text-center mt-4">
								Don&apos;t have an account?{" "}
								<Link
									href={"/sign-up"}
									className="underline underline-offset-4"
								>
									Sign Up
								</Link>
							</div>
						</form>
					</Form>
					<div className="bg-radial from-sidebar-accent to-sidebar hidden relative gap-y-4 md:flex flex-col items-center justify-center">
						<img src={"logo.svg"} className="w-[92px] h-[92px]" alt="Logo" />
						<p className="text-2xl font-semibold text-white">Meet.AI</p>
					</div>
				</CardContent>
			</Card>

			<div className="text-muted-foreground *:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-primary text-center text-sm text-balance">
				By clicking to continue, you agree to our{" "}
				<a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a>.
			</div>
		</div>
	);
};
