'use client'
import React, { useState } from "react";
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem} from "@nextui-org/navbar";
import {Button} from "@nextui-org/button";
import Link from "next/link";
import { FaAngleDown, FaAngleUp} from "react-icons/fa6";
import { signOut } from "next-auth/react";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const [dropdownOpen,setDropdownOpen]=useState(false)
  
  const handleClick = ()=>{setIsMenuOpen(false)}
  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      classNames={{base: "bg-green-700 text-white"}}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link color="foreground" href="/homestay">
            <p className="font-bold text-inherit mr-5">Sikkim HomeStay</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Link color="foreground" href="/homestay">
            <p className="font-bold text-inherit mr-5">Sikkim HomeStay</p>
          </Link>
        </NavbarBrand>
        <NavbarItem className="hover:border-b-2 hover:border-white">
          <Link color="foreground" href="#">
            About
          </Link>
        </NavbarItem>
        <NavbarItem className="bg-green-700 hover:border-b-2 hover:border-white">
          <div className="relative" onClick={()=>setDropdownOpen(!dropdownOpen)}>
            <button className=" flex items-center"><div className="mr-2">HomeStay</div> {dropdownOpen?<FaAngleUp/>:<FaAngleDown/>}</button>
            {dropdownOpen&& <div className=" bg-green-700 flex flex-col gap-3 absolute top-6 left-0 border-x-1 border-b-1 border-white p-2">
              <Link href="/homestay/add" className="hover:border-b-2 hover:border-white">Add Homestay</Link>
              <Link href="/homestay" className="hover:border-b-2 hover:border-white">View Homestay</Link>
            </div>}
          </div>
        </NavbarItem>
        <NavbarItem className="hover:border-b-2 hover:border-white">
          <Link color="foreground" href="#">
            Analytics
          </Link>
        </NavbarItem>
        <NavbarItem className="hover:border-b-2 hover:border-white">
          <Link color="foreground" href="#">
            Contact Us
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        
        <NavbarItem>
          <Button color="primary" onClick={()=>signOut()} variant="solid">
            Log Out
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="text-lg">
        <NavbarMenuItem className="hover:border-b-2 hover:border-white flex justify-center">
            <Link color="foreground" href="#" onClick={handleClick}>
              About
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem className="hover:border-b-2 hover:border-white flex justify-center">
            <div className="flex flex-col">
              <div className="relative flex flex-col justify-center" onClick={()=>setDropdownOpen(!dropdownOpen)}>
                <button className=" flex items-center"><div className="mr-2">HomeStay</div> {dropdownOpen?<FaAngleUp/>:<FaAngleDown/>}</button>
              </div>
              {dropdownOpen&& <div className="flex flex-col gap-3 p-2">
                  <Link href="/homestay/add" className="hover:border-b-2 hover:border-white" onClick={handleClick}>Add Homestay</Link>
                  <Link href="/homestay" className="hover:border-b-2 hover:border-white" onClick={handleClick}>View Homestay</Link>
                </div>}
            </div>
            
          </NavbarMenuItem>
          <NavbarMenuItem className="hover:border-b-2 hover:border-white flex justify-center">
            <Link color="foreground" href="#" onClick={handleClick}>
              Analytics
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem className="hover:border-b-2 hover:border-white flex justify-center">
            <Link color="foreground" href="#" onClick={handleClick}>
              Contact Us
            </Link>
          </NavbarMenuItem>
        
      </NavbarMenu>
    </Navbar>
  );
}
