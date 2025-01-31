/*
 * Copyright (c) 2016-2022 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ReactiveController, ReactiveElement } from 'lit';

/**
 * Provides all nessesary aria-* attributes to create a vaild aria popup trigger.
 * Used in combination of the `@ariaPopup` controller.
 */
export function ariaPopupTrigger<T extends ReactiveElement>(): ClassDecorator {
  return (target: any) => target.addInitializer((instance: T) => new AriaPopupTriggerController(instance));
}

export class AriaPopupTriggerController<T extends ReactiveElement> implements ReactiveController {
  constructor(private host: T) {
    this.host.addController(this);
  }

  hostConnected() {
    if (this.host.hasAttribute('aria-controls') || this.host.ariaControls) {
      this.host.ariaHasPopup = 'true';
      this.host.ariaExpanded = 'false';
    }
  }
}
