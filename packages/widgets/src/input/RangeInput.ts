import { Widget } from '../base/Widget.js';
import type { Style, Color } from '@termuijs/core';

export interface RangeInputOptions {
  min?: number;
  max?: number;
  step?: number;
  color?: Color;
  showValue?: boolean;
}

export class RangeInput extends Widget {
  private label: string;
  private min: number;
  private max: number;
  private step: number;
  private activeHandle: 'low' | 'high';

  private low: number;
  private high: number;

  handleKey(event: { key: string }): void {
    if (event.key === 'tab') {
      this.activeHandle =
        this.activeHandle === 'low' ? 'high' : 'low';
      return;
    }
  
    if (this.activeHandle === 'low') {
      if (event.key === 'ArrowRight') {
        this.setLow(this.low + this.step);
      }
  
      if (event.key === 'ArrowLeft') {
        this.setLow(this.low - this.step);
      }
    }
  
    if (this.activeHandle === 'high') {
      if (event.key === 'ArrowRight') {
        this.setHigh(this.high + this.step);
      }
  
      if (event.key === 'ArrowLeft') {
        this.setHigh(this.high - this.step);
      }
    }
  }

  constructor(
    label: string,
    style: Partial<Style> = {},
    opts: RangeInputOptions = {}
  ) {
    super(style);
  
    this.label = label;
  
    this.min = opts.min ?? 0;
    this.max = opts.max ?? 100;
    this.step = opts.step ?? 1;
  
    this.low = this.min;
    this.high = this.max;
  
    this.activeHandle = 'low';
  }
  
  getLow(): number {
    return this.low;
  }
  
  getHigh(): number {
    return this.high;
  }
  
  setLow(value: number): void {
    this.low = Math.max(
      this.min,
      Math.min(value, this.high)
    );
  }
  
  setHigh(value: number): void {
    this.high = Math.min(
      this.max,
      Math.max(value, this.low)
    );
  }
  
  setRange(low: number, high: number): void {
    this.low = Math.min(low, high);
    this.high = Math.max(low, high);
  }
}