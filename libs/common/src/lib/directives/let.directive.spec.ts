import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';

import { LetDirective } from './let.directive';

describe(LetDirective.name, () => {
  let spectator: SpectatorDirective<LetDirective>;
  const createDirective = createDirectiveFactory({
    directive: LetDirective,
  });

  it('should provide a template context guard', () => {
    spectator = createDirective(`<div *ngxLet="true"></div>`);
    expect(LetDirective.ngTemplateContextGuard(spectator.directive, {})).toBe(true);
  });

  it('should display the template with asterix syntax', () => {
    spectator = createDirective(`<div *ngxLet="true"></div>`);

    expect(spectator.query('div')).toBeTruthy();
  });

  it('should bind the value to a template variable with asterix syntax', () => {
    spectator = createDirective(`<div *ngxLet="true as test">{{ test }}</div>`);

    expect(spectator.query('div')).toHaveExactText('true');
  });

  it('should display the template with template syntax', () => {
    spectator = createDirective(`
      <ng-template [ngxLet]="true">
        <div></div>
      </ng-template>
    `);

    expect(spectator.query('div')).toBeTruthy();
  });

  it('should bind the value to a template variable with template syntax', () => {
    spectator = createDirective(`
      <ng-template [ngxLet]="true" let-test>
        <div>{{ test }}</div>
      </ng-template>
    `);

    expect(spectator.query('div')).toHaveExactText('true');
  });
});
