DROP POLICY IF EXISTS "Anyone can ask about a plan" ON public.plan_requests;

CREATE POLICY "Anyone can ask about a plan with valid details"
ON public.plan_requests FOR INSERT TO anon, authenticated
WITH CHECK (
  plan_id IN ('visibilidad', 'conexion', 'identidad-ferial')
  AND char_length(btrim(business_name)) BETWEEN 1 AND 120
  AND char_length(btrim(contact_name)) BETWEEN 1 AND 120
  AND char_length(email) BETWEEN 3 AND 200
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND (phone IS NULL OR (char_length(phone) <= 40 AND phone ~ '^[+0-9\s()-]*$'))
  AND (message IS NULL OR char_length(message) <= 1000)
  AND created_at >= now() - interval '5 minutes'
  AND created_at <= now() + interval '5 minutes'
);