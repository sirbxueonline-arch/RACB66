"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import emailjs from "@emailjs/browser";
import { z } from "zod";
import {
  carsData,
  deliveryFeesData,
  getLocalizedText,
  mapLocationToLocale,
} from "@/lib/data";
import { calculatePricing } from "@/lib/pricing";
import { formatCurrency, formatDateTime } from "@/lib/format";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import PricingBreakdown from "@/components/ui/PricingBreakdown";
import { useToast } from "@/components/ui/ToastProvider";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";



const step1Schema = z.object({
  carSlug: z.string().min(1),
  pickupLocation: z.string().min(1),
  dropoffLocation: z.string().min(1),
  pickupDate: z.string().min(1),
  dropoffDate: z.string().min(1),

  promoCode: z.string().optional(),
  extras: z.object({
    gps: z.boolean(),
    childSeat: z.boolean(),
    additionalDriver: z.boolean(),
  }),
});

const step2Schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(5),
  email: z.string().email(),
});



const step4Schema = z.object({
  termsAccepted: z.literal(true),
});

const storageKey = "prime-rent-booking-draft";


const formatDateNumeric = (value: string) => {
  if (!value) return "-";
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return value;
  return `${day}/${month}/${year}`;
};

const formatDateTimeNumeric = (value: string) => {
  if (!value) return "-";
  const [datePart, timePart] = value.split("T");
  const date = formatDateNumeric(datePart);
  const time = timePart ? timePart.slice(0, 5) : "00:00";
  return `${date} ${time}`;
};

import { countryCodes } from "@/lib/countries";

