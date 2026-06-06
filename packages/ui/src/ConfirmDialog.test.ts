import { describe, it, expect, vi } from 'vitest';
import { Buffer } from 'node:buffer';
import { type KeyEvent } from '@termuijs/core';
import { ConfirmDialog } from './ConfirmDialog.js';

function makeKey(key: string): KeyEvent {
    return {
        key,
        ctrl: false,
        shift: false,
        alt: false,
        raw: Buffer.from(key),
        stopPropagation: () => {},
        preventDefault: () => {},
    };
}

describe('ConfirmDialog', () => {
    it('Escape invokes cancel callback when visible', () => {
        const onCancel = vi.fn();
        const onConfirm = vi.fn();
        const dialog = new ConfirmDialog({ message: 'Continue?', onCancel, onConfirm });
        dialog.show();

        dialog.handleKey(makeKey('escape'));

        expect(onCancel).toHaveBeenCalled();
        expect(onConfirm).not.toHaveBeenCalled();
        expect(dialog.visible).toBe(false);
    });

    it('Escape does nothing when hidden', () => {
        const onCancel = vi.fn();
        const dialog = new ConfirmDialog({ message: 'Continue?', onCancel });

        dialog.handleKey(makeKey('escape'));

        expect(onCancel).not.toHaveBeenCalled();
        expect(dialog.visible).toBe(false);
    });
});
