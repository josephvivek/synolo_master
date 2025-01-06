import { useState } from "react";

// Custom hook to manage panning logic
export const usePanning = (wrapperRef) => {
  const [isPanning, setIsPanning] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  // Function to handle mouse down event
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

  return { PanningMouseDown, PanningMouseUp, PanningMouseMove };
};
