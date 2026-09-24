import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase.js";
import { computeGuestStats, selectAllGuests, selectPendingGuests, selectRespondedGuests } from "../utils/guestStats.js";

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
      .select("id, full_name, description, phone_number, guests_max_amount, guests_amount_arriving, guest_gift_amount, sms_count")
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

  const updateGuest = useCallback(async (id, fields) => {
    const { error: sbError } = await supabase
      .from("guests")
      .update(fields)
      .eq("id", id);
    if (sbError) throw sbError;
    setRows((current) =>
      (current ?? []).map((row) => (row.id === id ? { ...row, ...fields } : row)),
    );
  }, []);

  const createGuest = useCallback(async (fields) => {
    const row = { id: crypto.randomUUID(), ...fields };
    const { error: sbError } = await supabase.from("guests").insert(row);
    if (sbError) throw sbError;
    setRows((current) => [...(current ?? []), row]);
    return row.id;
  }, []);

  const deleteGuest = useCallback(async (id) => {
    const { error: sbError, count } = await supabase
      .from("guests")
      .delete({ count: "exact" })
      .eq("id", id);
    if (sbError) throw sbError;
    if (!count) throw new Error("delete blocked");
    setRows((current) => (current ?? []).filter((row) => row.id !== id));
  }, []);

  const stats = rows ? computeGuestStats(rows) : null;
  const responded = rows ? selectRespondedGuests(rows) : [];
  const pending = rows ? selectPendingGuests(rows) : [];
  const guests = rows ? selectAllGuests(rows) : [];

  return {
    stats,
    responded,
    pending,
    guests,
    loading,
    error,
    retry,
    updateArriving,
    updateGuest,
    createGuest,
    deleteGuest,
  };
}
