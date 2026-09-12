"use client";

import { useEffect, useRef, useState } from "react";

export function ControlRoomDemo() {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(780);

  useEffect(() => {
    const resize = (event: MessageEvent<unknown>) => {
      if (event.source !== frame.current?.contentWindow) return;
      const data = event.data;
      if (!data || typeof data !== "object" || !("type" in data) || !("height" in data)) return;
      if (data.type !== "steam-value-twin:resize" || typeof data.height !== "number") return;
      if (!Number.isFinite(data.height) || data.height < 300 || data.height > 2400) return;
      setHeight(Math.ceil(data.height));
    };
    window.addEventListener("message", resize);
    frame.current?.contentWindow?.postMessage({ type: "steam-value-twin:measure" }, "*");
    return () => window.removeEventListener("message", resize);
  }, []);

  return (
    <iframe
      ref={frame}
      src="/demos/value-stream-twin-demo.html"
      title="STEAM VALUE — salle de contrôle interactive du compresseur C-02"
      onLoad={() => frame.current?.contentWindow?.postMessage({ type: "steam-value-twin:measure" }, "*")}
      width="100%"
      height={height}
      sandbox="allow-scripts"
      className="block w-full rounded-xl border-0 bg-[#050a36]"
    />
  );
}
