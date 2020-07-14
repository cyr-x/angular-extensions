import { InjectionToken } from '@angular/core';

export type IfValidationFn<T = unknown> = (value: T) => boolean;

export function defaultIfValidationFn(value: unknown) {
  if (typeof value === 'boolean') {
    return value;
  } else if (typeof value === 'number') {
    return !isNaN(value);
  } else if (Array.isArray(value) || typeof value === 'string') {
    return value.length > 0;
  } else {
    return value !== null && value !== undefined;
  }
}

export const NGX_IF_VALIDATION = new InjectionToken<IfValidationFn>('@ngex/common/if-validation', {
  providedIn: 'root',
  factory: () => defaultIfValidationFn,
});
