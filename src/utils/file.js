export const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
})

export const validFileTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'video/mp4',
  'video/webm',
  'video/ogg',
]