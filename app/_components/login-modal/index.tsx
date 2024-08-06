import { buttonVariants } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import React from "react";

interface LoginModalProps {
   isOpen: boolean;
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, setIsOpen }) => {
   return (
      <Dialog onOpenChange={setIsOpen} open={isOpen}>
         <DialogContent className="absolute z-[99999]">
            <DialogHeader>
               <div className="relative mx-auto size-24 mb-2">
                  <Image
                     className="object-contain"
                     src="/snake-1.png"
                     alt="snake image"
                     fill
                  />
               </div>
               <DialogTitle className="text-3xl text-center font-bold tracking-tight text-gray-900">
                  Log in to continue
               </DialogTitle>
               <DialogDescription className="text-base text-center py-2">
                  <span className="font-medium text-zinc-900">
                     Your configuration was saved!
                  </span>{" "}
                  Please login or create an account to complete your purchese.
               </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-6 divide-x divide-gray-200">
               <LoginLink className={buttonVariants({ variant: "outline" })}>
                  Login
               </LoginLink>
               <RegisterLink className={buttonVariants({ variant: "default" })}>
                  Sign up
               </RegisterLink>
            </div>
         </DialogContent>
      </Dialog>
   );
};

export default LoginModal;
