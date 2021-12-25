export const checkThumbnail = (selectedThumbnail) => {
  if (!selectedThumbnail) {
    return 'Please select a thumbnail!';
  }

  if (!selectedThumbnail.type.includes('image')) {
    return 'Please select an image!';
  }

  if (selectedThumbnail.size > 1000000) {
    return 'Image size must be less than 1MB!';
  }

  return null;
};
