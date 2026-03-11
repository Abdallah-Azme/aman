"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { resendOtp, verifyOtp } from "@/api/auth";
import { z } from "zod";

export default function VerifyOtpForm() {
  const t = useTranslations("otp");
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get("email");

  const schema = React.useMemo(() => {
    return z.object({
      otp: z.string().min(6, t("errors.otpRequired")),
    });
  }, [t]);

  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { otp: "" },
  });

  const onSubmit = async (values: FormValues) => {
    if (!email) {
      toast.error("Email is missing");
      return;
    }

    const data = {
      email: email,
      otp: values.otp,
    };

    const res = await verifyOtp(data);
    if (res.status === true) {
      toast.success(res.message);
      router.push("/login");
    } else {
      toast.error(res.message);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      toast.error("Email is missing");
      return;
    }
    const data = {
      email: email,
    };

    const res = await resendOtp(data);
    if (res.status === true) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <div className="h-full flex items-center justify-center ">
      <Card className="w-full max-w-sm rounded-2xl shadow-lg">
        <CardHeader>
          <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <MdOutlineMarkEmailRead className="text-primary text-2xl" />
            </div>

            <div className="text-center space-y-1">
              <h1 className="text-h4">{t("title")}</h1>
              <p className="text-body-md text-gray-600">{t("subtitle")}</p>
              {email && <p className="text-body-md">{email}</p>}
            </div>
          </div>
        </CardHeader>

        <CardContent className="">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col items-center gap-2">
              <Controller
                name="otp"
                control={control}
                render={({ field }) => (
                  <InputOTP
                    maxLength={6}
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <InputOTPGroup>
                      {Array.from({ length: 6 }).map((_, index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          aria-invalid={!!errors.otp}
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />
              {errors.otp && (
                <p className="text-sm text-destructive">{errors.otp.message}</p>
              )}
            </div>
            <div className="flex justify-center items-center gap-2">
              <p className="text-body-md text-gray-400">{t("dontHaveCode")}</p>
              <Button
                type="button"
                variant="link"
                className="text-primary hover:underline cursor-pointer p-0"
                onClick={() => handleResendOtp()}
              >
                {t("resend")}
              </Button>
            </div>
            {/* Submit */}
            <Button
              disabled={isSubmitting}
              type="submit"
              className="h-11 w-full rounded-xl"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                t("submit")
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
