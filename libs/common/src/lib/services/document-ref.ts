import { Injectable, Inject, InjectionToken } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class DocumentRef<T = Document> {
  public get nativeDocument() {
    return this.document ?? null;
  }

  constructor(@Inject(DOCUMENT) private readonly document: T) {}
}
