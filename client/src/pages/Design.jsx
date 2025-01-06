import { useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import { usePanning } from "../utils/panning";  // Import the custom panning hook
import { initializeCanvas } from "../utils/InitializeCanvas";  // Import canvas initialization function
import "../styles/Design.css";

function Design() {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);

  // Panning logic from the custom hook
  const { PanningMouseDown, PanningMouseUp, PanningMouseMove } = usePanning(wrapperRef);

  useEffect(() => {
    initializeCanvas(canvasRef); // Call the canvas initialization function
  }, []);

  return (
    <div className="design-container">
      <Navbar />
      <div className="main-area">
        <div className="sidebar">
          <button className="add-rectangle-btn">Add Rectangle</button>
          
        </div>
        <div className="canvas-container">
          <div
            className="canvas-wrapper"
            ref={wrapperRef}
            onMouseDown={PanningMouseDown}
            onMouseUp={PanningMouseUp}
            onMouseMove={PanningMouseMove}
          >
            <canvas className="drawing-area" ref={canvasRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Design;
