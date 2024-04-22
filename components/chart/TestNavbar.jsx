'use client'
import React, { useState } from "react";
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem} from "@nextui-org/navbar";
import {Button} from "@nextui-org/button";
import Link from "next/link";
import { FaAngleDown,FaAngleUp  } from "react-icons/fa6";


export default function TestNavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [clickHomestay,setClickHomestay] = useState(false);

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        base: "bg-green-700 text-white"
      }}
    >
      <NavbarContent className="sm:hidden " justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link color="foreground" href="/homestay">
            <p className="font-bold text-inherit">Sikkim HomeStay</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarBrand>
          <Link color="foreground" href="/homestay">
            <p className="font-bold text-inherit">Sikkim HomeStay</p>
          </Link>
          
        </NavbarBrand>
        <NavbarItem className=" hover:border-b-2 hover:border-white">
          <Link color="foreground" href="/test">
            About
          </Link>
        </NavbarItem>
        <NavbarItem className=" hover:border-b-2 hover:border-white">
          <div className="relative">
            <p onClick={()=>setClickHomestay(!clickHomestay)}>
              Homestay <button className="ml-2">{clickHomestay?<FaAngleUp/>:<FaAngleDown/>}</button>
            </p>
            {clickHomestay && <div className="absolute top-8 left-0 flex flex-col gap-1 p-2 bg-green-700 
              border-l-1 border-r-1 border-b-1 border-white">
                 <Link href="homestay/add" className="hover:border-b-2 hover:border-white">Add Homestay</Link>
                 <Link href="homestay" className="hover:border-b-2 hover:border-white">View Homestay</Link>
            </div>}
            
          </div>
          
        </NavbarItem>
        <NavbarItem className=" hover:border-b-2 hover:border-white">
          <Link color="foreground" href="#">
            Analytics
          </Link>
        </NavbarItem>
        <NavbarItem className=" hover:border-b-2 hover:border-white">
          <Link color="foreground" href="#">
            Contact Us
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" >
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="solid">
            Log Out
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem className="w-full flex justify-center hover:border-b-2 hover:border-white">
            <Link color="foreground" href="test">
                About
            </Link>
        </NavbarMenuItem>
        <NavbarMenuItem className="w-full flex justify-center hover:border-b-2 hover:border-white">
            <div className={`w-full felx flex-col justify-center `}>
                <div className="w-full">
                    <Link href="#" color="foreground" onClick={()=>setClickHomestay(!clickHomestay)}
                      className="hover:border-b-2 hover:border-white">
                        <div className="flex justify-center">
                            <p>HomeStay</p>
                            <button className="ml-2">{clickHomestay?<FaAngleUp/>:<FaAngleDown/>}</button>
                        </div>
                    </Link>
                </div>
                {clickHomestay && <div>
                    <div className="w-full flex justify-center hover:border-b-2 hover:border-white">
                        <Link href="homestay/add" >
                            Add HomeStay
                        </Link>
                    </div>
                    <div className="w-full flex justify-center hover:border-b-2 hover:border-white">
                        <Link href="homestay">
                            View HomeStay
                        </Link>
                    </div>
                    
                </div>}
            </div>
            
        </NavbarMenuItem>
        <NavbarMenuItem className="w-full flex justify-center hover:border-b-2 hover:border-white">
            <Link color="foreground" href="#">
                Analytics
            </Link>
        </NavbarMenuItem>
        <NavbarMenuItem className="w-full flex justify-center hover:border-b-2 hover:border-white">
            <Link color="foreground" href="#">
                Contact Us
            </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
