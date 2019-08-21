/**
 * Check if we have SSR cache and if we do - remove it
 * @returns {null|boolean}
 */
export function hasSsrData() {
  if (window.ssrContext && window.ssrContext.fetchedData) {
    delete window.ssrContext.fetchedData;
    return true;
  } else {
    return false;
  }
}

/**
 * Get data from the SSR cache using the key. Return default value if cache is not present.
 * @param key
 * @param defaultValue
 * @param context
 * @returns {*}
 */
export function getSsrData(key, defaultValue, context) {
  if (context.fetchedData)
    return context.fetchedData[key];

  if (window.ssrContext && window.ssrContext.fetchedData)
    return window.ssrContext.fetchedData[key];

  return defaultValue;
}

