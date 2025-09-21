// Currency conversion utilities for CCT to INR and USDT
export const CurrencyUtils = {
  /**
   * Convert CCT (Carbon Credit Tokens) to INR
   * @param value - String containing CCT value (e.g., "1200 CCTs" or "1200")
   * @returns Formatted INR value
   */
  getINR: (value: string): string => {
    const cctValue = parseFloat(value.replace(/[^\d.]/g, '')) || 0;
    return (cctValue * 10).toFixed(2); // Example: 1 CCT = 10 INR
  },

  /**
   * Convert CCT (Carbon Credit Tokens) to USDT
   * @param value - String containing CCT value (e.g., "1200 CCTs" or "1200")
   * @returns Formatted USDT value
   */
  getUSDT: (value: string): string => {
    const cctValue = parseFloat(value.replace(/[^\d.]/g, '')) || 0;
    return (cctValue * 0.12).toFixed(2); // Example: 1 CCT = 0.12 USDT
  },

  /**
   * Check if a value contains CCT or earnings-related keywords
   * @param value - String to check
   * @param title - Optional title to check for earnings keywords
   * @returns Boolean indicating if conversion should be shown
   */
  shouldShowConversion: (value: string, title?: string): boolean => {
    const valueHasCCT = /\d+\s*CCTs?/i.test(value);
    const titleHasEarnings = title && /earning|revenue|income|money/i.test(title);
    return valueHasCCT || !!titleHasEarnings;
  },

  /**
   * Get formatted currency conversion string
   * @param value - String containing the original value
   * @param title - Optional title for context
   * @returns Formatted string with INR and USDT or null
   */
  getConversionString: (value: string, title?: string): string | null => {
    if (!CurrencyUtils.shouldShowConversion(value, title)) {
      return null;
    }

    const inr = CurrencyUtils.getINR(value);
    const usdt = CurrencyUtils.getUSDT(value);
    return `₹${inr} | ${usdt} USDT`;
  },

  /**
   * Get conversion style object for consistent styling
   */
  getConversionStyle: () => ({
    display: 'block' as const,
    fontSize: '0.8em',
    color: '#166534',
    marginTop: '0.25rem',
    fontWeight: 'normal' as const
  })
};
