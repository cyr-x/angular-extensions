import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

// tslint:disable: no-non-null-assertion
export class LetContext<T = unknown> {
  public $implicit: T = null!;
  public ngxLet: T = null!;
}
// tslint:enable: no-non-null-assertion

@Directive({
  selector: '[ngxLet]',
})
export class LetDirective<T = unknown> {
  private readonly context = new LetContext();

  constructor(private readonly viewContainer: ViewContainerRef, private readonly templateRef: TemplateRef<LetContext>) {
    this.updateView();
  }

  @Input()
  public set ngxLet(value: T) {
    if (value !== this.context.$implicit) {
      this.updateContext(value);
    }
  }

  /* @internal */
  public static ngTemplateContextGuard<T>(_: LetDirective<T>, ctx: any): ctx is LetContext<NonNullable<T>> {
    return true;
  }

  private updateContext(value: T) {
    this.context.$implicit = this.context.ngxLet = value;
  }

  private updateView() {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef, this.context);
  }
}
