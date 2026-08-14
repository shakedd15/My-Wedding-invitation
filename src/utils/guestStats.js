function toAmount(value) {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : 0;
}

export function computeGuestStats(rows = []) {
  const stats = {
    invited: 0,
    arriving: 0,
    notAttending: 0,
    undecided: 0,
    invalid: 0,
    progressPercent: 0,
  };

  for (const row of rows) {
    const maxAmount = toAmount(row?.guests_max_amount);
    const arriving = toAmount(row?.guests_amount_arriving);
    const smsCount = toAmount(row?.sms_count);

    stats.invited += maxAmount;

    if (arriving > 0) {
      stats.arriving += arriving;
      stats.notAttending += Math.max(0, maxAmount - arriving);
    } else if (arriving === -1) {
      stats.notAttending += maxAmount;
    } else {
      stats.undecided += maxAmount;
    }

    if (smsCount === 0) stats.invalid += maxAmount;
  }

  if (stats.invited > 0) {
    stats.progressPercent = Math.round(
      ((stats.arriving + stats.notAttending) * 100) / stats.invited,
    );
  }

  return stats;
}
