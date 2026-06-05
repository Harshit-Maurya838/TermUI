import { describe, it, expect } from 'vitest';
import { RangeInput } from './RangeInput.js';

describe('RangeInput', () => {
  it('constructs with low = 0 and high = 100', () => {
    const r = new RangeInput('Price');

    expect(r.getLow()).toBe(0);
    expect(r.getHigh()).toBe(100);
  });

  it('setLow keeps low <= high', () => {
    const r = new RangeInput('Price');

    r.setHigh(50);
    r.setLow(80);

    expect(r.getLow()).toBeLessThanOrEqual(r.getHigh());
  });

  it('setHigh keeps high >= low', () => {
    const r = new RangeInput('Price');

    r.setLow(80);
    r.setHigh(20);

    expect(r.getHigh()).toBeGreaterThanOrEqual(r.getLow());
  });

  it('setRange updates both values', () => {
    const r = new RangeInput('Price');

    r.setRange(20, 70);

    expect(r.getLow()).toBe(20);
    expect(r.getHigh()).toBe(70);
  });

  it('tab toggles active handle', () => {
    const r = new RangeInput('Price');

    expect((r as any).activeHandle).toBe('low');

    (r as any).handleKey({ key: 'tab' });

    expect((r as any).activeHandle).toBe('high');

    (r as any).handleKey({ key: 'tab' });

    expect((r as any).activeHandle).toBe('low');
  });

  it('ArrowRight moves low handle when active', () => {
    const r = new RangeInput('Price');
  
    (r as any).activeHandle = 'low';
  
    r.handleKey({ key: 'ArrowRight' });
  
    expect(r.getLow()).toBe(1);
  });
  
  it('ArrowLeft moves high handle when active', () => {
    const r = new RangeInput('Price');
  
    (r as any).activeHandle = 'high';
  
    r.handleKey({ key: 'ArrowLeft' });
  
    expect(r.getHigh()).toBe(99);
  });

});
