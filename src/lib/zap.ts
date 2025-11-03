// --- COMPAT: legacy export expected by CustomZap.tsx  -----------------
export const zapDVM = async (
  dvm: any,
  sender: string | undefined,
  amount: number,
  comment = '',
  relays: Relay[],
  nwc?: string[],
) => {
  try {
    // If the DVM object carries a host/user, treat it like a profile zap
    if (dvm && (dvm.host || dvm.owner || dvm.user)) {
      const targetUser = (dvm.host || dvm.owner || dvm.user) as any;
      return await zapProfile(targetUser, sender, amount, comment, relays, nwc);
    }

    // If the DVM points to a note/job/event, treat it like a note zap
    if (dvm && (dvm.note || dvm.event)) {
      const targetNote = (dvm.note || dvm.event) as any;
      return await zapNote(targetNote, sender, amount, comment, relays, nwc);
    }

    // Fallback: not enough info to route a zap
    lastZapError = 'zapDVM: unsupported target';
    return false;
  } catch (e: any) {
    lastZapError = e?.message ?? String(e);
    return false;
  }
};
