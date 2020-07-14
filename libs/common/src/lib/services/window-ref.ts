import { Injectable, Inject, InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken<Window>('@ngex/window', {
  providedIn: 'root',
  factory: () => window,
});

@Injectable({ providedIn: 'root' })
export class WindowRef<T = Window> {
  public get nativeWindow() {
    return this.window ?? null;
  }

  constructor(@Inject(WINDOW) private readonly window: T) {}
}
