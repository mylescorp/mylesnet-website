"use client";

import { cloneElement, useId, useState, type ReactElement } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { contactFormSchema, type ContactFormValues } from "@/lib/contact-schema";

export type ContactSource = "contact" | "coverage-request" | "home-installation" | "survey-request" | "isp-quote" | "health-check" | "rescue" | "partner-application" | "advertising";

type Props = {
  source?: ContactSource;
  serviceOptions?: string[];
  showOrganization?: boolean;
  showTimeline?: boolean;
  submitLabel?: string;
};

export function ContactForm({ source = "contact", serviceOptions, showOrganization = false, showTimeline = false, submitLabel = "Send enquiry" }: Props) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormValues>({ resolver: zodResolver(contactFormSchema) });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const fieldClass = "mt-2 min-h-12 w-full rounded-lg border border-net-border bg-net-surface px-4 py-3 text-base text-net-neutral-900 placeholder:text-net-neutral-600 focus:border-net-primary";

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

  return <form onSubmit={handleSubmit(submit)} noValidate className="rounded-2xl border border-net-border bg-net-neutral-50 p-5 shadow-sm sm:p-7">
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Your name" error={errors.name?.message}><input className={fieldClass} autoComplete="name" {...register("name")} /></Field>
      <Field label="Phone number" error={errors.phone?.message}><input className={fieldClass} type="tel" autoComplete="tel" {...register("phone")} /></Field>
      <Field label="City or area" error={errors.location?.message}><input className={fieldClass} autoComplete="address-level2" {...register("location")} /></Field>
      {showOrganization ? <Field label="Business or facility name (optional)" error={errors.organization?.message}><input className={fieldClass} autoComplete="organization" {...register("organization")} /></Field> : null}
      {serviceOptions?.length ? <Field label="Service you are interested in" error={errors.service?.message}><select className={fieldClass} defaultValue="" {...register("service")}><option value="">Select a service</option>{serviceOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select></Field> : null}
      {showTimeline ? <Field label="When do you need this? (optional)" error={errors.timeline?.message}><select className={fieldClass} defaultValue="" {...register("timeline")}><option value="">Choose a timeline</option><option value="asap">As soon as possible</option><option value="within-month">Within one month</option><option value="later-this-year">Later this year</option><option value="exploring">Just exploring</option></select></Field> : null}
    </div>
    <Field label="How can we help?" error={errors.message?.message}><textarea className={`${fieldClass} min-h-32`} rows={5} {...register("message")} /></Field>
    <label className="hidden" aria-hidden="true">Company<input tabIndex={-1} autoComplete="off" {...register("company")} /></label>
    <p className="mt-3 text-xs leading-5 text-net-neutral-600">We will use these details to respond to this enquiry. Please do not include passwords or payment details.</p>
    <button disabled={isSubmitting} className="mt-5 min-h-12 w-full rounded-lg bg-net-primary px-5 py-3 font-bold text-net-on-action hover:bg-net-primary-dark disabled:cursor-not-allowed disabled:opacity-70">{isSubmitting || status === "sending" ? "Sending your enquiry..." : submitLabel}</button>
    {status !== "idle" ? <p className={`mt-4 text-sm ${status === "success" ? "text-net-success" : "text-net-danger"}`} role="status" aria-live="polite">{message}</p> : null}
  </form>;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  const id = useId();
  const errorId = `${id}-error`;
  const control = cloneElement(children as ReactElement<Record<string, unknown>>, { id, "aria-invalid": Boolean(error), "aria-describedby": error ? errorId : undefined });
  return <label htmlFor={id} className="mb-4 block text-sm font-semibold text-net-accent">{label}{control}{error ? <span id={errorId} className="mt-1 block text-sm font-normal text-net-danger" role="alert">{error}</span> : null}</label>;
}
