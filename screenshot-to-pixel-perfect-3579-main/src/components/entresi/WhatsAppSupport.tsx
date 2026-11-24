const WHATSAPP_NUMBER = "593960942522";
const DEFAULT_MESSAGE =
  "Hola, equipo de Entre Sí. Me gustaría recibir información sobre sus servicios y oportunidades feriales.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" className="size-6 shrink-0" viewBox="0 0 32 32" fill="none">
      <path
        d="M16 3.5a12 12 0 0 0-10.2 18.3L4.2 28l6.4-1.6A12 12 0 1 0 16 3.5Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 9.7c-.4-.8-.8-.8-1.2-.8h-1c-.4 0-.9.2-1.3.7-.5.5-1.7 1.7-1.7 4.1s1.8 4.8 2 5.2c.2.3 3.4 5.4 8.3 7.3 4.1 1.6 4.9 1.3 5.8 1.2.9-.1 2.9-1.2 3.3-2.4.4-1.2.4-2.2.3-2.4-.2-.2-.5-.4-1-.6l-3.1-1.5c-.4-.2-.8-.3-1.1.3-.3.5-1.3 1.6-1.6 1.9-.3.3-.6.4-1.1.1-.5-.2-2-.7-3.8-2.3-1.4-1.2-2.3-2.7-2.6-3.2-.3-.5 0-.7.2-1l.8-.9c.3-.3.4-.5.5-.8.2-.3.1-.6 0-.9l-1.4-3.2Z"
        fill="currentColor"
        transform="translate(2.5 0) scale(.84)"
      />
    </svg>
  );
}

export function WhatsAppSupport({ label = "Chatea con nosotros" }: { label?: string }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} por WhatsApp, +593 96 094 2522. Se abrirá en una nueva pestaña.`}
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#128C4A] px-4 py-3 text-sm font-bold text-white shadow-lift transition-transform hover:-translate-y-0.5 hover:bg-[#0D7A3F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#128C4A]"
    >
      <WhatsAppIcon />
      <span>{label}</span>
    </a>
  );
}
