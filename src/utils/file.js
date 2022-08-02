export const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
})

export const validImageTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
]

export const validVideoTypes = [
  'video/mp4',
  'video/webm',
  'video/ogg',
]