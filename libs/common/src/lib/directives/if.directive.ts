import { Directive, EmbeddedViewRef, Inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { IfValidationFn, NGX_IF_VALIDATION } from '../tokens/if-validation';

// tslint:disable: no-non-null-assertion
export class IfContext<T = unknown> {
  public $implicit: T = null!;
  public ngxIf: T = null!;
}
// tslint:enable: no-non-null-assertion

@Directive({
  selector: '[ngxIf]',
})
export class IfDirective<T = unknown> {
  private thenTemplate: TemplateRef<IfContext<T>> | null = null;
  private elseTemplate: TemplateRef<IfContext<T>> | null = null;
  private thenView: EmbeddedViewRef<IfContext<T>> | null = null;
  private elseView: EmbeddedViewRef<IfContext<T>> | null = null;
  protected readonly context = new IfContext<T>();

  @Input()
  public set ngxIf(value: T) {
    if (value !== this.context.$implicit) {
      this.updateContext(value);
      this.updateView();
    }
  }

  @Input()
  public set ngxIfThen(template: TemplateRef<IfContext<T>>) {
    this.thenTemplate = template;
    this.thenView = null;
    this.updateView();
  }

  @Input()
  public set ngxIfElse(template: TemplateRef<IfContext<T>>) {
    this.elseTemplate = template;
    this.elseView = null;
    this.updateView();
  }

  constructor(
    template: TemplateRef<IfContext<T>>,
    private readonly viewContainer: ViewContainerRef,
    @Inject(NGX_IF_VALIDATION)
    private readonly validationFn: IfValidationFn<T>,
  ) {
    this.thenTemplate = template;
  }

  /* @internal */
  public static ngTemplateContextGuard<T>(_: IfDirective<T>, ctx: any): ctx is IfContext<NonNullable<T>> {
    return true;
  }

  private createView(template: TemplateRef<IfContext<T>> | null) {
    return template ? this.viewContainer.createEmbeddedView(template, this.context) : null;
  }

  private updateContext(value: T) {
    this.context.$implicit = this.context.ngxIf = value;
  }

  private updateView() {
    const condition = this.validationFn(this.context.$implicit);
    if (condition) {
      if (this.thenView === null) {
        this.viewContainer.clear();
        this.elseView = null;
        this.thenView = this.createView(this.thenTemplate);
      }
    } else {
      if (this.elseView === null) {
        this.viewContainer.clear();
        this.thenView = null;
        this.elseView = this.createView(this.elseTemplate);
      }
    }
  }
}
