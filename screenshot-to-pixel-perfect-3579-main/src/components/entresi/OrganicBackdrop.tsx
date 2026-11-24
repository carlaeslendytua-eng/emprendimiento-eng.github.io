export function OrganicBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="blob blob-morph float-slow absolute -left-24 top-10 h-72 w-72 bg-coral-soft" />
      <div className="blob-alt blob-morph absolute -right-20 top-40 h-80 w-80 bg-mint-soft" />
      <div className="blob-pill float-slow absolute bottom-0 left-1/3 h-56 w-56 bg-sky-soft" />
    </div>
  );
}
