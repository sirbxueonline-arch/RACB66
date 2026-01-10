"use client";

import { useId, useState } from "react";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/ToastProvider";

const schema = z.object({
  pickup: z.string().trim().min(2),
  dropoff: z.string().trim().min(2),
  pickupDate: z.string().min(1),
  returnDate: z.string().min(1),
  category: z.string().min(1),
  car: z.string().trim().min(2),
  phone: z.string().trim().min(5),
  name: z.string().trim().min(2),
});

const categories = ["economy", "business", "premium", "suv", "minivan"];

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const tCategories = useTranslations("categories");
  const router = useRouter();
  const { pushToast } = useToast();
  const id = useId();
  const [values, setValues] = useState({
    pickup: "",
    dropoff: "",
    pickupDate: "",
    returnDate: "",
    category: "economy",
    car: "",
    phone: "",
    name: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }
    const result = schema.safeParse(values);
    if (!result.success) {
      setErrors([t("error")]);
      return;
    }
    setErrors([]);
    setIsSubmitting(true);
    
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        event.currentTarget,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      pushToast(t("success"), "success");
      setValues({
        pickup: "",
        dropoff: "",
        pickupDate: "",
        returnDate: "",
        category: "economy",
        car: "",
        phone: "",
        name: "",
      });
      event.currentTarget.reset();
      setTimeout(() => {
        router.push("/tesekkurler");
      }, 900);
    } catch {
      setErrors([t("error")]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {errors.length > 0 && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
      <div>
        <label
          htmlFor={`${id}-pickup`}
          className="text-xs font-semibold uppercase tracking-wide text-black/50"
        >
          {t("pickup")}
        </label>
        <Input
          id={`${id}-pickup`}
          name="pickup"
          value={values.pickup}
          placeholder={t("pickupPlaceholder")}
          required
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pickup: event.target.value }))
          }
        />
      </div>
      <div>
        <label
          htmlFor={`${id}-dropoff`}
          className="text-xs font-semibold uppercase tracking-wide text-black/50"
        >
          {t("dropoff")}
        </label>
        <Input
          id={`${id}-dropoff`}
          name="dropoff"
          value={values.dropoff}
          placeholder={t("dropoffPlaceholder")}
          required
          onChange={(event) =>
            setValues((prev) => ({ ...prev, dropoff: event.target.value }))
          }
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor={`${id}-pickup-date`}
            className="text-xs font-semibold uppercase tracking-wide text-black/50"
          >
            {t("pickupDate")}
          </label>
          <Input
            id={`${id}-pickup-date`}
            type="datetime-local"
            name="pickupDate"
            value={values.pickupDate}
            required
            onChange={(event) =>
              setValues((prev) => ({ ...prev, pickupDate: event.target.value }))
            }
          />
        </div>
        <div>
          <label
            htmlFor={`${id}-return-date`}
            className="text-xs font-semibold uppercase tracking-wide text-black/50"
          >
            {t("returnDate")}
          </label>
          <Input
            id={`${id}-return-date`}
            type="datetime-local"
            name="returnDate"
            value={values.returnDate}
            required
            onChange={(event) =>
              setValues((prev) => ({ ...prev, returnDate: event.target.value }))
            }
          />
        </div>
      </div>
      <div>
        <label
          htmlFor={`${id}-category`}
          className="text-xs font-semibold uppercase tracking-wide text-black/50"
        >
          {t("category")}
        </label>
        <Select
          id={`${id}-category`}
          name="category"
          value={values.category}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, category: event.target.value }))
          }
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {tCategories(category)}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <label
          htmlFor={`${id}-car`}
          className="text-xs font-semibold uppercase tracking-wide text-black/50"
        >
          {t("car")}
        </label>
        <Input
          id={`${id}-car`}
          name="car"
          value={values.car}
          placeholder={t("carPlaceholder")}
          required
          onChange={(event) =>
            setValues((prev) => ({ ...prev, car: event.target.value }))
          }
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor={`${id}-phone`}
            className="text-xs font-semibold uppercase tracking-wide text-black/50"
          >
            {t("phone")}
          </label>
          <Input
            id={`${id}-phone`}
            type="tel"
            name="phone"
            value={values.phone}
            placeholder={t("phonePlaceholder")}
            required
            onChange={(event) =>
              setValues((prev) => ({ ...prev, phone: event.target.value }))
            }
          />
        </div>
        <div>
          <label
            htmlFor={`${id}-name`}
            className="text-xs font-semibold uppercase tracking-wide text-black/50"
          >
            {t("name")}
          </label>
          <Input
            id={`${id}-name`}
            name="name"
            value={values.name}
            placeholder={t("namePlaceholder")}
            required
            onChange={(event) =>
              setValues((prev) => ({ ...prev, name: event.target.value }))
            }
          />
        </div>
      </div>
      <input type="hidden" name="_next" value="/tesekkurler" />
      <Button
        type="submit"
        disabled={isSubmitting}
        className={isSubmitting ? "cursor-not-allowed opacity-70" : undefined}
      >
        {t("submit")}
      </Button>
    </form>
  );
}
