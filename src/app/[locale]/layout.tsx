import FloatingSocials from "@/components/shared/floating-social";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { Changa } from "next/font/google";
import { notFound } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";

import "../globals.css";
const changa = Changa({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  preload: true,
  fallback: ["sans-serif"],
});

import { getSettings } from "@/api/settings";
import { UserProvider } from "@/context/user";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const res = await getSettings();
  const settings = res?.status ? res.data : null;

  return {
    title: {
      default: settings?.site_name || "Aman",
      template: `%s | ${settings?.site_name || "Aman"}`,
    },
    description: settings?.site_description,
    icons: {
      icon: settings?.site_favicon || "/favicon.ico",
      shortcut: settings?.site_favicon || "/favicon.ico",
      apple: settings?.site_favicon || "/favicon.ico",
    },
    openGraph: {
      title: settings?.site_name,
      description: settings?.site_description,
      images: settings?.site_logo ? [{ url: settings.site_logo }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: settings?.site_name,
      description: settings?.site_description,
      images: settings?.site_logo ? [settings.site_logo] : [],
    },
  };
}

export default async function RootLayout({ children, params }: Props) {
  const res = await getSettings();
  const settings = res?.status ? res.data : null;
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <NextIntlClientProvider locale={locale}>
        <body
          dir={locale === "ar" ? "rtl" : "ltr"}
          className={`${changa.className} antialiased text-text`}
        >
          <UserProvider>
            {children}
            <FloatingSocials settings={settings?.social_media} />
            <Toaster
              dir={locale === "ar" ? "rtl" : "ltr"}
              richColors
              position="top-center"
              closeButton
            />
          </UserProvider>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
