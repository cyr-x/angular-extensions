import { Inject, Injectable } from '@angular/core';

import { createServiceFactory } from '@ngneat/spectator';

import { defaultIfValidationFn, IfValidationFn, NGX_IF_VALIDATION } from './if-validation';

describe(defaultIfValidationFn.name, () => {
  [
    { input: undefined, expected: false },
    { input: null, expected: false },
    { input: false, expected: false },
    { input: '', expected: false },
    { input: [], expected: false },
    { input: NaN, expected: false },
    { input: true, expected: true },
    { input: 0, expected: true },
    { input: [1], expected: true },
    { input: 'a', expected: true },
    { input: {}, expected: true },
  ].forEach(({ input, expected }) => {
    it(`should be ${expected} for input ${input}`, () => {
      expect(defaultIfValidationFn(input)).toBe(expected);
    });
  });
});

describe('IfValidationInjectionToken', () => {
  it('should provide the default validation function for ngxIf', () => {
    @Injectable({ providedIn: 'root' })
    class TestService {
      constructor(@Inject(NGX_IF_VALIDATION) public validationFn: IfValidationFn) {}
    }
    const instance = createServiceFactory(TestService)();

    expect(instance.service.validationFn).toBe(defaultIfValidationFn);
  });
});
