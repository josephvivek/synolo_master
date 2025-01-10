import { useRef, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {Rectangle} from "../utils/Shape";
import { traverse_callback } from "../utils/TraverseCallback";
import { cloneDeep } from 'lodash';
import { initializeCanvas } from "../utils/InitializeCanvas"; // Import canvas initialization function
import "../styles/Design.css";

function Design() {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);

  // State variables
  const [mode, setMode] = useState("panning"); // "panning", "rectangle", or "select"
  const [shapes, setShapes] = useState([]); // Store all shapes
  const [selectedShape, setSelectedShape] = useState(null); // Currently selected rectangle
  const [drawingTool,setDrawingTool] = useState(null);
  const [hoveredShape, setHoveredShape] = useState(null); // Currently hovered shape
  const [isPanning, setIsPanning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing,setIsResizing] = useState(false);
  const [isDrawing,setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  // Panning logic 

  const PanningMouseDown = (e) => {
    setIsPanning(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
    setScrollLeft(wrapperRef.current.scrollLeft);
    setScrollTop(wrapperRef.current.scrollTop);
    wrapperRef.current.style.cursor = "grabbing";
  };  

  // Function to handle mouse up event
  const PanningMouseUp = () => {
    setIsPanning(false);
    wrapperRef.current.style.cursor = "default";
  };

  // Function to handle mouse move event
  const PanningMouseMove = (e) => {
    if (!isPanning) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    wrapperRef.current.scrollLeft = scrollLeft - dx;
    wrapperRef.current.scrollTop = scrollTop - dy;
  };
  

  useEffect(() => {
    initializeCanvas(canvasRef); // Call the canvas initialization function
  }, []);

  //handle mouse down (consolidated)

  const handleMouseDown = (e)=>{
    const rect  = canvasRef.current.getBoundingClientRect()
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const hoveredShape = [...shapes].reverse().find((shape) => shape.contains(mouseX,mouseY));
    const shapeToResize = [...shapes].reverse().find((shape) => shape.checkHoverResizeHandle(mouseX,mouseY));
    const shapeToRotate = [...shapes].reverse().find((shape) => shape.checkHoverRotateHandle(mouseX,mouseY));

    if(hoveredShape){
      // console.log("hovering...")
      if (hoveredShape === selectedShape){
        setIsDragging(true);
        setIsPanning(false);
        setStartX(mouseX);
        setStartY(mouseY)
        // console.log(isDragging, isPanning)
      }
    }

    else if (shapeToResize){
      if (shapeToResize === selectedShape){
        setIsResizing(true);
        setIsPanning(false);
        setStartX(mouseX);
        setStartY(mouseY);
      }
    }

    else{
      PanningMouseDown(e);
    }





      //panning moue down


    /* else if hoveredShape has type resize handle: set isdragging true + capture shape + initialize coords + grabbing cursor + other logic 

    else if hoveredShape has type shape: set isdragging true + capture shape + initialise coords + grabbing cursor + insert logic */

  }

  //handle mouse move consolidated

  const handleMouseMove = (e) => {
    // condition to pan : if isPanning true
    if (isPanning){
      PanningMouseMove(e);
    }
    else if (isDragging && selectedShape){
      const rect = canvasRef.current.getBoundingClientRect();
      let mouseX = e.clientX - rect.left;
      let mouseY = e.clientY - rect.top;

      console.log("This is selectedShape", selectedShape);
      let dx = mouseX - startX;
      let dy = mouseY - startY;

      var draggedShape = cloneDeep(selectedShape);
      console.log("This is dragged shape",draggedShape)
      draggedShape.x += dx;
      draggedShape.y += dy;
      console.log("This is new dragged shape",draggedShape)
      setShapes((prevShapes) => (prevShapes.map((shape) => (shape === selectedShape ? draggedShape : shape))));
      setSelectedShape(draggedShape);  
      setStartX(mouseX); // Update start position for smoother dragging
      setStartY(mouseY);  

    }
    else{
      const rect  = canvasRef.current.getBoundingClientRect()
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if ([...shapes].some(shape => shape.contains(mouseX,mouseY))) setMode('shape-hover');
      else if ([...shapes].some(shape => shape.checkHoverResizeHandle(mouseX,mouseY))) setMode('resize-hover');
      else if ([...shapes].some(shape => shape.checkHoverRotateHandle(mouseX,mouseY))) setMode('rotate-hover');
      else if(isDrawing) setMode('drawing');
      else setMode('panning');
      
      
      

      
    }



    /* else if select mode is on and cursor lies inside shape and dragging flag is true : translate entire shape, capture coords

    else if select mode is on and cursor lies inside resize handle: transform shape, capture coords */

  
  }

  //consolidated mouse up

  const handleMouseUp = (e) =>{
    if (isPanning){
      PanningMouseUp(e);
      return;
    }
    else if (isDragging){
      setIsDragging(false);
      setStartX(0);
      setStartY(0);
    }

  }

  // consolidated mouse click

  const handleMouseClick = (e) =>{
    console.log(mode);
    if (mode == "drawing"){
      if (drawingTool == 'rectangle'){
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        
    
        // Calculate position relative to canvas
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
    
        // Create a new rectangle
        const newRectangle = new Rectangle(x, y, 100, 50, "blue"); // Fixed width and height for now
        setShapes((prevShapes) => [...prevShapes, newRectangle]);
    
        // Return to panning mode after adding the rectangle
        setIsDrawing(false);
        setMode("panning");
        
      
    }
  }

  else if (mode == 'shape-hover'){
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    

    // Calculate position relative to canvas
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;  

    const clickedShape = shapes.find((shape) => shape.contains(x, y));
    if (!clickedShape){
      

      return;
    };

    if (selectedShape) {
      const deselectedShape = cloneDeep(selectedShape);
      deselectedShape.selected = false;

      setShapes((prevShapes) => (prevShapes.map((shape) => (shape === selectedShape ? deselectedShape : shape))));
      console.log("deselected");

      setSelectedShape(null);
    }

    const updatedShape = cloneDeep(clickedShape);
    updatedShape.selected = true;

    setShapes((prevShapes) => (prevShapes.map((shape) => (shape == clickedShape ? updatedShape : shape))));

    setSelectedShape(updatedShape);



 


  }
    

    // if in select mode click empty area of canvas to deselect. Else select new shape
  
}









  // Add Rectangle Logic
  // const handleCanvasClick = (e) => {
  //   if (mode !== "rectangle") return;

  //   const canvas = canvasRef.current;
  //   const rect = canvas.getBoundingClientRect();

  //   // Calculate position relative to canvas
  //   const x = e.clientX - rect.left;
  //   const y = e.clientY - rect.top;

  //   // Create a new rectangle
  //   const newRectangle = new Rectangle(x, y, 100, 50, "blue"); // Fixed width and height for now
  //   setShapes((prevShapes) => [...prevShapes, newRectangle]);

  //   // Return to panning mode after adding the rectangle
  //   setMode("panning");
  //   canvas.style.cursor = "grab"; // Reset cursor to grab for panning
  // };

  // // Select Rectangle Logic
  // const handleCanvasMouseDown = (e) => {
  //   if (mode !== "select") return;

  //   const canvas = canvasRef.current;
  //   const rect = canvas.getBoundingClientRect();

  //   // Get mouse coordinates relative to canvas
  //   const x = e.clientX - rect.left;
  //   const y = e.clientY - rect.top;

  //   // Check if the mouse click is inside any rectangle
  //   const clickedShape = shapes.find((shape) => shape.contains(x, y));
  //   setSelectedShape(clickedShape);
  // };

  // // Delete Selected Rectangle
  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if (e.key === "Delete" && selectedShape) {
  //       // Remove the selected rectangle
  //       setShapes((prevShapes) =>
  //         prevShapes.filter((shape) => shape !== selectedShape)
  //       );
  //       setSelectedShape(null); // Reset selection
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [selectedShape]);

  // // Update cursor based on mode
  useEffect(() => {
    const canvas = canvasRef.current;

    if (mode === "drawing") {
      canvas.style.cursor = "crosshair"; // Change cursor to crosshair
    } else if (mode === "shape-hover") {
      canvas.style.cursor = "pointer"; // Change cursor to pointer for selection
    } else {
      canvas.style.cursor = "grab"; // Default cursor for panning
    }
  }, [mode]);

  // Draw all shapes on the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    initializeCanvas(canvasRef);

    // Redraw all shapes
    console.log(shapes)
    if(shapes){
      shapes.forEach((shape) => {
        shape.draw(ctx); // Highlight if selected
      });
    }
    else console.log("shapes is NULL")
  }, [shapes]);



  return (
    <div className="design-container">
      <Navbar />
      <div className="main-area">
        <div className="sidebar">
          <button
            className="add-rectangle-btn"
            onClick={() => {setMode("drawing");
              setDrawingTool("rectangle");
              setIsDrawing(true);
            }}
          >
            Add Rectangle
          </button>
          <button className="select-rectangle-btn">
            Select Rectangle
          </button>
        </div>
        <div className="canvas-container">
          <div
            className="canvas-wrapper"
            ref={wrapperRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onClick={handleMouseClick}
          >
            <canvas
              className="drawing-area"
              ref={canvasRef}>
            </canvas>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Design;
