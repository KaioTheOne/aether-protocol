const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];
const MAX_INPUT_BYTES = 15 * 1024 * 1024;

export function validateImage(file: File): string | null {
  if (!ACCEPTED.includes(file.type)) return "Formato não suportado. Envie JPG, PNG ou WebP.";
  if (file.size > MAX_INPUT_BYTES) return "Arquivo acima de 15 MB. Escolha uma foto menor.";
  return null;
}

// Redimensiona e reencoda no cliente. O reencode remove EXIF/GPS e aplica a orientação.
export async function compressImage(file: File, maxSide = 1600, quality = 0.8): Promise<Blob> {
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Seu navegador não conseguiu processar a imagem.");
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Falha ao comprimir a imagem."))),
      "image/webp",
      quality,
    ),
  );
}
