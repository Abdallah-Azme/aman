import { Link } from "@/i18n/navigation";
import { HiArrowNarrowRight } from "react-icons/hi";

type Props = {
  href: string;
  text: string;
  isExternal?: boolean;
};

const CustomLink = ({ href, text, isExternal = false }: Props) => {
  return isExternal ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className=" text-base h-10 w-fit px-2 flex items-center  gap-1 text-text border-b-2 border-text rounded-none hover:text-white hover:bg-text max-lg:mx-auto transition-all duration-300 ease-in-out"
    >
      {text} <HiArrowNarrowRight className="rtl:rotate-180" />
    </a>
  ) : (
    <Link
      href={href}
      className=" text-base h-10 w-fit px-2 flex items-center  gap-1 text-text border-b-2 border-text rounded-none hover:text-white hover:bg-text max-lg:mx-auto transition-all duration-300 ease-in-out"
    >
      {text} <HiArrowNarrowRight className="rtl:rotate-180" />
    </Link>
  );
};

export default CustomLink;
