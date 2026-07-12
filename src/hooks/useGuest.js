import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase.js";

/**
 * Matches a canonical UUID (v1–v5), case-insensitive.
 * e.g. "8f14e45f-ceea-467e-adc5-cb02a5666bbb"
 */
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Fetches a single guest row from the `guests` table by ID.
 *
 * Actual table schema (fetched columns only):
 *   id                     uuid     – primary key (?id= URL param)
 *   full_name              varchar  – display name
 *   gender                 varchar  – 'F' (אישה) | 'M' (גבר) | 'X' (משפחה)
 *   guests_max_amount      int8     – max seats allowed (default 3)
 *   guests_amount_arriving int8     – updated on RSVP submit (future use)
 *
 * @param {string|null} guestId  - value of the ?id= query-string param (a UUID), or null
 * @returns {{ guest: object|null, loading: boolean, error: string|null }}
 */
export function useGuest(guestId) {
  const [guest,   setGuest]   = useState(null);
  const [loading, setLoading] = useState(!!guestId);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!guestId) return;

    // Catch malformed/tampered links before hitting the network — Supabase
    // would otherwise return a generic "invalid input syntax for type uuid" error.
    if (!UUID_REGEX.test(guestId)) {
      setError("הקישור אינו תקין. בדקו שהעתקתם אותו בשלמותו.");
      setGuest(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    supabase
      .from("guests")
      .select("id, full_name, gender, guests_max_amount, guests_amount_arriving")
      .eq("id", guestId)
      .maybeSingle()
      .then(({ data, error: sbError }) => {
        if (cancelled) return;
        if (sbError) {
          setError(`שגיאת חיבור: ${sbError.message}`);
          setGuest(null);
        } else if (!data) {
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
