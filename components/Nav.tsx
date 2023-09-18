"use client";
import { signOut, getProviders, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import DropdownLink from "./DropdownLink";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<unknown>();
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setInitialProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setInitialProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
      </Link>

      {/* Desktop navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create a new post
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              className="outline_btn"
            >
              Sign out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign in
                  </button>
                );
              })}
          </>
        )}
      </div>
      {/* Mobile navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => {
                setToggleDropdown((prev) => {
                  return !prev;
                });
              }}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <DropdownLink
                  link="/profile"
                  text="My profile"
                  setToggleDropdown={setToggleDropdown}
                />
                <DropdownLink
                  link="/create_prompt"
                  text="Create prompt"
                  setToggleDropdown={setToggleDropdown}
                />
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign in
                  </button>
                );
              })}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
