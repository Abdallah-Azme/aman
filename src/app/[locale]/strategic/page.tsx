import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import React from "react";
import * as motion from "motion/react-client";
import CustomBadage from "@/components/shared/custom-badage";
import CustomLink from "@/components/shared/custom-link";
import { useTranslations } from "next-intl";
import MissonSection from "@/components/about/misson-section";
import GoalCard from "@/components/home/goal-card";
import { cn } from "@/lib/utils";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import ContactBox from "@/components/home/contact-box";
import { getGoals, getVision } from "@/api/startegic";
import { getTranslations } from "next-intl/server";
import { GoalItem } from "@/types/home";
import { getSettings } from "@/api/settings";
import {
  FaWhatsapp,
  FaInstagram,
  FaTelegramPlane,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import HtmlContent from "@/components/shared/html-content";

const StrategicPage = async () => {
  const s = await getTranslations("strategicPage");
  let vision;
  let goals: { goals: GoalItem[] } | null;
  const visionResponse = await getVision();
  
  if (visionResponse?.status) {
    vision = visionResponse?.data;
  } else {
    vision = null;
  }
  const goalsResponse = await getGoals();

  if (goalsResponse?.status) {
    goals = goalsResponse?.data;
  } else {
    goals = null;
  }
  const res = await getSettings();
  const settings = res?.status ? res.data.social_media : null;
    const socials = [
      {
        icon: FaWhatsapp,
        link: settings.sms ? `https://wa.me/${settings.sms}` : undefined,
        label: "whatsapp",
        color: "text-green-500",
      },
      {
        icon: FaFacebookF,
        link: settings.facebook || undefined,
        label: "facebook",
        color: "text-blue-600",
      },
      {
        icon: FaXTwitter,
        link: settings.twitter || undefined,
        label: "twitter",
        color: "text-black",
      },
      {
        icon: FaInstagram,
        link: settings.instagram || undefined,
        label: "instagram",
        color: "text-pink-500",
      },
      {
        icon: FaLinkedinIn,
        link: settings.linkedin || undefined,
        label: "linkedin",
        color: "text-blue-700",
      },
      {
        icon: FaTelegramPlane,
        link: settings.telegram || undefined,
        label: "telegram",
        color: "text-blue-500",
      },
      {
        icon: FaTiktok,
        link: settings.tiktok || undefined,
        label: "tiktok",
        color: "text-black",
      },
    ].filter((s) => s.link) as {
      icon: React.ElementType;
      link: string; // link is guaranteed to be string because of filter(s => s.link)
      label: string;
      color: string;
      }[];
  const isOdd = (goals?.goals?.length ?? 0) % 2 !== 0;
  return (
    <>
      <Navbar />
      <main>
        {/* content */}
        {vision && (
          <section className="relative h-screen w-full overflow-hidden  flex items-center justify-center">
            {/* anmated bg */}
            <InteractiveGridPattern />
            {/* content */}
            <div className="container flex flex-col items-center justify-between ">
              {/* content */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                viewport={{ once: true }}
                className="  flex flex-col gap-4 z-1 items-center  "
              >
                <CustomBadage text={s("badge")} />
                <h1 className="lg:text-h2 text-h3 text-gradient">
                  {vision?.title}
                </h1>
                <HtmlContent
                  className="lg:text-2xl text-lg"
                  html={vision?.description}
                />
                {/* <div className="flex items-center gap-4">
                  <CustomLink href="/" text={s("link")} />
                </div> */}

                <div className="flex items-center gap-4 ">
                  {socials.map((s, i) => (
                    <motion.a
                      key={s.label}
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-white shadow-lg  rounded-full size-14  flex items-center justify-center hover:scale-110 transition-transform"
                      title={s.label}
                    >
                      <s.icon size={20} className={s?.color} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}
        {/* mossion */}
        <section className=" py-16">
          <MissonSection withLink={false} />
        </section>
        {/* goals */}
        {goals && (
          <section className="py-16 bg-primary/20">
            <div className="container">
              {/* header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 w-full"
              >
                <span className="h-1 flex-1 bg-white "></span>
                <span className="px-4 py-2 text-h3 ">{s("goals.title")}</span>
                <span className="h-1 flex-1 bg-white "></span>
              </motion.div>
              {/* discriptions */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="text-center lg:text-h4 text-h5"
              >
                {s("goals.description")}
              </motion.p>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-8">
                {goals?.goals.map((goal: GoalItem, index: number) => {
                  const isLast = index === (goals?.goals?.length ?? 0) - 1;
                  return (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.7 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1, delay: 1 + 0.2 * index }}
                      viewport={{ once: true }}
                      key={index}
                      className={cn(isOdd && isLast && "lg:col-span-2")}
                    >
                      <GoalCard goal={goal} number={index + 1} />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </main>
      <ContactBox />
      <Footer />
    </>
  );
};

export default StrategicPage;
