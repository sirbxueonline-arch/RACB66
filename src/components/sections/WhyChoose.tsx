"use client";

import { useTranslations } from "next-intl";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Stagger from "@/components/ui/Stagger";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { Clock, CreditCard, Headphones, Car, CheckCircle2 } from "lucide-react";

export default function WhyChoose() {
  const t = useTranslations("home.whyChoose");

  const steps = [
    {
      id: "one",
      icon: Clock,
    },
    {
      id: "two",
      icon: CreditCard,
    },
    {
      id: "three",
      icon: Headphones,
    },
    {
      id: "four",
      icon: Car,
    },
  ];

  const guarantees = [
    {
      title: t("guarantees.one.title"),
      text: t("guarantees.one.text"),
    },
    {
      title: t("guarantees.two.title"),
      text: t("guarantees.two.text"),
    },
    {
      title: t("guarantees.three.title"),
      text: t("guarantees.three.text"),
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-start">
          {/* Header Content */}
          <div className="mb-12 lg:mb-0 space-y-8 sticky top-20">
            <Reveal>
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-yellow">
                  {t("eyebrow")}
                </p>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight text-black">
                  {t("title")}
                </h2>
                <p className="text-lg text-black/60 max-w-md leading-relaxed">
                  {t("subtitle")}
                </p>
              </div>
            </Reveal>
            
            <Reveal delay={0.1}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/booking">
                  <Button className="h-14 px-8 text-base shadow-xl shadow-brand-yellow/20 hover:shadow-brand-yellow/30 hover:-translate-y-1 transition-all">
                    {t("cta")}
                  </Button>
                </Link>
              </div>
            </Reveal>

            <div className="grid gap-4 pt-4">
               {guarantees.map((item, index) => (
                  <Reveal key={item.title} delay={0.2 + (0.05 * index)}>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-yellow shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-black">{item.title}</p>
                        <p className="text-sm text-black/50">{item.text}</p>
                      </div>
                    </div>
                  </Reveal>
               ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="relative">
            <div className="absolute -inset-4 bg-brand-yellow/5 rounded-[40px] -z-10 blur-3xl opacity-50" />
            <Stagger className="grid sm:grid-cols-2 gap-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  variants={fadeUp}
                  className={`p-8 rounded-3xl bg-[#f9f9f9] border border-black/5 hover:bg-white hover:shadow-xl hover:shadow-black/5 transition-all duration-300 group
                    ${index === 1 ? 'sm:translate-y-12' : ''}
                    ${index === 3 ? 'sm:translate-y-12' : ''}
                  `}
                >
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm border border-black/5 group-hover:scale-110 transition-transform duration-500">
                    <step.icon className="h-6 w-6 text-brand-black" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-black">
                    {t(`steps.${step.id}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-black/60">
                    {t(`steps.${step.id}.text`)}
                  </p>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
