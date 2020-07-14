import 'zone.js/dist/async-test';

import { fakeAsync } from '@angular/core/testing';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';

import { ClickOutsideDirective } from './click-outside.directive';

describe(ClickOutsideDirective.name, () => {
  let spectator: SpectatorDirective<ClickOutsideDirective>;

  const createDirective = createDirectiveFactory(ClickOutsideDirective);

  function setup(isActive = true) {
    spectator = createDirective(
      '<div ngxClickOutside [ngxClickOutsideActive]="isActive"><p id="child"></p></div><p id="sibling"></p>',
      {
        hostProps: {
          isActive,
        },
      },
    );
  }

  it('should create an instance', () => {
    setup();
    expect(spectator.directive).toBeTruthy();
    expect(spectator.directive.ngxClickOutsideActive).toBeTruthy();
  });

  it('should not emit click event if clicked inside', fakeAsync(() => {
    setup();
    let result = false;
    spectator.output('ngxClickOutside').subscribe(() => (result = true));

    spectator.tick();
    spectator.click('#child');

    expect(result).toBeFalsy();
  }));

  it('should emit click event if clicked outside', fakeAsync(() => {
    setup();
    let result = false;
    spectator.output('ngxClickOutside').subscribe(() => (result = true));

    spectator.tick();
    spectator.click('#sibling');

    expect(result).toBeTruthy();
  }));

  it('should not emit click event when disabled and clicked outside', fakeAsync(() => {
    setup();
    let result = false;
    spectator.output('ngxClickOutside').subscribe(() => (result = true));

    spectator.fixture.componentInstance.isActive = false;
    spectator.tick();
    spectator.click('#sibling');

    expect(result).toBeFalsy();
  }));

  it('should emit click event when reenabled and clicked outside', fakeAsync(() => {
    setup(false);
    let result = false;
    spectator.output('ngxClickOutside').subscribe(() => (result = true));

    spectator.fixture.componentInstance.isActive = true;
    spectator.detectChanges();
    spectator.tick();
    spectator.click('#sibling');

    expect(result).toBeTruthy();
  }));
});
