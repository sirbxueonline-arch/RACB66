"use client";

import { useId, useState } from "react";
import { z } from "zod";
import { useTranslations } from "next-intl";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/ToastProvider";

const schema = z.object({
  company: z.string().min(2),
  contact: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  fleetSize: z.string().min(1),
  duration: z.string().min(1),
  message: z.string().min(5),
});

export default function CorporateInquiryForm() {
  const t = useTranslations("corporate.form");
  const { pushToast } = useToast();
  const id = useId();
  const [values, setValues] = useState({
    company: "",
    contact: "",
    email: "",
    phone: "",
    fleetSize: "",
    duration: "",
    message: "",
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const result = schema.safeParse(values);
    if (!result.success) {
      setErrors([t("error")]);
      return;
    }
    setErrors([]);
    pushToast(t("success"), "success");
    setValues({
      company: "",
      contact: "",
      email: "",
      phone: "",
      fleetSize: "",
      duration: "",
      message: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.length > 0 && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
      <div>
        <label
          htmlFor={`${id}-company`}
          className="text-xs font-semibold uppercase tracking-wide text-black/50"
        >
          {t("company")}
        </label>
        <Input
          id={`${id}-company`}
          value={values.company}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, company: event.target.value }))
          }
          placeholder={t("companyPlaceholder")}
        />
      </div>
      <div>
        <label
          htmlFor={`${id}-contact`}
          className="text-xs font-semibold uppercase tracking-wide text-black/50"
        >
          {t("contact")}
        </label>
        <Input
          id={`${id}-contact`}
          value={values.contact}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, contact: event.target.value }))
          }
          placeholder={t("contactPlaceholder")}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor={`${id}-email`}
            className="text-xs font-semibold uppercase tracking-wide text-black/50"
          >
            {t("email")}
          </label>
          <Input
            id={`${id}-email`}
            type="email"
            value={values.email}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
            placeholder={t("emailPlaceholder")}
          />
        </div>
        <div>
          <label
            htmlFor={`${id}-phone`}
            className="text-xs font-semibold uppercase tracking-wide text-black/50"
          >
            {t("phone")}
          </label>
          <Input
            id={`${id}-phone`}
            value={values.phone}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, phone: event.target.value }))
            }
            placeholder={t("phonePlaceholder")}
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor={`${id}-fleet`}
            className="text-xs font-semibold uppercase tracking-wide text-black/50"
          >
            {t("fleetSize")}
          </label>
          <Select
            id={`${id}-fleet`}
            value={values.fleetSize}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, fleetSize: event.target.value }))
            }
          >
            <option value="">{t("fleetPlaceholder")}</option>
            <option value="1-3">1-3</option>
            <option value="4-10">4-10</option>
            <option value="11-20">11-20</option>
            <option value="20+">20+</option>
          </Select>
        </div>
        <div>
          <label
            htmlFor={`${id}-duration`}
            className="text-xs font-semibold uppercase tracking-wide text-black/50"
          >
            {t("duration")}
          </label>
          <Select
            id={`${id}-duration`}
            value={values.duration}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, duration: event.target.value }))
            }
          >
            <option value="">{t("durationPlaceholder")}</option>
            <option value="1-7">{t("durationShort")}</option>
            <option value="8-30">{t("durationMid")}</option>
            <option value="30+">{t("durationLong")}</option>
          </Select>
        </div>
      </div>
      <div>
        <label
          htmlFor={`${id}-message`}
          className="text-xs font-semibold uppercase tracking-wide text-black/50"
        >
          {t("message")}
        </label>
        <textarea
          id={`${id}-message`}
          value={values.message}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, message: event.target.value }))
          }
          className="focus-ring w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black shadow-sm"
          rows={5}
          placeholder={t("messagePlaceholder")}
        />
      </div>
      <Button type="submit">{t("submit")}</Button>
    </form>
  );
}
