// utils/color.ts
export const getDominantColor = async (imageUrl: string): Promise<string> => {
  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = imageUrl;

  await new Promise((resolve) => {
    img.onload = resolve;
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return "#FFFFFF";

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Simple color averaging (you might want a more sophisticated method)
  let r = 0,
    g = 0,
    b = 0;
  for (let i = 0; i < data.length; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
  }

  r = Math.round(r / (data.length / 4));
  g = Math.round(g / (data.length / 4));
  b = Math.round(b / (data.length / 4));

  return `rgb(${r}, ${g}, ${b})`;
};
