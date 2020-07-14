import { InjectionToken } from '@angular/core';

export interface ClickOutsideConfig {
  events: string[];
}

export const NGX_CLICK_OUTSIDE_CONFIG = new InjectionToken<any>('@ngex/common/click-outside/config', {
  providedIn: 'root',
  factory: () => ({
    events: ['click'],
  }),
});
