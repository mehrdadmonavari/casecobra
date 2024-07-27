import React from "react";
import { MaxWidthWrapper } from "../max-width-wrapper";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
   const user = undefined;
   const isAdmin = false;

   return (
      <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
         <MaxWidthWrapper>
            <div className="flex h-14 items-center justify-between border-b border-zinc-200">
               <Link className="flex z-40 font-semibold" href="/">
                  case <span className="text-green-600">cobra</span>
               </Link>
               <div className="h-full flex items-center space-x-4">
                  {user ? (
                     <>
                        <Link
                           className={buttonVariants({ size: "sm", variant: "ghost" })}
                           href="/api/auth/logout">
                           Sign out
                        </Link>
                        {isAdmin && (
                           <Link
                              className={buttonVariants({ size: "sm", variant: "ghost" })}
                              href="/api/auth/logout">
                              Dashboard
                           </Link>
                        )}
                        <Link
                           className={buttonVariants({
                              size: "sm",
                              className: "hidden sm:flex items-center gap-1",
                           })}
                           href="/configure/upload">
                           Create case
                           <ArrowRight className="size-5 ml-1.5" />
                        </Link>
                     </>
                  ) : (
                     <>
                        <Link
                           className={buttonVariants({ size: "sm", variant: "ghost" })}
                           href="/api/auth/register">
                           Sign Up
                        </Link>
                        <Link
                           className={buttonVariants({ size: "sm", variant: "ghost" })}
                           href="/configure/login">
                           Login
                        </Link>
                        <Separator orientation="vertical" className="h-8 bg-zinc-200" />
                        <Link
                           className={buttonVariants({
                              size: "sm",
                              className: "hidden sm:flex items-center gap-1",
                           })}
                           href="/configure/upload">
                           Create case
                           <ArrowRight className="size-5 ml-1.5" />
                        </Link>
                     </>
                  )}
               </div>
            </div>
         </MaxWidthWrapper>
      </nav>
   );
};
