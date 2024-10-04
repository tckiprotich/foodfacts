import { CameraEnhancer } from "dynamsoft-camera-enhancer";
import { PlayCallbackInfo } from "dynamsoft-camera-enhancer/dist/types/interface/playcallbackinfo";
import { TextResult, BarcodeReader } from "dynamsoft-javascript-barcode";
import React from "react";
import { ReactNode } from "react";

export interface ScannerProps {
  isActive?: boolean;
  children?: ReactNode;
  interval?: number;
  license?: string | null;
  onInitialized?: (enhancer: CameraEnhancer, reader: BarcodeReader) => void;
  onScanned?: (results: TextResult[]) => void;
  onPlayed?: (playCallbackInfo: PlayCallbackInfo) => void;
  onClosed?: () => void;
}

const BarcodeScanner = (props: ScannerProps): React.ReactElement => {
  const mounted = React.useRef(false);
  const container = React.useRef(null);
  const enhancer = React.useRef<CameraEnhancer>();
  const reader = React.useRef<BarcodeReader>();
  const interval = React.useRef<any>(null);
  const decoding = React.useRef(false);

  React.useEffect(() => {
    const init = async () => {
      if (BarcodeReader.isWasmLoaded() === false) {
        if (props.license) {
          BarcodeReader.license = props.license;
        } else {
          BarcodeReader.license = "DLS2eyJoYW5kc2hha2VDb2RlIjoiMTAzMjY0MDgxLVRYbFhaV0pRY205cSIsIm1haW5TZXJ2ZXJVUkwiOiJodHRwczovL21kbHMuZHluYW1zb2Z0b25saW5lLmNvbSIsIm9yZ2FuaXphdGlvbklEIjoiMTAzMjY0MDgxIiwic3RhbmRieVNlcnZlclVSTCI6Imh0dHBzOi8vc2Rscy5keW5hbXNvZnRvbmxpbmUuY29tIiwiY2hlY2tDb2RlIjoyMTAzMjk5NzU2fQ==";
          alert("Please set your own license key in BarcodeScanner.tsx");
        }
        BarcodeReader.engineResourcePath = "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@9.6.11/dist/";
      }
      reader.current = await BarcodeReader.createInstance();
      enhancer.current = await CameraEnhancer.createInstance();
      await enhancer.current.setUIElement(container.current!);
      enhancer.current.on("played", (playCallbackInfo: PlayCallbackInfo) => {
        if (props.onPlayed) {
          props.onPlayed(playCallbackInfo);
        }
        startScanning();
      });
      enhancer.current.on("cameraClose", () => {
        if (props.onClosed) {
          props.onClosed();
        }
      });
      enhancer.current.setVideoFit("cover");
      if (props.onInitialized) {
        props.onInitialized(enhancer.current, reader.current);
      }

      toggleCamera();
    };
    if (mounted.current === false) {
      init();
    }
    mounted.current = true;
  }, []);

  const toggleCamera = () => {
    if (mounted.current === true) {
      if (props.isActive === true) {
        enhancer.current?.open(true);
      } else {
        stopScanning();
        enhancer.current?.close();
      }
    }
  };

  React.useEffect(() => {
    toggleCamera();
  }, [props.isActive]);

  const startScanning = () => {
    const decode = async () => {
      if (decoding.current === false && reader.current && enhancer.current) {
        decoding.current = true;
        const results = await reader.current.decode(enhancer.current.getFrame());
        if (props.onScanned) {
          props.onScanned(results);
        }
        decoding.current = false;
      }
    };
    if (props.interval) {
      interval.current = setInterval(decode, props.interval);
    } else {
      interval.current = setInterval(decode, 40);
    }
  };

  const stopScanning = () => {
    clearInterval(interval.current);
  };

  return (
    <div ref={container} style={{ position: "relative", width: "100%", height: "100%" }}>
      <div className="dce-video-container"></div>
      {props.children}
    </div>
  );
};

export default BarcodeScanner;