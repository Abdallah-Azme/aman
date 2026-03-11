import { getSettings } from "@/api/settings";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import * as motion from "motion/react-client";

const ContactBox = async () => {
  const t = await getTranslations("contactBox");
  const res = await getSettings();
  const settings = res?.status ? res.data : null;
  const whatsappUrl = settings?.whatsapp
    ? `https://wa.me/${settings.whatsapp}`
    : "#";

  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className=" container bg-grad-primary-secondary p-12 rounded-xl  relative"
      >
        <Image
          src="/contact-l.svg"
          alt="contact-l"
          width={200}
          height={200}
          className="h-full w-60 absolute left-0 bottom-0  z-0 max-lg:hidden"
        />
        <Image
          src="/contact-r.svg"
          alt="contact-r"
          width={200}
          height={200}
          className="h-full w-60 absolute right-0 bottom-0  z-0 max-lg:hidden"
        />
        <div className=" flex justify-between items-center max-lg:flex-col max-lg:gap-8 relative z-1">
          <p className="text-center text-primary-light text-h4 lg:w-[40%]">
            {t("description")}
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="lg:w-1/2 w-full h-fit bg-white  lg:text-h5 text-body-lg p-4 rounded-sm flex items-center justify-between cursor-pointer hover:bg-secondary-dark-hover hover:text-white transition-all duration-300"
          >
            {t("cta")}
            <MdOutlineKeyboardDoubleArrowRight className="rtl:rotate-180 lg:size-7 size-4" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactBox;
