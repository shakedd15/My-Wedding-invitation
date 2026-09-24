import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase.js";
import { computeGuestStats, selectRespondedGuests } from "../utils/guestStats.js";

export function useGuestStats() {
  const [stats, setStats] = useState(null);
  const [responded, setResponded] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadToken, setReloadToken] = useState(0);

  const retry = useCallback(() => {
    setReloadToken((token) => token + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    supabase
      .from("guests")
      .select("id, full_name, description, guests_max_amount, guests_amount_arriving, sms_count")
      .then(({ data, error: sbError }) => {
        if (cancelled) return;
        if (sbError) {
          setError(`שגיאת חיבור: ${sbError.message}`);
          setStats(null);
          setResponded([]);
        } else {
          const rows = data ?? [];
          setStats(computeGuestStats(rows));
          setResponded(selectRespondedGuests(rows));
        }
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(`שגיאת חיבור: ${err.message}`);
        setStats(null);
        setResponded([]);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [reloadToken]);

  return { stats, responded, loading, error, retry };
}
