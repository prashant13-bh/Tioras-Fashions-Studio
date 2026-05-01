"use client";

import { useState, useRef } from "react";
import { Upload, X, FileImage, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "image/webp",
  "application/pdf",
];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export default function FileUploader({ onFileSelect, onClear }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [customizationType, setCustomizationType] = useState("print");
  const [notes, setNotes] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      toast.error("Please upload JPG, PNG, SVG, WebP, or PDF files only.");
      return;
    }

    if (selectedFile.size > MAX_SIZE) {
      toast.error("File size must be under 10MB.");
      return;
    }

    setFile(selectedFile);

    // Create preview for images
    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }

    onFileSelect?.({
      file: selectedFile,
      type: customizationType,
      notes,
    });

    toast.success("Design uploaded successfully!");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleClear = () => {
    setFile(null);
    setPreview(null);
    setNotes("");
    if (inputRef.current) inputRef.current.value = "";
    onClear?.();
  };

  const handleTypeChange = (type) => {
    setCustomizationType(type);
    if (file) {
      onFileSelect?.({ file, type, notes });
    }
  };

  const handleNotesChange = (value) => {
    setNotes(value);
    if (file) {
      onFileSelect?.({ file, type: customizationType, notes: value });
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-foreground font-heading flex items-center gap-2">
        <Upload className="w-5 h-5 text-primary" />
        Upload Your Design
      </h3>

      {!file ? (
        /* Drop Zone */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
            dragOver
              ? "border-primary bg-primary/5 scale-[1.02]"
              : "border-border/60 hover:border-primary/50 hover:bg-muted/30"
          }`}
        >
          <FileImage className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
          <p className="text-sm font-semibold text-foreground mb-1">
            Drag & drop your design here
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            or click to browse (JPG, PNG, SVG, PDF — max 10MB)
          </p>
          <Button
            type="button"
            variant="outline"
            className="rounded-xl"
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.click();
            }}
          >
            Choose File
          </Button>
          <input
            ref={inputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.svg,.webp,.pdf"
            onChange={(e) => handleFile(e.target.files[0])}
            className="hidden"
          />
        </div>
      ) : (
        /* File Preview */
        <div className="border border-border/50 rounded-2xl p-4 bg-muted/20">
          <div className="flex items-start gap-4">
            {preview ? (
              <img
                src={preview}
                alt="Design preview"
                className="w-20 h-20 object-contain rounded-xl border border-border/50 bg-white"
              />
            ) : (
              <div className="w-20 h-20 rounded-xl border border-border/50 bg-muted flex items-center justify-center">
                <FileImage className="w-8 h-8 text-muted-foreground" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <p className="text-sm font-bold text-foreground truncate">
                  {file.name}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                {(file.size / 1024).toFixed(0)} KB •{" "}
                {file.type.split("/")[1]?.toUpperCase()}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="shrink-0 touch-target text-muted-foreground hover:text-destructive"
              aria-label="Remove file"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}

      {/* Customization Type */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold">Customization Type</Label>
        <div className="flex gap-3">
          {[
            { value: "print", label: "🖨️ Print", desc: "DTG / Screen Print" },
            { value: "embroidery", label: "🧵 Embroidery", desc: "Thread Stitch" },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleTypeChange(opt.value)}
              className={`flex-1 p-3 rounded-xl border-2 text-left transition-all ${
                customizationType === opt.value
                  ? "border-primary bg-primary/5"
                  : "border-border/50 hover:border-primary/30"
              }`}
            >
              <span className="text-sm font-bold block">{opt.label}</span>
              <span className="text-xs text-muted-foreground">{opt.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="design-notes" className="text-sm font-semibold">
          Placement Notes (optional)
        </Label>
        <Input
          id="design-notes"
          value={notes}
          onChange={(e) => handleNotesChange(e.target.value)}
          placeholder='e.g. "Logo on left chest, 3 inches wide"'
          className="bg-background rounded-xl"
        />
      </div>
    </div>
  );
}
