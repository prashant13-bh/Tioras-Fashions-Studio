"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { 
  ZoomIn, ZoomOut, RotateCcw, RotateCw, Maximize2, 
  Layers, Trash2, MoveUp, MoveDown, Undo2, Redo2, 
  Type, Image as ImageIcon, Save, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function DesignCanvas({ 
  clothType = "t-shirt", 
  clothColor = "#ffffff", 
  view = "front",
  onSave
}) {
  const canvasRef = useRef(null);
  const [layers, setLayers] = useState([]);
  const [selectedLayerId, setSelectedLayerId] = useState(null);
  const [history, setHistory] = useState([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(100);

  const CANVAS_WIDTH = 500;
  const CANVAS_HEIGHT = 600;

  // Add a new layer
  const addLayer = (type, data) => {
    const newLayer = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
      scale: 1,
      rotation: 0,
      opacity: 1,
      visible: true,
      ...data
    };
    const newLayers = [...layers, newLayer];
    updateLayers(newLayers);
    setSelectedLayerId(newLayer.id);
  };

  const updateLayers = (newLayers) => {
    setLayers(newLayers);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(newLayers)));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setLayers(JSON.parse(JSON.stringify(history[historyIndex - 1])));
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setLayers(JSON.parse(JSON.stringify(history[historyIndex + 1])));
    }
  };

  const removeLayer = (id) => {
    updateLayers(layers.filter(l => l.id !== id));
    if (selectedLayerId === id) setSelectedLayerId(null);
  };

  const moveLayer = (id, direction) => {
    const index = layers.findIndex(l => l.id === id);
    if (index === -1) return;
    const newLayers = [...layers];
    const targetIndex = direction === "up" ? index + 1 : index - 1;
    if (targetIndex >= 0 && targetIndex < layers.length) {
      [newLayers[index], newLayers[targetIndex]] = [newLayers[targetIndex], newLayers[index]];
      updateLayers(newLayers);
    }
  };

  // Rendering
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw Background
    ctx.fillStyle = clothColor;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw Layers
    layers.forEach(layer => {
      if (!layer.visible) return;
      ctx.save();
      ctx.translate(layer.x, layer.y);
      ctx.rotate((layer.rotation * Math.PI) / 180);
      ctx.scale(layer.scale, layer.scale);
      ctx.globalAlpha = layer.opacity;

      if (layer.type === "text") {
        ctx.fillStyle = layer.color || "#000000";
        ctx.font = `${layer.fontWeight || "bold"} ${layer.fontSize || 30}px ${layer.fontFamily || "Arial"}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(layer.text, 0, 0);
      } else if (layer.type === "image") {
        const img = layer.imageElement;
        if (img) {
          const w = img.width;
          const h = img.height;
          const aspect = w / h;
          const targetW = 200;
          const targetH = targetW / aspect;
          ctx.drawImage(img, -targetW / 2, -targetH / 2, targetW, targetH);
        }
      }

      // Draw Selection Box
      if (layer.id === selectedLayerId) {
        ctx.strokeStyle = "#D4AF37";
        ctx.lineWidth = 2 / layer.scale;
        ctx.setLineDash([5, 5]);
        if (layer.type === "text") {
           const metrics = ctx.measureText(layer.text);
           const w = metrics.width + 20;
           const h = (layer.fontSize || 30) + 10;
           ctx.strokeRect(-w / 2, -h / 2, w, h);
        } else {
           ctx.strokeRect(-110, -110, 220, 220);
        }
      }

      ctx.restore();
    });
  }, [layers, selectedLayerId, clothColor]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  // Event Handlers
  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (CANVAS_WIDTH / rect.width);
    const y = (e.clientY - rect.top) * (CANVAS_HEIGHT / rect.height);

    // Hit testing (reverse order for top layer first)
    const hit = [...layers].reverse().find(layer => {
      // Simplified hit test: 100px radius
      const dist = Math.sqrt((layer.x - x)**2 + (layer.y - y)**2);
      return dist < 50 * layer.scale;
    });

    if (hit) {
      setSelectedLayerId(hit.id);
      setIsDragging(true);
      setDragOffset({ x: hit.x - x, y: hit.y - y });
    } else {
      setSelectedLayerId(null);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !selectedLayerId) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (CANVAS_WIDTH / rect.width);
    const y = (e.clientY - rect.top) * (CANVAS_HEIGHT / rect.height);

    const newLayers = layers.map(l => {
      if (l.id === selectedLayerId) {
        return { ...l, x: x + dragOffset.x, y: y + dragOffset.y };
      }
      return l;
    });
    setLayers(newLayers);
  }, [isDragging, selectedLayerId, dragOffset, layers]);

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      updateLayers(layers);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          addLayer("image", { imageElement: img, src: event.target.result });
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const addText = () => {
    addLayer("text", { text: "YOUR TEXT", fontSize: 40, fontFamily: "serif", fontWeight: "bold", color: "#D4AF37" });
  };

  const activeLayer = layers.find(l => l.id === selectedLayerId);

  return (
    <div className="flex flex-col lg:flex-row gap-8 bg-background p-6 rounded-3xl border border-border/50 shadow-2xl">
      {/* Sidebar Controls */}
      <div className="w-full lg:w-80 space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-bold font-display flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" /> Layer Management
          </h3>
          
          <div className="flex gap-2">
            <Button onClick={addText} variant="outline" className="flex-1 rounded-xl">
              <Type className="w-4 h-4 mr-2" /> Text
            </Button>
            <label className="flex-1 cursor-pointer">
              <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
              <div className="flex items-center justify-center h-10 px-4 py-2 border border-input bg-background hover:bg-accent rounded-xl text-sm font-medium transition-colors">
                <ImageIcon className="w-4 h-4 mr-2" /> Image
              </div>
            </label>
          </div>

          <div className="max-h-60 overflow-y-auto space-y-2 custom-scrollbar">
            {layers.length === 0 && <p className="text-xs text-muted-foreground text-center py-4 italic">No layers added yet.</p>}
            {[...layers].reverse().map(layer => (
              <div key={layer.id} className={`flex items-center gap-2 p-3 rounded-xl border transition-all ${selectedLayerId === layer.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border/50 bg-card/50"}`} onClick={() => setSelectedLayerId(layer.id)}>
                <div className="w-8 h-8 rounded bg-muted flex items-center justify-center shrink-0">
                  {layer.type === "text" ? <Type className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold truncate">{layer.type === "text" ? layer.text : "Uploaded Design"}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={(e) => { e.stopPropagation(); moveLayer(layer.id, "up"); }} className="p-1 hover:text-primary transition-colors"><MoveUp className="w-3 h-3" /></button>
                  <button onClick={(e) => { e.stopPropagation(); moveLayer(layer.id, "down"); }} className="p-1 hover:text-primary transition-colors"><MoveDown className="w-3 h-3" /></button>
                  <button onClick={(e) => { e.stopPropagation(); removeLayer(layer.id); }} className="p-1 hover:text-destructive transition-colors"><Trash2 className="w-3 h-3" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {activeLayer && (
          <div className="space-y-4 pt-6 border-t border-border/50 animate-in slide-in-from-left-2">
            <h4 className="text-sm font-black uppercase tracking-widest text-primary">Layer Settings</h4>
            
            {activeLayer.type === "text" && (
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase opacity-60">Edit Text</label>
                <Input 
                  value={activeLayer.text} 
                  onChange={(e) => {
                    const newLayers = layers.map(l => l.id === activeLayer.id ? { ...l, text: e.target.value } : l);
                    setLayers(newLayers);
                  }} 
                  className="rounded-xl"
                />
              </div>
            )}

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-[10px] font-bold uppercase opacity-60">Scale</label>
                <span className="text-[10px] font-bold text-primary">{Math.round(activeLayer.scale * 100)}%</span>
              </div>
              <Slider 
                value={[activeLayer.scale * 100]} 
                onValueChange={(v) => {
                  const newLayers = layers.map(l => l.id === activeLayer.id ? { ...l, scale: v[0] / 100 } : l);
                  setLayers(newLayers);
                }} 
                min={10} max={300} step={1} 
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-[10px] font-bold uppercase opacity-60">Rotation</label>
                <span className="text-[10px] font-bold text-primary">{activeLayer.rotation}°</span>
              </div>
              <Slider 
                value={[activeLayer.rotation]} 
                onValueChange={(v) => {
                  const newLayers = layers.map(l => l.id === activeLayer.id ? { ...l, rotation: v[0] } : l);
                  setLayers(newLayers);
                }} 
                min={-180} max={180} step={1} 
              />
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-border/50">
          <Button onClick={() => onSave(layers)} className="w-full h-12 gradient-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20">
            <Save className="w-4 h-4 mr-2" /> Finalize Design
          </Button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col items-center justify-center bg-muted/30 rounded-2xl relative overflow-hidden min-h-[600px] border border-border/50">
        {/* Toolbar */}
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <Button variant="secondary" size="icon" onClick={undo} disabled={historyIndex === 0} className="rounded-full shadow-md"><Undo2 className="w-4 h-4" /></Button>
          <Button variant="secondary" size="icon" onClick={redo} disabled={historyIndex === history.length - 1} className="rounded-full shadow-md"><Redo2 className="w-4 h-4" /></Button>
        </div>

        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Button variant="secondary" size="icon" onClick={() => setZoom(prev => Math.max(50, prev - 10))} className="rounded-full shadow-md"><ZoomOut className="w-4 h-4" /></Button>
          <Button variant="secondary" size="icon" onClick={() => setZoom(prev => Math.min(200, prev + 10))} className="rounded-full shadow-md"><ZoomIn className="w-4 h-4" /></Button>
        </div>

        {/* Canvas Scrollable Wrapper */}
        <div className="cursor-crosshair" style={{ transform: `scale(${zoom / 100})`, transition: "transform 0.3s ease" }}>
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="shadow-2xl rounded-sm bg-white"
            style={{ 
              cursor: isDragging ? "grabbing" : (selectedLayerId ? "grab" : "default")
            }}
          />
        </div>

        <div className="absolute bottom-4 text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
          TioraS Studio Preview | {view.toUpperCase()}
        </div>
      </div>
    </div>
  );
}
