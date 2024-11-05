declare module 'web-vitals' {
    export function onCLS(callback: (metric: { name: string; value: number }) => void): void;
    export function onFID(callback: (metric: { name: string; value: number }) => void): void;
    export function onFCP(callback: (metric: { name: string; value: number }) => void): void;
    export function onLCP(callback: (metric: { name: string; value: number }) => void): void;
    export function onTTFB(callback: (metric: { name: string; value: number }) => void): void;
  }
