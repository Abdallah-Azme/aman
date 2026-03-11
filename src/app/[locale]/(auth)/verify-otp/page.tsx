
import VerifyOtpForm from "@/components/auth/verify-otp-form";
import * as motion from "motion/react-client";
const VerfiyOtpPage = () => {
  return (
    <main className="flex justify-center items-center min-h-screen overflow-hidden bg-[#E8EAED] p-8">
      <div className="lg:w-1/2 w-full   ">
        <motion.div
          className="h-full"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <VerifyOtpForm />
        </motion.div>
      </div>
    </main>
  );
};

export default VerfiyOtpPage;
