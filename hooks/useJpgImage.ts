/** 
 * DEPRECATED: This hook previously attempted to convert PNGs to JPEGs using canvas.
 * It has been disabled to ensure maximum compatibility with remote assets 
 * that may not have CORS headers configured.
 */
export const useJpgImage = (url?: string, assetId?: string) => {
  return url;
};