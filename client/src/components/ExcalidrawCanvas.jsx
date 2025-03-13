import React, { useRef } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";

const ExcalidrawCanvas = () => {
  const excalidrawRef = useRef(null);

  const handleExport = () => {
    if (excalidrawRef.current) {
      const scene = excalidrawRef.current.getSceneElements();
      console.log("Exported Elements:", scene);
      alert("Check console for exported elements!");
    }
  };

  return (
    <div style={styles.container}>
      <Excalidraw ref={excalidrawRef} />
      <button style={styles.button} onClick={handleExport}>
        Export Drawing
      </button>
    </div>
  );
};

const styles = {
  container: { height: "600px", border: "1px solid #ccc", position: "relative" },
  button: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    padding: "8px 12px",
    background: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default ExcalidrawCanvas;
