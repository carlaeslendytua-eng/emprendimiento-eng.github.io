CREATE TABLE public.contact_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_slug TEXT NOT NULL CHECK (char_length(brand_slug) BETWEEN 1 AND 80),
  fair_id TEXT NOT NULL CHECK (char_length(fair_id) BETWEEN 1 AND 80),
  visitor_name TEXT NOT NULL CHECK (char_length(visitor_name) BETWEEN 1 AND 100),
  email TEXT CHECK (email IS NULL OR char_length(email) <= 255),
  phone TEXT CHECK (phone IS NULL OR char_length(phone) <= 30),
  message TEXT CHECK (message IS NULL OR char_length(message) <= 1000),
  consent_given BOOLEAN NOT NULL CHECK (consent_given = true),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT contact_requests_has_channel CHECK (email IS NOT NULL OR phone IS NOT NULL)
);

GRANT INSERT ON public.contact_requests TO anon, authenticated;
GRANT ALL ON public.contact_requests TO service_role;

ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Visitors can send a contact request with explicit consent"
ON public.contact_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (consent_given = true);