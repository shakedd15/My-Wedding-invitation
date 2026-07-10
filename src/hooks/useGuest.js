import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase.js";

/**
 * Fetches a single guest row from the `guests` table by ID.
 *
 * Actual table schema (fetched columns only):
 *   id                     int8     – primary key (?id= URL param)
 *   full_name              varchar  – display name
 *   gender                 varchar  – 'F' (אישה) | 'M' (גבר) | 'X' (משפחה)
 *   guests_max_amount      int8     – max seats allowed (default 3)
 *   guests_amount_arriving int8     – updated on RSVP submit (future use)
 *
 * @param {string|null} guestId  - value of the ?id= query-string param, or null
 * @returns {{ guest: object|null, loading: boolean, error: string|null }}
 */
export function useGuest(guestId) {
  const [guest,   setGuest]   = useState(null);
  const [loading, setLoading] = useState(!!guestId);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!guestId) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    supabase
      .from("guests")
      .select("id, full_name, gender, guests_max_amount, guests_amount_arriving")
      .eq("id", guestId)
      .single()
      .then(({ data, error: sbError }) => {
        if (cancelled) return;
        if (sbError || !data) {
          setError("האורח לא נמצא. בדקו שהקישור נכון.");
          setGuest(null);
        } else {
          setGuest(data);
        }
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [guestId]);

  return { guest, loading, error };
}
