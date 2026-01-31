"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import Loader3D from "./Loader3D";

type Props = {
  children: ReactNode;
  preload?: string[];
  minDurationMs?: number;
};

function preloadImages(
  urls: string[],
  onProgress?: (loaded: number, total: number) => void,
) {
  const total = urls.length;
  let loaded = 0;

  if (total === 0) {
    onProgress?.(0, 0);
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    const done = () => {
      loaded += 1;
      onProgress?.(loaded, total);
      if (loaded >= total) resolve();
    };

    urls.forEach((src) => {
      const img = new Image();
      img.onload = done;
      img.onerror = done;
      img.src = src;
    });
  });
}

export default function AppLoader({
  children,
  preload = [],
  minDurationMs = 1400,
}: Props) {
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(0);
  const [total, setTotal] = useState(preload.length);

  // Remount key: force animations to start AFTER loader
  const [mountKey, setMountKey] = useState(0);

  const safePreload = useMemo(() => {
    // évite doublons
    const uniq = Array.from(new Set(preload));
    setTotal(uniq.length);
    return uniq;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let cancelled = false;

    // Lock scroll while loading
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const start = performance.now();

    (async () => {
      await preloadImages(safePreload, (l, t) => {
        if (!cancelled) {
          setLoaded(l);
          setTotal(t);
        }
      });

      const elapsed = performance.now() - start;
      const wait = Math.max(0, minDurationMs - elapsed);

      await new Promise((r) => setTimeout(r, wait));

      if (!cancelled) {
        setReady(true);
        setMountKey((k) => k + 1);
        document.body.style.overflow = prevOverflow;
      }
    })();

    return () => {
      cancelled = true;
      document.body.style.overflow = prevOverflow;
    };
  }, [minDurationMs, safePreload]);

  if (!ready) {
    const percent =
      total > 0 ? Math.min(99, Math.round((loaded / total) * 100)) : 30;

    return (
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{
          background: "#0B0D10",
          color: "#F5F7FA",
        }}
      >
        <Loader3D percent={percent} />
      </div>
    );
  }

  // Mount after loader => all CSS animations begin now
  return <div key={mountKey}>{children}</div>;
}
