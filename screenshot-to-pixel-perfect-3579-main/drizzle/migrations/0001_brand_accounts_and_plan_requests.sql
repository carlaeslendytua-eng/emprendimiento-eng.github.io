-- Which sign-in email belongs to which brand. Rows are added by the Entre Sí team only.
CREATE TABLE public.brand_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  brand_slug text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX brand_accounts_email_brand_idx ON public.brand_accounts (lower(email), brand_slug);

GRANT SELECT ON public.brand_accounts TO authenticated;
GRANT ALL ON public.brand_accounts TO service_role;
ALTER TABLE public.brand_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Brand members can see their own brand link"
ON public.brand_accounts FOR SELECT TO authenticated
USING (lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')));

-- Brands linked to the signed-in user's email.
CREATE OR REPLACE FUNCTION public.my_brand_slugs()
RETURNS SETOF text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT brand_slug FROM public.brand_accounts
  WHERE lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
$$;
REVOKE ALL ON FUNCTION public.my_brand_slugs() FROM public, anon;
GRANT EXECUTE ON FUNCTION public.my_brand_slugs() TO authenticated;

-- Brands can read the contact requests sent to them.
GRANT SELECT ON public.contact_requests TO authenticated;
CREATE POLICY "Brands can read contact requests sent to them"
ON public.contact_requests FOR SELECT TO authenticated
USING (brand_slug IN (SELECT public.my_brand_slugs()));

-- Microempresas asking about a service plan.
CREATE TABLE public.plan_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id text NOT NULL,
  business_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT plan_requests_plan_id_check CHECK (plan_id IN ('visibilidad', 'conexion', 'identidad-ferial')),
  CONSTRAINT plan_requests_lengths_check CHECK (
    char_length(business_name) BETWEEN 1 AND 120
    AND char_length(contact_name) BETWEEN 1 AND 120
    AND char_length(email) BETWEEN 3 AND 200
    AND (phone IS NULL OR char_length(phone) <= 40)
    AND (message IS NULL OR char_length(message) <= 1000)
  )
);

GRANT INSERT ON public.plan_requests TO anon, authenticated;
GRANT ALL ON public.plan_requests TO service_role;
ALTER TABLE public.plan_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can ask about a plan"
ON public.plan_requests FOR INSERT TO anon, authenticated
WITH CHECK (true);