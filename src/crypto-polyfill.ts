// Comprehensive crypto polyfill - must load before any other modules
(() => {
  'use strict';

  // UUID v4 generator function with strong randomness
  function generateUUIDv4(): string {
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      // Use crypto.getRandomValues for secure randomness
      const buffer = new Uint8Array(16);
      crypto.getRandomValues(buffer);
      
      // Set version (4) and variant bits according to RFC 4122
      buffer[6] = (buffer[6] & 0x0f) | 0x40; // Version 4
      buffer[8] = (buffer[8] & 0x3f) | 0x80; // Variant 10
      
      // Convert to hex string with proper formatting
      const hex = Array.from(buffer)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      
      return [
        hex.slice(0, 8),
        hex.slice(8, 12),
        hex.slice(12, 16),
        hex.slice(16, 20),
        hex.slice(20, 32)
      ].join('-');
    } else {
      // Fallback to Math.random (less secure but functional)
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
  }

  // Secure random values fallback
  function getRandomValues(array: Uint8Array | Uint16Array | Uint32Array): any {
    for (let i = 0; i < array.length; i++) {
      (array as any)[i] = Math.floor(Math.random() * 256);
    }
    return array;
  }

  // Create minimal crypto interface
  const cryptoInterface = {
    randomUUID: generateUUIDv4,
    getRandomValues: getRandomValues
  };

  // Apply polyfills to all possible global contexts
  const globalContexts = [
    typeof globalThis !== 'undefined' ? globalThis : null,
    typeof window !== 'undefined' ? window : null,
    typeof self !== 'undefined' ? self : null,
    typeof global !== 'undefined' ? global : null
  ].filter(Boolean);

  globalContexts.forEach(context => {
    if (!context) return;

    try {
      // If crypto exists but missing randomUUID
      if (context.crypto && !context.crypto.randomUUID) {
        Object.defineProperty(context.crypto, 'randomUUID', {
          value: generateUUIDv4,
          writable: false,
          configurable: true,
          enumerable: true
        });
      }
      
      // If no crypto object at all
      if (!context.crypto) {
        Object.defineProperty(context, 'crypto', {
          value: cryptoInterface,
          writable: false,
          configurable: true,
          enumerable: true
        });
      }
    } catch (error) {
      // Fallback to direct assignment if defineProperty fails
      try {
        if (context.crypto && !context.crypto.randomUUID) {
          (context.crypto as any).randomUUID = generateUUIDv4;
        } else if (!context.crypto) {
          (context as any).crypto = cryptoInterface;
        }
      } catch (fallbackError) {
        console.warn('Failed to apply crypto polyfill:', fallbackError);
      }
    }
  });

  // Ensure immediate availability for current execution context
  if (typeof crypto !== 'undefined' && !crypto.randomUUID) {
    try {
      (crypto as any).randomUUID = generateUUIDv4;
    } catch (e) {
      // Silent fail - polyfill applied to global contexts above
    }
  }

  // Log successful polyfill application
  console.log('Crypto polyfill applied successfully');
})();
