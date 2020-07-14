import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { WINDOW, WindowRef } from './window-ref';

describe(WindowRef.name, () => {
  let spectator: SpectatorService<WindowRef<string>>;
  const createService = createServiceFactory<WindowRef<string>>(WindowRef);

  it('should make global window available', () => {
    spectator = createService();

    expect(spectator.service.nativeWindow).toEqual(global);
  });

  it('should make injected WINDOW available', () => {
    spectator = createService({
      providers: [{ provide: WINDOW, useValue: 'MY_WINDOW' }],
    });

    expect(spectator.service.nativeWindow).toBe('MY_WINDOW');
  });
});
