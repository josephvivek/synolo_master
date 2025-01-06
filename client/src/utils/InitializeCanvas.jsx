// Function to initialize the canvas with grid lines
export const initializeCanvas = (canvasRef) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
  
    const canvasWidth = 2000; // Larger width for panning
    const canvasHeight = 2000; // Larger height for panning
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  
    const gridSize = 50;
    const gridSizeSmall = 10;
  
    // Fill canvas background with white color
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  
    // Draw major grid lines
    ctx.strokeStyle = "#4B4B4B";
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= canvasWidth; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvasHeight);
      ctx.stroke();
    }
  
    for (let y = 0; y <= canvasHeight; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvasWidth, y);
      ctx.stroke();
    }
  
    // Draw minor grid lines
    ctx.strokeStyle = "#4B4B4B";
    ctx.lineWidth = 0.1;
    for (let x = 0; x <= canvasWidth; x += gridSizeSmall) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvasHeight);
      ctx.stroke();
    }
  
    for (let y = 0; y <= canvasHeight; y += gridSizeSmall) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvasWidth, y);
      ctx.stroke();
    }
  };
  