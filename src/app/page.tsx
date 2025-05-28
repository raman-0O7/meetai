"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export default function Home() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { data: session } = authClient.useSession();

	const onSubmit = () => {
		authClient.signUp.email(
			{
				email,
				name,
				password,
			},
			{
				onError: () => alert("Something Went Wrong"),
				onSuccess: () => alert("Success"),
			}
		);
	};

  if(session) {
    return (
      <div className="flex flex-col gap-y-4">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>
          Log Out
        </Button>
      </div>
    )
  }
	return (
		<div className="flex flex-col gap-y-4 p-4">
			<Input
				placeholder="Enter Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<Input
				placeholder="Enter email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<Input
				placeholder="Enter password"
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<Button onClick={onSubmit}>Create User</Button>
		</div>
	);
}
