import React, { useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import { fabric } from "fabric"; // Correct import for Fabric.js
import "../styles/Design.css";

function Design() {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;

    // Set the canvas size based on its container dimensions
    const canvasWidth = canvasElement.clientWidth;
    const canvasHeight = canvasElement.clientHeight;

    canvasElement.width = canvasWidth;
    canvasElement.height = canvasHeight;

    // Initialize Fabric.js Canvas
    const canvas = new fabric.Canvas(canvasElement);
    fabricCanvas.current = canvas;

    // Set background color and render
    canvas.backgroundColor = "#fff";
    canvas.renderAll();

    // Add a rectangle to the canvas
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: "red",
      width: 100,
      height: 100,
    });
    canvas.add(rect);

    // Clean up the canvas on component unmount
    return () => {
      canvas.dispose();
    };
  }, []);

  // Add a rectangle dynamically
  const addRectangle = () => {
    if (fabricCanvas.current) {
      const rect = new fabric.Rect({
        left: 50,
        top: 100,
        width: 100,
        height: 60,
        fill: "#D84D42",
      });
      fabricCanvas.current.add(rect);
    }
  };

  return (
    <>
      <div className="design-container">
        <Navbar />
        <div className="main-area">
          <div className="sidebar">
            <button onClick={addRectangle} className="add-rectangle-btn">
              Add Rectangle
            </button>
          </div>
          <div className="canvas-container">
            <canvas className="drawing-area" ref={canvasRef}></canvas>
          </div>
        </div>
      </div>
    </>
  );
}

export default Design;
