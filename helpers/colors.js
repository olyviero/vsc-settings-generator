/**
 * Removes leading # and any surrounding spaces from a HEX color string.
 * @param {string} hash - The HEX color string, potentially with leading # and spaces.
 * @returns {string} - Cleaned HEX color string without # and spaces.
 */
function removeSpaceAndHash(hash) {
  return hash.replace(/^\s*#|\s*$/g, '')
}

function expandShortHex(color) {
  /**
   * Expands a short HEX color (e.g., "E0F") to a full HEX color (e.g., "EE00FF").
   * @param {string} color - The HEX color string (3 or 6 characters).
   * @returns {string} - The expanded 6-character HEX color string.
   */
  if (color.length === 3) {
    return color.replace(/(.)/g, '$1$1')
  }
  return color
}

/**
 * Adjusts the brightness of a HEX color by a given percentage.
 * @param {string} color - The HEX color string.
 * @param {number} percent - The percentage to adjust brightness (positive to lighten, negative to darken).
 * @returns {string} - The adjusted HEX color string.
 */
export function adjustColor(color, percent) {
  color = removeSpaceAndHash(color)
  color = expandShortHex(color)

  // Convert HEX => RGB
  let r = parseInt(color.substring(0, 2), 16)
  let g = parseInt(color.substring(2, 4), 16)
  let b = parseInt(color.substring(4, 6), 16)

  // Edit luminosity
  r = Math.min(255, Math.max(0, Math.floor(r * (1 + percent / 100))))
  g = Math.min(255, Math.max(0, Math.floor(g * (1 + percent / 100))))
  b = Math.min(255, Math.max(0, Math.floor(b * (1 + percent / 100))))

  // Convert RGB => HEX
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

/**
 * Desaturates a HEX color by blending it towards gray.
 * @param {string} color - The HEX color string.
 * @param {number} factor - The desaturation factor (0 = full gray, 1 = original color).
 * @returns {string} - The desaturated HEX color string.
 */
export function desaturateColor(color, factor) {
  color = removeSpaceAndHash(color)
  color = expandShortHex(color)

  let r = parseInt(color.substring(0, 2), 16)
  let g = parseInt(color.substring(2, 4), 16)
  let b = parseInt(color.substring(4, 6), 16)

  let avg = (r + g + b) / 3 // Neutral gray value

  r = Math.round(r * factor + avg * (1 - factor))
  g = Math.round(g * factor + avg * (1 - factor))
  b = Math.round(b * factor + avg * (1 - factor))

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

/**
 * Returns black (#000000) or white (#FFFFFF) for optimal contrast with the given background color.
 * @param {string} color - The background HEX color string.
 * @returns {string} - The contrast color HEX string (either #000000 or #FFFFFF).
 */
export function getContrastColor(color) {
  color = removeSpaceAndHash(color)
  color = expandShortHex(color)

  // Extract RGB
  let r = parseInt(color.substring(0, 2), 16)
  let g = parseInt(color.substring(2, 4), 16)
  let b = parseInt(color.substring(4, 6), 16)

  // Calculate relative luminance(W3C formula)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  return luminance > 0.5 ? '#000000' : '#FFFFFF'
}
