"use client";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth();

  async function logout() {
    await signOut(auth);
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("User ==> ", user);
      setIsLoggedIn(user != null);
    });
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <>
          <Link href={"/"}>
            <button>Go to profile</button>
          </Link>
          <br />
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link href={"/register"}>
          <button>Go to register</button>
        </Link>
      )}
    </div>
  );
};

export default page;
