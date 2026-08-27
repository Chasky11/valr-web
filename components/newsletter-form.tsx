"use client";

import { useId, useState } from "react";

type NewsletterFormProps = {
  configured: boolean;
};

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm({ configured }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const noteId = useId();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!configured || status === "loading") return;

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const payload: unknown = await response.json().catch(() => null);
      const result = payload && typeof payload === "object" ? payload as { ok?: unknown; error?: unknown } : {};

      if (!response.ok || result.ok !== true) {
        throw new Error(typeof result.error === "string" ? result.error : "No hemos podido completar la suscripción.");
      }

      setStatus("success");
      setMessage("Ya formas parte del clan.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "No hemos podido completar la suscripción.");
    }
  }

  const isDisabled = !configured || status === "loading" || status === "success";

  return (
    <form className="newsletter" onSubmit={handleSubmit} aria-describedby={noteId}>
      <h3>Únete al clan</h3>
      <p>Acceso anticipado a lanzamientos y relatos del norte.</p>
      <div>
        <input
          type="email"
          name="email"
          required
          aria-label="Correo electrónico"
          placeholder="Tu correo electrónico"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={isDisabled}
        />
        <button type="submit" aria-label="Suscribirse" disabled={isDisabled}>
          {status === "loading" ? "…" : status === "success" ? "✓" : "→"}
        </button>
      </div>
      <p
        id={noteId}
        className={`newsletter-note${status === "error" ? " error" : ""}`}
        role={status === "error" ? "alert" : undefined}
        aria-live="polite"
      >
        {message || (!configured ? "Muy pronto." : "")}
      </p>
    </form>
  );
}
