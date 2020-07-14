import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClickOutsideDirective } from './directives/click-outside.directive';
import { IfDirective } from './directives/if.directive';
import { LetDirective } from './directives/let.directive';

const directives = [ClickOutsideDirective, IfDirective, LetDirective];

@NgModule({
  imports: [CommonModule],
  declarations: [...directives],
  exports: [CommonModule, ...directives],
})
export class NgxCommonModule {}
