import type { AxiosResponse } from "axios";

export function downloadBlobResponse(
  response: AxiosResponse<Blob>,
  fallbackFileName: string
): void {
  const blob = response.data;
  const disposition = response.headers["content-disposition"];
  let fileName = fallbackFileName;

  if (disposition) {
    const match = disposition.match(/filename="?([^"]+)"?/i);
    if (match && match[1]) {
      fileName = decodeURIComponent(match[1]);
    }
  }

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

export async function readBlobError(blob: Blob): Promise<string> {
  const text = await blob.text();
  try {
    const parsed = JSON.parse(text);
    return parsed?.Message || parsed?.message || "Si è verificato un errore durante l'esportazione.";
  } catch {
    return text || "Si è verificato un errore durante l'esportazione.";
  }
}

