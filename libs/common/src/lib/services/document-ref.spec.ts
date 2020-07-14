import { DocumentRef } from './document-ref';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { DOCUMENT } from '@angular/common';

describe(DocumentRef.name, () => {
  let spectator: SpectatorService<DocumentRef<string>>;
  const createService = createServiceFactory<DocumentRef<string>>({
    service: DocumentRef,
    providers: [{ provide: DOCUMENT, useValue: 'MY_DOCUMENT', multi: false }],
  });

  it('should make injected DOCUMENT available', () => {
    spectator = createService();

    expect(spectator.service.nativeDocument).toBe('MY_DOCUMENT');
  });
});
