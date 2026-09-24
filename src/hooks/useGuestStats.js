import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase.js";
import { computeGuestStats, selectPendingGuests, selectRespondedGuests } from "../utils/guestStats.js";

export function useGuestStats() {
  const [rows, setRows] = useState(null);
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
      .select("id, full_name, description, phone_number, guests_max_amount, guests_amount_arriving, sms_count")
      .then(({ data, error: sbError }) => {
        if (cancelled) return;
        if (sbError) {
          setError(`שגיאת חיבור: ${sbError.message}`);
          setRows(null);
        } else {
          setRows(data ?? []);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(`שגיאת חיבור: ${err.message}`);
        setRows(null);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [reloadToken]);

  const updateArriving = useCallback(async (id, arriving) => {
    const { error: sbError } = await supabase
      .from("guests")
      .update({ guests_amount_arriving: arriving })
      .eq("id", id);
    if (sbError) throw sbError;
    setRows((current) =>
      (current ?? []).map((row) =>
        row.id === id ? { ...row, guests_amount_arriving: arriving } : row,
      ),
    );
  }, []);

  const stats = rows ? computeGuestStats(rows) : null;
  const responded = rows ? selectRespondedGuests(rows) : [];
  const pending = rows ? selectPendingGuests(rows) : [];

  return { stats, responded, pending, loading, error, retry, updateArriving };
}
