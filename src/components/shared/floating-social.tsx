"use client";

import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import {
  FaPlus,
  FaTimes,
  FaWhatsapp,
  FaInstagram,
  FaTelegramPlane,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "../ui/button";

import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

interface SocialMediaSettings {
  sms?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  tiktok?: string;
  telegram?: string;
}

interface Props {
  settings?: SocialMediaSettings;
}

export default function FloatingSocials({ settings }: Props) {
  const [open, setOpen] = useState(false);

  if (!settings) return null;

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 2 }}
      className="fixed bottom-6 left-6 z-50"
    >
      <div className="relative flex flex-col items-center gap-3">
        <AnimatePresence>
          {open && (
            <>
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
            </>
          )}
        </AnimatePresence>

        <Button
          onClick={() => setOpen(!open)}
          className="bg-primary text-white  size-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          {open ? <FaTimes /> : <FaPlus />}
        </Button>
      </div>
    </motion.div>
  );
}
