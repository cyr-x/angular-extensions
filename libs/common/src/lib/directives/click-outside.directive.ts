import {
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

import { ClickOutsideConfig, NGX_CLICK_OUTSIDE_CONFIG } from '../tokens/click-outside';

@Directive({
  selector: '[ngxClickOutside]',
})
export class ClickOutsideDirective implements OnInit, OnChanges, OnDestroy {
  private readonly listeners: Record<string, () => void> = {};

  @Input()
  public ngxClickOutsideActive: boolean;

  @Output()
  public readonly ngxClickOutside = new EventEmitter<Event>();

  constructor(
    @Inject(NGX_CLICK_OUTSIDE_CONFIG)
    private readonly config: ClickOutsideConfig,
    private readonly element: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
    private readonly zone: NgZone,
  ) {
    this.ngxClickOutsideActive = true;
  }

  ngOnInit() {
    if (this.ngxClickOutsideActive) {
      this.registerHandlers();
    }
  }

  ngOnChanges({ ngxClickOutsideActive: isActive }: SimpleChanges) {
    if (!isActive?.firstChange && isActive?.previousValue !== isActive?.currentValue) {
      if (isActive?.currentValue) {
        this.registerHandlers();
      } else {
        this.destroy();
      }
    }
  }

  ngOnDestroy() {
    this.destroy();
  }

  private destroy() {
    for (const eventName in this.listeners) {
      if (this.listeners.hasOwnProperty(eventName)) {
        this.listeners[eventName]();
        delete this.listeners[eventName];
      }
    }
  }

  private registerHandlers() {
    for (const eventName of this.config.events) {
      if (this.listeners[eventName] === undefined) {
        this.zone.runOutsideAngular(() => {
          setTimeout(() => {
            this.listeners[eventName] = this.registerHandler(eventName);
          }, 0);
        });
      }
    }
  }

  private registerHandler(name: string) {
    return this.renderer.listen('document', name, (event) => {
      if (this.element.nativeElement?.contains(event.target) === false) {
        this.zone.run(() => this.ngxClickOutside.emit(event));
      }
    });
  }
}