export default function BookingFlow() {
  const t = useTranslations("booking");
  const tCategories = useTranslations("categories");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const reduceMotion = useReducedMotion();
  const { pushToast } = useToast();
  const id = useId();
  const locations = deliveryFeesData.map((fee) =>
    getLocalizedText(fee.location, locale as never)
  );
  const fallbackLocation = locations[0] ?? t("defaultLocation");
  const defaultCar = carsData[0]?.slug ?? "";
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  type FormData = {
    carSlug: string;
    pickupLocation: string;
    dropoffLocation: string;
    pickupDate: string;
    dropoffDate: string;

    promoCode: string;
    extras: {
      gps: boolean;
      childSeat: boolean;
      additionalDriver: boolean;
    };

    termsAccepted: boolean;
  };

  const baseFormData = useMemo<FormData>(() => {
    return {
      carSlug: defaultCar,
      pickupLocation: fallbackLocation,
      dropoffLocation: fallbackLocation,
      pickupDate: "",
      dropoffDate: "",
      promoCode: "",
      extras: {
        gps: false,
        childSeat: false,
        additionalDriver: false,
      },

      termsAccepted: false,
    };
  }, [defaultCar, fallbackLocation]);

  const [formData, setFormData] = useState<FormData>(baseFormData);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const next = {
      ...baseFormData,
    };
    const draft = localStorage.getItem(storageKey);
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        Object.assign(next, parsed);
        next.extras = { ...next.extras, ...(parsed.extras ?? {}) };
      } catch {
        // ignore corrupted storage
      }
    }

    const params = Object.fromEntries(searchParams.entries());
    if (Object.keys(params).length > 0) {
      next.carSlug = params.car ?? next.carSlug;
      next.pickupLocation = params.pickupLocation ?? next.pickupLocation;
      next.dropoffLocation = params.dropoffLocation ?? next.dropoffLocation;
      next.pickupDate = params.pickupDate ?? next.pickupDate;
      next.dropoffDate = params.dropoffDate ?? next.dropoffDate;

      next.promoCode = params.promoCode ?? next.promoCode;
      next.extras = {
        ...next.extras,
        gps: params.gps === "1" || next.extras.gps,
        childSeat: params.childSeat === "1" || next.extras.childSeat,
        additionalDriver:
          params.additionalDriver === "1" || next.extras.additionalDriver,
      };
    }

    const pickupBase = new Date(next.pickupDate);
    if (Number.isNaN(pickupBase.getTime())) {
      const pickup = new Date();
      pickup.setHours(pickup.getHours() + 1);
      next.pickupDate = pickup.toISOString().slice(0, 16);
    }
    if (!next.dropoffDate) {
      const pickupSafe = new Date(next.pickupDate);
      const dropoff = new Date(
        Number.isNaN(pickupSafe.getTime()) ? Date.now() : pickupSafe
      );
      dropoff.setDate(dropoff.getDate() + 2);
      next.dropoffDate = dropoff.toISOString().slice(0, 16);
    }

    setFormData(next);
  }, [baseFormData, searchParams]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      pickupLocation: mapLocationToLocale(prev.pickupLocation, locale as never),
      dropoffLocation: mapLocationToLocale(prev.dropoffLocation, locale as never),
    }));
  }, [locale]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(storageKey, JSON.stringify(formData));
  }, [formData]);

  const selectedCar = carsData.find((car) => car.slug === formData.carSlug);

  const pricing = useMemo(() => {
    if (!selectedCar) return null;
    return calculatePricing(selectedCar, {
      carId: selectedCar.id,
      startDate: formData.pickupDate,
      endDate: formData.dropoffDate,
      pickupLocation: formData.pickupLocation,
      dropoffLocation: formData.dropoffLocation,
      promoCode: formData.promoCode,
      extras: formData.extras,
    });
  }, [formData, selectedCar]);

  const steps = [
    t("steps.vehicle"),
    t("steps.contact"),
    t("steps.review"),
  ];

  const validateCurrentStep = () => {
    setErrors([]);
    if (step === 0) {
      const result = step1Schema.safeParse(formData);
      if (!result.success) {
        setErrors([t("validationError")]);
        return false;
      }
    }
    if (step === 1) {
      const result = step2Schema.safeParse(formData);
      if (!result.success) {
        setErrors([t("validationError")]);
        return false;
      }
    }
    if (step === 2) {
      const result = step4Schema.safeParse(formData);
      if (!result.success) {
        setErrors([t("termsError")]);
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    
    // Redirect to WhatsApp immediately with booking details
    if (selectedCar && pricing) {
       const message = `
*New Order Request*
------------------
*Car:* ${selectedCar.brand} ${selectedCar.name} (${selectedCar.year})
*Dates:* ${formData.pickupDate.replace("T", " ")} - ${formData.dropoffDate.replace("T", " ")}
*Locations:* ${formData.pickupLocation} -> ${formData.dropoffLocation}
*Total:* ${pricing.total} AZN
       `.trim();
   
       const phoneNumber = "994997900066";
       const url = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
       
       window.open(url, "_blank");
    }

    // Original behavior (disabled for now as we redirect to WhatsApp)
    // setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setErrors([]);
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleConfirm = async () => {
    if (!validateCurrentStep()) return;
    if (isSubmitting) return;
    if (!selectedCar) {
      setErrors([t("validationError")]);
      return;
    }
    setErrors([]);
    setIsSubmitting(true);

    const reference = `RC66-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const categoryLabel = tCategories(selectedCar.category);
    const message = [
      "🚗 Yeni Sifariş - Prime Rent A Car",
      "",
      "🚘 Maşın məlumatı:",
      `Model:             ${selectedCar.name}`,
      `Kateqoriya:        ${categoryLabel}`,
      "",
      "📍 Marşrut:",
      `Götürmə yeri:      ${formData.pickupLocation}`,
      `Təhvil yeri:       ${formData.dropoffLocation}`,
      "",
      "🕒 Tarixlər:",
      `Götürmə tarixi:    ${formatDateTimeNumeric(formData.pickupDate)}`,
      `Təhvil tarixi:     ${formatDateTimeNumeric(formData.dropoffDate)}`,
    ]
      .filter((line) => line !== null)
      .join("\n");

    const payload = {
      reference,
      ...formData,
      total: pricing?.total ?? 0,
      carName: selectedCar?.name ?? "",
    };
    try {
      console.log("Service ID:", process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
      console.log("Template ID:", process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID);
      console.log("Public Key:", process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          reference,
          car: selectedCar.name,
          category: categoryLabel,
          pickup: formData.pickupLocation,
          dropoff: formData.dropoffLocation,
          pickupDate: formatDateTimeNumeric(formData.pickupDate),
          returnDate: formatDateTimeNumeric(formData.dropoffDate),
          total: `${pricing?.total} AZN`,
          message: message
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      localStorage.setItem(
        "prime-rent-booking-confirmation",
        JSON.stringify(payload)
      );
      localStorage.removeItem(storageKey);
      pushToast(t("successToast"), "success");
      router.push(`${pathname}/success?ref=${reference}`);
    } catch (error: any) {
      console.error("FULL ERROR DETAILS:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
      setErrors([t("submitError")]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-5xl px-6">
        <h1 className="text-3xl font-semibold text-black">{t("title")}</h1>
        <p className="mt-2 text-sm text-black/60">{t("subtitle")}</p>



        {errors.length > 0 && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-soft">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.3 }}
              >
                {step === 0 && (
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor={`${id}-car`}
                        className="text-xs font-semibold uppercase tracking-wide text-black/50"
                      >
                        {t("vehicle")}
                      </label>
                      <Select
                        id={`${id}-car`}
                        value={formData.carSlug}
                        onChange={(event) =>
                          setFormData((prev) => ({
                            ...prev,
                            carSlug: event.target.value,
                          }))
                        }
                      >
                        {carsData.map((car) => (
                          <option key={car.slug} value={car.slug}>
                            {car.name}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label
                          htmlFor={`${id}-pickup`}
                          className="text-xs font-semibold uppercase tracking-wide text-black/50"
                        >
                          {t("pickup")}
                        </label>
                        <Select
                          id={`${id}-pickup`}
                          value={formData.pickupLocation}
                          onChange={(event) =>
                            setFormData((prev) => ({
                              ...prev,
                              pickupLocation: event.target.value,
                            }))
                          }
                        >
                          {locations.map((location) => (
                            <option key={location} value={location}>
                              {location}
                            </option>
                          ))}
                        </Select>
                      </div>
                      <div>
                        <label
                          htmlFor={`${id}-dropoff`}
                          className="text-xs font-semibold uppercase tracking-wide text-black/50"
                        >
                          {t("dropoff")}
                        </label>
                        <Select
                          id={`${id}-dropoff`}
                          value={formData.dropoffLocation}
                          onChange={(event) =>
                            setFormData((prev) => ({
                              ...prev,
                              dropoffLocation: event.target.value,
                            }))
                          }
                        >
                          {locations.map((location) => (
                            <option key={location} value={location}>
                              {location}
                            </option>
                          ))}
                        </Select>
                      </div>
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
                          value={formData.pickupDate}
                          onChange={(event) =>
                            setFormData((prev) => ({
                              ...prev,
                              pickupDate: event.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`${id}-dropoff-date`}
                          className="text-xs font-semibold uppercase tracking-wide text-black/50"
                        >
                          {t("dropoffDate")}
                        </label>
                        <Input
                          id={`${id}-dropoff-date`}
                          type="datetime-local"
                          value={formData.dropoffDate}
                          onChange={(event) =>
                            setFormData((prev) => ({
                              ...prev,
                              dropoffDate: event.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-black/70">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.extras.gps}
                          onChange={(event) =>
                            setFormData((prev) => ({
                              ...prev,
                              extras: { ...prev.extras, gps: event.target.checked },
                            }))
                          }
                        />
                        {t("extraGps")}
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.extras.childSeat}
                          onChange={(event) =>
                            setFormData((prev) => ({
                              ...prev,
                              extras: {
                                ...prev.extras,
                                childSeat: event.target.checked,
                              },
                            }))
                          }
                        />
                        {t("extraChildSeat")}
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.extras.additionalDriver}
                          onChange={(event) =>
                            setFormData((prev) => ({
                              ...prev,
                              extras: {
                                ...prev.extras,
                                additionalDriver: event.target.checked,
                              },
                            }))
                          }
                        />
                        {t("extraDriver")}
                      </label>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4 text-sm text-black/70">
                    <div className="rounded-2xl border border-black/10 p-4">
                      <p className="font-semibold text-black">{t("summary")}</p>
                      <p className="mt-2">
                        {t("summaryCar", { car: selectedCar?.name ?? "" })}
                      </p>
                      <p>
                        {t("summaryDates", {
                          start: formatDateTime(formData.pickupDate, locale as never),
                          end: formatDateTime(formData.dropoffDate, locale as never),
                        })}
                      </p>
                      <p>
                        {t("summaryLocations", {
                          pickup: formData.pickupLocation,
                          dropoff: formData.dropoffLocation,
                        })}
                      </p>
                    </div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.termsAccepted}
                        onChange={(event) =>
                          setFormData((prev) => ({
                            ...prev,
                            termsAccepted: event.target.checked,
                          }))
                        }
                      />
                      {t("terms")}
                    </label>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 0}
              >
                {t("back")}
              </Button>
              {step < steps.length - 1 ? (
                <Button onClick={handleNext}>{t("next")}</Button>
              ) : (
                <Button
                  onClick={handleConfirm}
                  disabled={isSubmitting}
                  className={isSubmitting ? "cursor-not-allowed opacity-70" : undefined}
                >
                  {t("confirm")}
                </Button>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-black">
              {t("priceTitle")}
            </h2>
            {selectedCar && pricing ? (
              <>
                <div className="mt-4">
                  <p className="text-sm text-black/60">
                    {selectedCar.name}
                  </p>
                  <p className="text-2xl font-semibold text-black">
                    {formatCurrency(selectedCar.dailyPrice, locale as never)}
                    <span className="text-sm font-medium text-black/50">
                      {t("perDay")}
                    </span>
                  </p>
                </div>
                <div className="mt-4">
                  <PricingBreakdown result={pricing} />
                </div>
              </>
            ) : (
              <p className="mt-4 text-sm text-black/60">
                {t("selectCar")}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
