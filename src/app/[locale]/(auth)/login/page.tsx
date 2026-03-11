import { useTranslations } from "next-intl";
import Image from "next/image";
import * as motion from "motion/react-client";
import LoginForm from "@/components/auth/login-form";
const LoginPage = () => {
  const t = useTranslations("auth");
  return (
    <main className="flex overflow-hidden">
      <div className="w-1/2 min-h-screen bg-primary p-8 relative max-lg:hidden">
        <Image
          src="/login-shdow.svg"
          alt="Logo"
          width={400}
          height={400}
          className="absolute top-0 left-0"
        />
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className=" flex flex-col justify-between h-full"
        >
          <Image
            src="/aman-logo.png"
            alt="Logo"
            width={150}
            height={150}
            className="bg-white relative z-10  rounded-lg"
          />
          <div className="relative z-10 text-white space-y-2 lg:max-w-xl">
            <div
              className="text-h3"
              dangerouslySetInnerHTML={{ __html: t("title") }}
            />
            <p className="text-body-lg">{t("description")}</p>
          </div>
          <Image
            src="/auth.svg"
            alt="Auth"
            width={400}
            height={400}
            className="w-full"
          />
        </motion.div>
      </div>
      <div className="lg:w-1/2 w-full min-h-screen bg-[#E8EAED] p-8 ">
        <motion.div
          className="h-full"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <LoginForm />
        </motion.div>
      </div>
    </main>
  );
};

export default LoginPage;
