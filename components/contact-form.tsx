"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { contactFormSchema, type ContactFormValues } from "@/lib/contact-schema";

type FormStatus = "idle" | "sending" | "success" | "error";

export function ContactForm({ source = "contact" }: { source?: "contact" | "coverage-request" }) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormValues>({ resolver: zodResolver(contactFormSchema) });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function submit(values: ContactFormValues) {
    setStatus("sending");
    try {
      const csrfResponse = await fetch("/api/csrf", { cache: "no-store", credentials: "same-origin" });
      const csrfData = (await csrfResponse.json()) as { success: boolean; token?: string; message: string };
      if (!csrfResponse.ok || !csrfData.success || !csrfData.token) throw new Error("CSRF token unavailable");

      const response = await fetch("/api/contact", { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json", "X-CSRF-Token": csrfData.token }, body: JSON.stringify({ ...values, source }) });
      const data = (await response.json()) as { success: boolean; message: string };
      setStatus(data.success ? "success" : "error");
      setMessage(data.message);
      if (data.success) reset();
    } catch {
      setStatus("error");
      setMessage("We could not send your message. Please check your connection and try again.");
    }
  }

  const fieldClass = "mt-2 w-full rounded-xl border border-net-border bg-white px-4 py-3 text-net-neutral-900 placeholder:text-net-neutral-600 focus:border-net-primary";
  return <form onSubmit={handleSubmit(submit)} noValidate className="rounded-3xl border border-net-border bg-net-surface p-5 shadow-sm sm:p-8"><div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-bold text-net-accent">Your name<input className={fieldClass} autoComplete="name" aria-describedby={errors.name ? "name-error" : undefined} {...register("name")} /></label><label className="text-sm font-bold text-net-accent">Phone number<input className={fieldClass} type="tel" autoComplete="tel" aria-describedby={errors.phone ? "phone-error" : undefined} {...register("phone")} /></label></div>{errors.name ? <p id="name-error" className="mt-2 text-sm text-net-danger">{errors.name.message}</p> : null}{errors.phone ? <p id="phone-error" className="mt-2 text-sm text-net-danger">{errors.phone.message}</p> : null}<label className="mt-5 block text-sm font-bold text-net-accent">City or area<input className={fieldClass} aria-describedby={errors.location ? "location-error" : undefined} {...register("location")} /></label>{errors.location ? <p id="location-error" className="mt-2 text-sm text-net-danger">{errors.location.message}</p> : null}<label className="mt-5 block text-sm font-bold text-net-accent">How can we help?<textarea className={fieldClass} rows={5} aria-describedby={errors.message ? "message-error" : undefined} {...register("message")} /></label>{errors.message ? <p id="message-error" className="mt-2 text-sm text-net-danger">{errors.message.message}</p> : null}<label className="hidden" aria-hidden="true">Company<input tabIndex={-1} autoComplete="off" {...register("company")} /></label><button disabled={isSubmitting} className="mt-6 w-full rounded-xl bg-net-primary px-5 py-3 font-bold text-white hover:bg-net-primary-dark disabled:cursor-not-allowed disabled:opacity-70">{isSubmitting ? "Sending your message..." : "Send message"}</button>{status !== "idle" ? <p className={`mt-4 text-sm ${status === "success" ? "text-net-success" : "text-net-danger"}`} role="status" aria-live="polite">{message}</p> : null}</form>;
}
