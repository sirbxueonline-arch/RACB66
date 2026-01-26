"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { calculatePricing } from "@/lib/pricing";
import type { Car } from "@/lib/data";
import { deliveryFeesData, getLocalizedText, mapLocationToLocale } from "@/lib/data";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import PricingBreakdown from "@/components/ui/PricingBreakdown";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { countryCodes } from "@/lib/countries";

export default function CarDetailPricing({ car }: { car: Car }) {
  const t = useTranslations("carDetail.pricing");
  const tBooking = useTranslations("booking");
  const tFooter = useTranslations("footer");
  const locale = useLocale();
  const id = useId();
  const locations = deliveryFeesData.map((fee) =>
    getLocalizedText(fee.location, locale as never)
  );
  const fallbackLocation = locations[0] ?? t("defaultLocation");
  const [pickupLocation, setPickupLocation] = useState(fallbackLocation);
  const [dropoffLocation, setDropoffLocation] = useState(fallbackLocation);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [promoCode, setPromoCode] = useState("");
  const [extras, setExtras] = useState({
    gps: false,
    childSeat: false,
    additionalDriver: false,
  });

  // Modal State
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+994"); // Added state

  useEffect(() => {
    setPickupLocation((prev) => mapLocationToLocale(prev, locale as never));
    setDropoffLocation((prev) => mapLocationToLocale(prev, locale as never));
  }, [locale]);

  useEffect(() => {
    if (startDate && endDate) return;
    const start = new Date();
    const end = new Date(start);
    end.setDate(end.getDate() + 3);
    setStartDate((prev) => prev || start.toISOString().slice(0, 16));
    setEndDate((prev) => prev || end.toISOString().slice(0, 16));
  }, [startDate, endDate]);

  const result = useMemo(
    () =>
      calculatePricing(car, {
        carId: car.id,
        startDate,
        endDate,
        pickupLocation,
        dropoffLocation,

        extras,
        promoCode,
      }),
    [car, dropoffLocation, endDate, extras, pickupLocation, promoCode, startDate]
  );

  const handleWhatsAppOrder = () => {
    if (!customerPhone || !customerName) {
        alert(tBooking("validationError"));
        return;
    }

    const fullPhone = `${countryCode}${customerPhone}`; // Combined country code and phone

    const message = `
*New Order Request*
------------------
*Car:* ${car.brand} ${car.name} (${car.year})
*Dates:* ${startDate.replace("T", " ")} - ${endDate.replace("T", " ")}
*Pickup:* ${pickupLocation}
*Dropoff:* ${dropoffLocation}
------------------
*Name:* ${customerName}
*Phone:* ${fullPhone}
------------------
*Total:* ${result.total} AZN
    `.trim();

    const phoneNumber = "994997900066"; // Number from footer
    const url = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
    
    window.open(url, "_blank");
    setOrderModalOpen(false);
  };

  return (
    <>
      <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-soft">
        <h3 className="text-lg font-semibold text-black">{t("title")}</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor={`${id}-pickup`}
              className="text-xs font-semibold uppercase tracking-wide text-black/50"
            >
              {t("pickup")}
            </label>
            <Select
              id={`${id}-pickup`}
              value={pickupLocation}
              onChange={(event) => setPickupLocation(event.target.value)}
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
              value={dropoffLocation}
              onChange={(event) => setDropoffLocation(event.target.value)}
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
              htmlFor={`${id}-start`}
              className="text-xs font-semibold uppercase tracking-wide text-black/50"
            >
              {t("startDate")}
            </label>
            <Input
              id={`${id}-start`}
              type="datetime-local"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor={`${id}-end`}
              className="text-xs font-semibold uppercase tracking-wide text-black/50"
            >
              {t("endDate")}
            </label>
            <Input
              id={`${id}-end`}
              type="datetime-local"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </div>
        </div>

        <div className="mt-4 space-y-2 text-sm text-black/70">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={extras.gps}
              onChange={(event) =>
                setExtras((prev) => ({ ...prev, gps: event.target.checked }))
              }
            />
            {t("extraGps")}
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={extras.childSeat}
              onChange={(event) =>
                setExtras((prev) => ({
                  ...prev,
                  childSeat: event.target.checked,
                }))
              }
            />
            {t("extraChildSeat")}
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={extras.additionalDriver}
              onChange={(event) =>
                setExtras((prev) => ({
                  ...prev,
                  additionalDriver: event.target.checked,
                }))
              }
            />
            {t("extraDriver")}
          </label>
        </div>
        <div className="mt-6">
          <PricingBreakdown result={result} />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={() => setOrderModalOpen(true)}>{t("order")}</Button>
          <Button variant="outline">{t("askAgent")}</Button>
        </div>
      </div>

      <Modal
        isOpen={isOrderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        title={tBooking("contact")}
      >
        <div className="space-y-4">
             <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Name
                </label>
                <Input
                    placeholder="Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    autoFocus
                />
            </div>
             <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    {tBooking("phone")}
                </label>
                <div className="flex gap-2">
                  <Select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-[140px] shrink-0"
                  >
                     {countryCodes.map((country) => (
                        <option key={country.code} value={country.code}>
                            {country.label}
                        </option>
                     ))}
                  </Select>
                  <Input
                      placeholder="50 000 00 00"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                  />
                </div>
            </div>
            
            <div className="pt-2">
                <Button onClick={handleWhatsAppOrder} className="w-full">
                    {tFooter("whatsapp")}
                </Button>
            </div>
        </div>
      </Modal>
    </>
  );
}
