import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  notify(event: string, payload: any) {
    // For lab: just log to console
    console.log(`[NOTIFY] ${event}`, payload);
    return { ok: true };
  }
}
