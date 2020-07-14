import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';

import { NGX_IF_VALIDATION } from '../tokens/if-validation';
import { IfDirective } from './if.directive';

describe(IfDirective.name, () => {
  let spectator: SpectatorDirective<IfDirective>;
  const createDirective = createDirectiveFactory({
    directive: IfDirective,
    providers: [{ provide: NGX_IF_VALIDATION, useValue: (value) => value }],
  });

  it('should provide a template context guard', () => {
    spectator = createDirective(`<div *ngxIf="true"></div>`);
    expect(IfDirective.ngTemplateContextGuard(spectator.directive, {})).toBe(true);
  });

  it('should display the template with asterix syntax', () => {
    spectator = createDirective(`<div *ngxIf="true"></div>`);

    expect(spectator.query('div')).toBeTruthy();
  });

  it('should not display any template if condition is false and no else template is provided', () => {
    spectator = createDirective(`<div *ngxIf="false"></div>`);

    expect(spectator.query('div')).toBeFalsy();
  });

  [
    { input: true, expected: 'div' },
    { input: false, expected: 'span' },
  ].forEach(({ input, expected }) => {
    it(`should display the ${input ? 'then' : 'else'}Template with asterix syntax`, () => {
      spectator = createDirective(`
        <ng-template *ngxIf="${input}; then thenTemplate; else elseTemplate">
        </ng-template>
        <ng-template #thenTemplate><div></div></ng-template>
        <ng-template #elseTemplate><span></span></ng-template>
      `);

      expect(spectator.query(expected)).toBeTruthy();
    });
  });

  it('should bind the value to a template variable with asterix syntax', () => {
    spectator = createDirective(`<div *ngxIf="[1,2] as test">{{ test }}</div>`);

    expect(spectator.query('div')).toHaveExactText('1,2');
  });

  [
    { input: true, expected: 'div' },
    { input: false, expected: 'span' },
  ].forEach(({ input, expected }) => {
    it(`should display the ${input ? 'then' : 'else'}Template with template syntax`, () => {
      spectator = createDirective(`
        <ng-template [ngxIf]="${input}" [ngxIfThen]="thenTemplate" [ngxIfElse]="elseTemplate">
        </ng-template>
        <ng-template #thenTemplate><div></div></ng-template>
        <ng-template #elseTemplate><span></span></ng-template>
      `);

      expect(spectator.query(expected)).toBeTruthy();
    });
  });

  it('should bind the value to a template variable with template syntax', () => {
    spectator = createDirective(`
      <ng-template [ngxIf]="[1,2]" let-test>
        <div>{{ test }}</div>
      </ng-template>
    `);

    expect(spectator.query('div')).toHaveExactText('1,2');
  });

  it(`should show the thenTemplate for if validation function returns true`, () => {
    spectator = createDirective(
      `
      <div *ngxIf="test; else elseTemplate"></div>
      <ng-template #elseTemplate><span></span></ng-template>
    `,
      {
        providers: [{ provide: NGX_IF_VALIDATION, useValue: () => true }],
      },
    );

    expect(spectator.query('div')).toBeTruthy();
    expect(spectator.query('span')).toBeFalsy();
  });

  it(`should show the elseTemplate for if validation function returns false`, () => {
    spectator = createDirective(
      `
      <div *ngxIf="test; else elseTemplate"></div>
      <ng-template #elseTemplate><span></span></ng-template>
    `,
      {
        providers: [{ provide: NGX_IF_VALIDATION, useValue: () => false }],
      },
    );

    expect(spectator.query('div')).toBeFalsy();
    expect(spectator.query('span')).toBeTruthy();
  });
});
