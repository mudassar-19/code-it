"use client";

import { useId, useRef, useState } from "react";
import { ImagePlus, Loader2, UploadCloud, X } from "lucide-react";

const ACCEPT = "image/jpeg,image/png,image/webp";

type InFlight = { id: string; name: string; progress: number; error?: string };

// Uploads one file to the admin upload API with real progress via XHR
// (fetch() can't report upload progress). Resolves to the Cloudinary URL.
function uploadFile(
  file: File,
  onProgress: (pct: number) => void,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/admin/upload");
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };
    xhr.onload = () => {
      let body: { url?: string; error?: string } | null = null;
      try {
        body = JSON.parse(xhr.responseText);
      } catch {
        body = null;
      }
      if (xhr.status >= 200 && xhr.status < 300 && body?.url) {
        resolve(body.url);
      } else {
        reject(new Error(body?.error ?? "Upload failed."));
      }
    };
    xhr.onerror = () => reject(new Error("Network error during upload."));
    const form = new FormData();
    form.append("file", file);
    xhr.send(form);
  });
}

/**
 * Drag-and-drop / click-to-upload image field. Works in single mode (cover
 * image — one URL, replaced on each upload) or multiple mode (gallery). URLs
 * are Cloudinary secure URLs returned by /api/admin/upload.
 */
export default function ImageUploader({
  label,
  urls,
  onUrlsChange,
  multiple = false,
  hint,
}: {
  label: string;
  urls: string[];
  onUrlsChange: (urls: string[]) => void;
  multiple?: boolean;
  hint?: string;
}) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [inFlight, setInFlight] = useState<InFlight[]>([]);
  const [dragActive, setDragActive] = useState(false);

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const files = multiple ? Array.from(fileList) : [fileList[0]];

    for (const file of files) {
      const id = `${file.name}-${Date.now()}-${Math.random()}`;
      setInFlight((prev) => [...prev, { id, name: file.name, progress: 0 }]);
      try {
        const url = await uploadFile(file, (pct) => {
          setInFlight((prev) =>
            prev.map((item) =>
              item.id === id ? { ...item, progress: pct } : item,
            ),
          );
        });
        // Commit the URL: replace in single mode, append in multiple mode.
        onUrlsChange(multiple ? [...urls, url] : [url]);
        setInFlight((prev) => prev.filter((item) => item.id !== id));
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Upload failed.";
        setInFlight((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, error: message } : item,
          ),
        );
      }
    }

    if (inputRef.current) inputRef.current.value = "";
  }

  function removeUrl(url: string) {
    onUrlsChange(urls.filter((existing) => existing !== url));
  }

  function dismissError(id: string) {
    setInFlight((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-medium text-navy">{label}</span>

      {/* Existing / committed images */}
      {urls.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {urls.map((url) => (
            <div
              key={url}
              className="group relative h-24 w-24 overflow-hidden rounded-xl border border-light-teal bg-mist"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt=""
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeUrl(url)}
                title="Remove"
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-navy-deep/70 text-white opacity-0 transition-opacity duration-250 group-hover:opacity-100"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* In-flight uploads + errors */}
      {inFlight.map((item) =>
        item.error ? (
          <div
            key={item.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-error/30 bg-error/10 px-3 py-2 text-sm text-error"
          >
            <span className="truncate">
              {item.name}: {item.error}
            </span>
            <button
              type="button"
              onClick={() => dismissError(item.id)}
              className="shrink-0 rounded p-1 hover:bg-error/10"
              title="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div
            key={item.id}
            className="rounded-xl border border-light-teal bg-card px-3 py-2"
          >
            <div className="flex items-center gap-2 text-sm text-navy">
              <Loader2 className="h-4 w-4 animate-spin text-primary-blue" />
              <span className="truncate">{item.name}</span>
              <span className="ml-auto text-text-muted">{item.progress}%</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-light-teal">
              <div
                className="h-full rounded-full bg-brand-gradient transition-[width] duration-200"
                style={{ width: `${item.progress}%` }}
              />
            </div>
          </div>
        ),
      )}

      {/* Dropzone — hidden when a single image is already set */}
      {(multiple || urls.length === 0) && (
        <label
          htmlFor={inputId}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            handleFiles(e.dataTransfer.files);
          }}
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors duration-250 ${
            dragActive
              ? "border-primary-blue bg-soft-blue"
              : "border-light-teal bg-mist hover:border-primary-blue/60 hover:bg-soft-blue"
          }`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-light-teal text-primary-blue">
            {multiple ? (
              <ImagePlus className="h-5 w-5" strokeWidth={2} />
            ) : (
              <UploadCloud className="h-5 w-5" strokeWidth={2} />
            )}
          </span>
          <span className="text-sm font-medium text-navy">
            Drag &amp; drop or click to upload
          </span>
          <span className="text-xs text-text-muted">
            {hint ?? "JPG, PNG or WebP · up to 5MB"}
          </span>
          <input
            id={inputId}
            ref={inputRef}
            type="file"
            accept={ACCEPT}
            multiple={multiple}
            className="sr-only"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>
      )}
    </div>
  );
}
