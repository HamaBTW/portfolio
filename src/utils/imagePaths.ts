/**
 * Utility function to resolve image paths for both local development and GitHub Pages deployment
 * @param imagePath - The relative image path (e.g., 'images/portfolio/ma.png')
 * @returns The resolved path with PUBLIC_URL prefix when needed
 */
export const getImagePath = (imagePath: string): string => {
  // If the path already starts with http/https, return as is (external URLs)
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If the path starts with a slash, remove it to make it relative
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // Return the path with PUBLIC_URL prefix
  return `${process.env.PUBLIC_URL}/${cleanPath}`;
};

/**
 * Utility function specifically for skill icons that might be FontAwesome or image paths
 * @param skill - The skill object with imageType and image properties
 * @returns The resolved image path or the original FontAwesome class
 */
export const getSkillImagePath = (skill: { imageType?: string; image?: string }): string => {
  if (!skill.image) {
    return '';
  }
  
  // If it's a FontAwesome icon, return as is
  if (skill.imageType === 'fontawesome') {
    return skill.image;
  }
  
  // If it's a path or link type, resolve the path
  if (skill.imageType === 'path' || skill.imageType === 'link') {
    return getImagePath(skill.image);
  }
  
  // Default case
  return skill.image;
};
