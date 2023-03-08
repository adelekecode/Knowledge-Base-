const cssColorNames = {
  // Gray colors
  "gray-50": [249, 250, 251],
  "gray-100": [243, 244, 246],
  "gray-200": [229, 231, 235],
  "gray-300": [209, 213, 219],
  "gray-400": [156, 163, 175],
  "gray-500": [107, 114, 128],
  "gray-600": [75, 85, 99],
  "gray-700": [55, 65, 81],
  "gray-800": [31, 41, 55],
  "gray-900": [17, 24, 39],

  // Red colors
  "red-50": [254, 242, 242],
  "red-100": [254, 226, 226],
  "red-200": [254, 202, 202],
  "red-300": [252, 165, 165],
  "red-400": [248, 113, 113],
  "red-500": [239, 68, 68],
  "red-600": [220, 38, 38],
  "red-700": [185, 28, 28],
  "red-800": [153, 27, 27],
  "red-900": [127, 29, 29],

  // Yellow colors
  "yellow-50": [255, 251, 235],
  "yellow-100": [254, 243, 199],
  "yellow-200": [253, 230, 138],
  "yellow-300": [252, 211, 77],
  "yellow-400": [251, 191, 36],
  "yellow-500": [245, 158, 11],
  "yellow-600": [217, 119, 6],
  "yellow-700": [180, 83, 9],
  "yellow-800": [146, 64, 14],
  "yellow-900": [120, 53, 15],

  // Blue colors
  "blue-50": [239, 246, 255],
  "blue-100": [219, 234, 254],
  "blue-200": [191, 219, 254],
  "blue-300": [147, 197, 253],
  "blue-400": [96, 165, 250],
  "blue-500": [59, 130, 246],
  "blue-600": [37, 99, 235],
  "blue-700": [29, 78, 216],
  "blue-800": [30, 64, 175],
  "blue-900": [30, 58, 138],

  // Green colors
  "green-50": [240, 249, 244],
  "green-100": [219, 239, 216],
  "green-200": [180, 220, 171],
  "green-300": [138, 198, 141],
  "green-400": [104, 170, 114],
  "green-500": [69, 146, 90],
  "green-600": [51, 124, 82],

  "green-700": [44, 99, 64],
  "green-800": [24, 83, 43],
  "green-900": [20, 63, 34],

  // Purple colors
  "purple-50": [250, 245, 255],
  "purple-100": [237, 233, 254],
  "purple-200": [221, 214, 254],
  "purple-300": [196, 181, 253],
  "purple-400": [167, 139, 250],
  "purple-500": [139, 92, 246],
  "purple-600": [124, 58, 237],
  "purple-700": [109, 40, 217],
  "purple-800": [91, 33, 182],
  "purple-900": [76, 29, 149],

  // Pink colors
  "pink-50": [253, 242, 248],
  "pink-100": [252, 231, 243],
  "pink-200": [251, 207, 232],
  "pink-300": [249, 168, 212],
  "pink-400": [244, 114, 182],
  "pink-500": [236, 72, 153],
  "pink-600": [219, 39, 119],
  "pink-700": [190, 24, 93],
  "pink-800": [157, 23, 77],
  "pink-900": [131, 24, 67],
};

function hexToRgb(hex) {
  // Remove the hash sign from the beginning of the hex code, if present
  hex = hex.replace(/^#/, "");

  // Split the hex code into red, green, and blue components
  const red = parseInt(hex.substring(0, 2), 16);
  const green = parseInt(hex.substring(2, 4), 16);
  const blue = parseInt(hex.substring(4, 6), 16);

  // Return the RGB values as an array
  return [red, green, blue];
}

// Helper function to check if two arrays are equal
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

export function getColorName(hex) {
  const rgb = hexToRgb(hex);

  for (const colorName in cssColorNames) {
    const colorValues = cssColorNames[colorName];
    if (arraysEqual(rgb, colorValues)) {
      return colorName;
    }
  }

  return null;
}

export function replaceCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}
