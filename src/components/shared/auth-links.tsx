"use client";
import { useUser } from "@/context/user";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const AuthLinks = () => {
  const { user, logout } = useUser();
  const t = useTranslations("authLinks");
  return user ? (
    <button
      onClick={logout}
      className="border border-primary bg-primary px-8 py-1.5 text-white rounded-md hover:bg-white hover:text-primary transition-all duration-300"
    >
      {t("logout")}
    </button>
  ) : (
    <div className="flex items-center xl:gap-4 text-body-lg xl:flex-row flex-col  gap-2">
      <Link
        href="/login"
        className="border border-primary bg-primary px-8 py-1.5 text-white rounded-md hover:bg-white hover:text-primary transition-all duration-300"
      >
        {t("login")}
      </Link>
      <p>{t("or")}</p>
      <Link
        href="/register"
        className="border border-primary px-8 py-1.5 text-primary rounded-md hover:bg-primary-hover hover:text-white transition-all duration-300"
      >
        {t("register")}
      </Link>
    </div>
  );
};

export default AuthLinks;
