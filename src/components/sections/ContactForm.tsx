"use client";

import { useId, useState } from "react";
import { z } from "zod";
import { useTranslations } from "next-intl";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/ToastProvider";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(5),
});

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const { pushToast } = useToast();
  const id = useId();
  const [values, setValues] = useState({
    name: "",
    email: "",
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
    setValues({ name: "", email: "", message: "" });
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
          htmlFor={`${id}-name`}
          className="text-xs font-semibold uppercase tracking-wide text-black/50"
        >
          {t("name")}
        </label>
        <Input
          id={`${id}-name`}
          value={values.name}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
      </div>
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
        />
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
        />
      </div>
      <Button type="submit">{t("submit")}</Button>
    </form>
  );
}
