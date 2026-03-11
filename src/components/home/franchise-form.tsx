"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale, useTranslations } from "next-intl";
import { franchiseRequest } from "@/api/franchise";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function BecomeFranchiseForm({ title = "" }: { title?: string }) {
  const t = useTranslations("franchisePage.form");
  const loacle = useLocale();
  const INDUSTRIES = [
    { value: "suggestion", label: t("industry.options.suggestion") },
    { value: "food_beverage", label: t("industry.options.food_beverage") },
    { value: "retail", label: t("industry.options.retail") },
    { value: "beauty", label: t("industry.options.beauty") },
    { value: "education", label: t("industry.options.education") },
    { value: "services", label: t("industry.options.services") },
  ];

  /** ✅ Zod Schema inside component to use translations */
  const formSchema = z.object({
    brandName: z
      .string()
      .min(2, t("errors.brandName.min"))
      .max(80, t("errors.brandName.max")),
    email: z.string().email(t("errors.email")),
    phone: z
      .string()
      .min(7, t("errors.phone.min"))
      .max(20, t("errors.phone.max"))
      .regex(/^[0-9+\s-]+$/, t("errors.phone.invalid")),
    subject: z
      .string()
      .max(120, t("errors.subject"))
      .optional()
      .or(z.literal("")),
    industry: z.string().min(1, t("errors.industry")),
    message: z
      .string()
      .min(10, t("errors.message.min"))
      .max(1000, t("errors.message.max")),
  });

  type FormValues = z.infer<typeof formSchema>;

  const inputClassName =
    "h-11 bg-input-bg focus-visible:ring-primary/50 border-0";
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brandName: "",
      email: "",
      phone: "",
      subject: "",
      industry: "",
      message: "",
    },
    mode: "onTouched",
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: FormValues) {
    const data = {
      brand_name: values.brandName,
      first_name: values.email,
      phone: values.phone,
      subject: values.subject || "",
      industry: values.industry,
      how_can_we_help: values.message,
    };
    const response = await franchiseRequest(data);
    if (response?.status == true) {
      toast.success(response.message);
      form.reset();
    } else {
      toast.error(response.message);
    }
  }

  return (
    <div>
      {/* Title */}
      <h2 className="text-h4 ">{t("title")}</h2>

      {/* Description */}
      <p className="mt-3  text-body-md ">{title}</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
          {/* ✅ نفس Layout الصورة (عمودين) */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Brand’s Name (required) - على عرض الصف كله */}
            <FormField
              control={form.control}
              name="brandName"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>
                    <span className="text-destructive">*</span>{" "}
                    {t("brandName.label")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("brandName.placeholder")}
                      {...field}
                      className={inputClassName}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email (required) */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className="text-destructive">*</span>{" "}
                    {t("email.label")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("email.placeholder")}
                      {...field}
                      className={inputClassName}
                      inputMode="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone (required) - Input عادي */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className="text-destructive">*</span>{" "}
                    {t("phone.label")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("phone.placeholder")}
                      {...field}
                      className={inputClassName}
                      inputMode="tel"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Subject */}
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("subject.label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("subject.placeholder")}
                      {...field}
                      className={inputClassName}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Industry (Select) */}
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("industry.label")}</FormLabel>
                  <FormControl>
                    <Select
                      dir={loacle === "ar" ? "rtl" : "ltr"}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className={`w-full ${inputClassName}`}>
                        <SelectValue placeholder={t("industry.placeholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        {INDUSTRIES.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Message - على عرض الصف كله */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("message.label")}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("message.placeholder")}
                    {...field}
                    className={`min-h-[160px] resize-y bg-input-bg ${inputClassName}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Button */}
          <div className="pt-2">
            <Button type="submit" disabled={isSubmitting} className="h-11 px-8">
              {isSubmitting ? <Loader2 className="animate-spin" /> : t("submit")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
