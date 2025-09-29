// Enhanced polyfill for crypto.randomUUID with better browser compatibility
(function() {
  // Function to generate UUID v4
  function generateUUID(): string {
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      // Use crypto.getRandomValues for better randomness
      const array = new Uint8Array(16);
      crypto.getRandomValues(array);
      
      // Set version (4) and variant bits
      array[6] = (array[6] & 0x0f) | 0x40; // Version 4
      array[8] = (array[8] & 0x3f) | 0x80; // Variant 10
      
      const hex = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
      return [
        hex.slice(0, 8),
        hex.slice(8, 12),
        hex.slice(12, 16),
        hex.slice(16, 20),
        hex.slice(20, 32)
      ].join('-');
    } else {
      // Fallback to Math.random
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
  }

  // Polyfill for crypto.randomUUID if not available
  if (typeof crypto !== 'undefined' && !crypto.randomUUID) {
    try {
      Object.defineProperty(crypto, 'randomUUID', {
        value: generateUUID,
        writable: false,
        configurable: true
      });
    } catch (e) {
      // Fallback if Object.defineProperty fails
      (crypto as any).randomUUID = generateUUID;
    }
  }

  // Polyfill for global crypto if not available
  if (typeof globalThis !== 'undefined' && !globalThis.crypto) {
    try {
      Object.defineProperty(globalThis, 'crypto', {
        value: {
          randomUUID: generateUUID,
          getRandomValues: function(array: any) {
            if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
              return crypto.getRandomValues(array);
            }
            // Fallback implementation
            for (let i = 0; i < array.length; i++) {
              array[i] = Math.floor(Math.random() * 256);
            }
            return array;
          }
        },
        writable: false,
        configurable: true
      });
    } catch (e) {
      // Fallback if Object.defineProperty fails
      (globalThis as any).crypto = {
        randomUUID: generateUUID,
        getRandomValues: function(array: any) {
          for (let i = 0; i < array.length; i++) {
            array[i] = Math.floor(Math.random() * 256);
          }
          return array;
        }
      };
    }
  }

  // Additional polyfill for window.crypto
  if (typeof window !== 'undefined' && !window.crypto) {
    try {
      Object.defineProperty(window, 'crypto', {
        value: {
          randomUUID: generateUUID,
          getRandomValues: function(array: any) {
            for (let i = 0; i < array.length; i++) {
              array[i] = Math.floor(Math.random() * 256);
            }
            return array;
          }
        },
        writable: false,
        configurable: true
      });
    } catch (e) {
      (window as any).crypto = {
        randomUUID: generateUUID,
        getRandomValues: function(array: any) {
          for (let i = 0; i < array.length; i++) {
            array[i] = Math.floor(Math.random() * 256);
          }
          return array;
        }
      };
    }
  }
})();
