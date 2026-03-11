"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, Loader2 } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { signUp } from "@/api/auth";
import { toast } from "sonner";

const MIN_PASSWORD = 6;

export default function RegisterForm() {
  const router = useRouter();
  const inputClassName =
    "h-11 bg-input-bg focus-visible:ring-primary/50 border-0";
  const t = useTranslations("signIn");

  const schema = React.useMemo(() => {
    return z.object({
      name: z.string().min(1, t("errors.nameRequired")),
      email: z
        .string()
        .min(1, t("errors.emailRequired"))
        .email(t("errors.emailInvalid")),
      password: z
        .string()
        .min(1, t("errors.passwordRequired"))
        .min(MIN_PASSWORD, t("errors.passwordMin", { min: MIN_PASSWORD })),
      agree: z.boolean(),
    });
  }, [t]);

  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "", agree: false },
  });

  const onSubmit = async (values: FormValues) => {
    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    const res = await signUp(data);
    if (res.status === true) {
      toast.success(res.message);
      router.push(`/verify-otp?email=${values.email}`);
    } else {
      toast.error(res.message);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = form;

  return (
    <div className="h-full flex items-center justify-center ">
      <Card className="w-full max-w-sm rounded-2xl shadow-lg">
        <CardHeader className="pt-8 pb-4">
          <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Building2 className="text-primary text-2xl" />
            </div>

            <div className="text-center space-y-1">
              <h1 className="text-h4">{t("registerTitle")}</h1>
              <p className="text-body-md text-gray-600">{t("subtitle")}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">{t("nameLabel")}</Label>
              <Input
                id="name"
                type="text"
                placeholder={t("namePlaceholder")}
                aria-invalid={!!errors.name}
                className={inputClassName}
                {...register("name")}
              />
              {errors.name?.message && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">{t("emailLabel")}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t("emailPlaceholder")}
                aria-invalid={!!errors.email}
                className={inputClassName}
                {...register("email")}
              />
              {errors.email?.message && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">{t("passwordLabel")}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t("passwordPlaceholder")}
                aria-invalid={!!errors.password}
                className={inputClassName}
                {...register("password")}
              />
              {errors.password?.message && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between gap-3">
              <label className="flex items-center gap-2 text-xs">
                <Checkbox
                  checked={watch("agree")}
                  onCheckedChange={(v) => setValue("agree", Boolean(v))}
                />
                <span>
                  {t("agree")}
                  <Link href="/terms" className="text-primary hover:underline">
                    {t("terms")}
                  </Link>{" "}
                  {t("and")}{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    {t("privacy")}
                  </Link>
                </span>
              </label>
            </div>

            {/* Submit */}
            <Button disabled={isSubmitting} type="submit" className="h-11 w-full rounded-xl">
              {isSubmitting ? <Loader2 className="animate-spin" /> : t("registerSubmit")}
            </Button>

            {/* Footer */}
            <div className="text-center text-sm text-gray-600">
              {t("haveAccount")}{" "}
              <Link href="/login" className="text-primary hover:underline">
                {t("signIn")}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
