"use client";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { use, useState } from "react";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus]= useState(false)

  async function handleSubmit(e: any) {
    e.preventDefault();
    const auth = getAuth();
    const user = await signInWithEmailAndPassword(auth, email, password)
    if (user) {
      console.log("User ==> ", user);
      setStatus(true)
    } else {
      console.log("Register Failed");
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Enter you password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button>Login</button>
      </form>


{status&&(<h1 className="text-green-400 font-bold">Login Successfull</h1>)}

    </div>
  );
};

export default page;
