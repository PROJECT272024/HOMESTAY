import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/navbar";
import Link from "next/link";


export default function NormalNavbar() {
  
  return (
    <Navbar
      isBordered
      maxWidth="full"
      classNames={{
        base: "bg-green-700 text-white w-full"
      }}
    >
      <NavbarBrand justify="center" className="mx-4 sm:mx-16 md:ml-44">
          <Link color="foreground" href="/homestay">
          <p className="font-bold text-inherit min-w-full">Sikkim HomeStay</p>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Link color="foreground" href="/" className="bg-blue-500 text-white flex justify-center py-2 px-4 rounded-lg
           hover:bg-blue-700 sm:mr-16 md:mr-44">
            <p className="font-bold">Log In</p>
          </Link>          
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
