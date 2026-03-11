"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import AuthLinks from "./auth-links";

type link = {
  href: string;
  name: string;
};
type NavbarSheetProps = {
  links: link[];
  locale: string;
};
const NavbarSheet = ({ links, locale }: NavbarSheetProps) => {
  const pathName = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-primary text-white size-10 rounded-md xl:hidden ">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={locale === "ar" ? "right" : "left"}>
        <SheetHeader>
          <SheetTitle>
            <Link href="/">
              <p className="text-center text-2xl">Aman</p>
            </Link>
          </SheetTitle>
          <SheetDescription asChild>
            <div className="flex flex-col gap-4  items-center">
              <ul className="flex flex-col gap-4 mt-6 items-center">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href}>
                      <p
                        className={cn(
                          "text-lg text-primary-dark-hover block",
                          pathName === link.href &&
                            "text-black border-b-2 border-black",
                        )}
                      >
                        {link.name}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
              <AuthLinks />
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarSheet;
