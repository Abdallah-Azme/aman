import { getSettings } from "@/api/settings";
import { Link } from "@/i18n/navigation";
import * as motion from "motion/react-client";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import {
  FaInstagram,
  FaRegEnvelope,
  FaTelegramPlane,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";

const Footer = async () => {
  const t = await getTranslations("footer");
  const res = await getSettings();
  const settings = res?.status ? res?.data : null;

  const socials = [
    {
      icon: FaWhatsapp,
      link: settings?.whatsapp ? `https://wa.me/${settings.whatsapp}` : null,
      label: "whatsapp",
    },
    {
      icon: FaFacebookF,
      link: settings?.social_media?.facebook,
      label: "facebook",
    },
    {
      icon: FaXTwitter,
      link: settings?.social_media?.twitter,
      label: "twitter",
    },
    {
      icon: FaInstagram,
      link: settings?.social_media?.instagram,
      label: "instagram",
    },
    {
      icon: FaLinkedinIn,
      link: settings?.social_media?.linkedin,
      label: "linkedin",
    },
    {
      icon: FaTelegramPlane,
      link: settings?.social_media?.telegram,
      label: "telegram",
    },
    {
      icon: FaTiktok,
      link: settings?.social_media?.tiktok,
      label: "tiktok",
    },
  ].filter((s) => s.link);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className=" bg-primary-dark-active"
    >
      <div className="container py-16 text-white ">
        {/* logo and socials */}
        <div className="flex flex-col gap-4 items-center">
          <Image
            src={settings?.site_logo || "/aman-logo.png"}
            alt="logo"
            width={100}
            height={100}
            className="w-32  bg-white rounded"
          />
          <p className="text-body-xl max-lg:text-center text-pretty">
            {settings?.site_description || t("description")}
          </p>
          <div className="flex gap-2">
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.link!}
                target="_blank"
                rel="noopener noreferrer"
              >
                <s.icon className="text-secondary size-6 hover:scale-105 hover:text-primary-light transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>
        {/* product */}
        {/* <div className="flex flex-col gap-4   ">
          <h3 className="text-body-xl ">{t("sections.product.title")}</h3>
          <ul className="space-y-4">
            {t
              .raw("sections.product.links")
              .map((link: string, index: number) => (
                <li key={index}>
                  <Link
                    href="/"
                    className="text-body-md hover:text-secondary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
          </ul>
        </div> */}
        {/* company */}
        {/* <div className="flex flex-col gap-4   ">
          <h3 className="text-body-xl ">{t("sections.company.title")}</h3>
          <ul className="space-y-4">
            {t
              .raw("sections.company.links")
              .map((link: string, index: number) => (
                <li key={index}>
                  <Link
                    href="/"
                    className="text-body-md hover:text-secondary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
          </ul>
        </div> */}
        {/* support */}
        {/* <div className="flex flex-col gap-4   ">
          <h3 className="text-body-xl ">{t("sections.support.title")}</h3>
          <ul className="space-y-4">
            {t
              .raw("sections.support.links")
              .map((link: string, index: number) => (
                <li key={index}>
                  <Link
                    href="/"
                    className="text-body-md hover:text-secondary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
          </ul>
        </div> */}
        {/* contact */}
        {/* <div className="flex flex-col gap-4   ">
          <h3 className="text-body-xl ">{t("sections.contact.title")}</h3>
          <ul className="space-y-4">
            {settings?.site_email && (
              <li>
                <a
                  href={`mailto:${settings.site_email}`}
                  className="text-body-md hover:text-secondary transition-colors flex items-center gap-2"
                >
                  <FaRegEnvelope className="shrink-0" />
                  {settings.site_email}
                </a>
              </li>
            )}
            {settings?.site_phone && (
              <li>
                <a
                  href={`tel:${settings.site_phone}`}
                  className="text-body-md hover:text-secondary transition-colors flex items-center gap-2"
                >
                  <FiPhone className="shrink-0" />
                  {settings.site_phone}
                </a>
              </li>
            )}
            {settings?.site_address && (
              <li className="flex items-center gap-2 text-body-md">
                <IoLocationOutline className="shrink-0" />
                {settings.site_address}
              </li>
            )}
          </ul>
        </div> */}
      </div>

      <div className="container  py-6 border-t text-white">
        <div className="flex gap-2 items-center justify-center max-md:flex-col">
          <p className="text-body-sm">{t("copyright")}</p>
          <p className="max-md:hidden">|</p>
          <Link
            href="/terms"
            className="text-body-sm text-secondary hover:text-primary-light transition-colors"
          >
            {t("legal.terms")}
          </Link>
          <p className="max-md:hidden">|</p>
          <Link
            href="/terms"
            className="text-body-sm text-secondary hover:text-primary-light transition-colors"
          >
            {t("legal.privacy")}
          </Link>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
