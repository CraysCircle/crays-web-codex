export type ReceiptEvent = {
  kind: 9735;
  id: string;
  pubkey: string;
  created_at: number;
  tags: string[][];
  content: string;
};
export type ReceiptCallback = (event: ReceiptEvent) => void;

export class ZapReceiptService {
  private callbacks: Set<ReceiptCallback> = new Set();
  private unsubscribe: (() => void) | null = null;
  private started = false;

  start(publicKey: string, relays: string[]): void {
    if (this.started) return;
    this.started = true;
    // TODO: Phase 2 - add actual Nostr/subscription logic
    console.log('[ZapReceiptService] Started for', publicKey, relays);
  }

  stop(): void {
    if (!this.started) return;
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
    this.started = false;
    console.log('[ZapReceiptService] Stopped');
  }

  onReceipt(callback: ReceiptCallback): () => void {
    this.callbacks.add(callback);
    return () => {
      this.callbacks.delete(callback);
    };
  }

  private notifyCallbacks(event: ReceiptEvent): void {
    this.callbacks.forEach(cb => {
      try {
        cb(event);
      } catch (error) {
        console.error('[ZapReceiptService] Error in receipt callback', error);
      }
    });
  }
}

let instance: ZapReceiptService | null = null;
export function getZapReceiptService(): ZapReceiptService {
  if (!instance) instance = new ZapReceiptService();
  return instance;
}
