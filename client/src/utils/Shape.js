class Shape {
  constructor(x,y,type){
    this.x = x;
    this.y = y;
    this.type = type;
    this.selected = false;
    this.highlightColor = "red"; // Highlight color when selected
    this.highlightThickness = 3; // Thickness of the highlight border
  }

  draw(){
    throw new Error("Must implement in sub-class");
  }

  handleSelect(){
    throw new Error("Must implement in sub-class");
  }

  contains(){
    throw new Error("Must implement in sub-class");
  }
}





export class Rectangle extends Shape {
  constructor(x, y, width, height, color) {
    super(x, y, "rectangle");
    this.width = width;
    this.height = height;
    this.color = color;

    // Handle dimensions
    this.handleSize = 10; // Size of the resize/rotate handle
    this.selectedHandle = null; // Track which handle is being hovered
    this.isHoveringRotateHandle = false; // Track hover state of rotate handle
  }

  // Method to check if mouse is hovering over a resize handle
  checkHoverResizeHandle(mouseX, mouseY) {
    const handleSize = this.handleSize;

    // Define the positions for resize handles (corners and edges)
    const handlePositions = [
      { x: this.x, y: this.y }, // Top-left
      { x: this.x + this.width, y: this.y }, // Top-right
      { x: this.x, y: this.y + this.height }, // Bottom-left
      { x: this.x + this.width, y: this.y + this.height }, // Bottom-right
      { x: this.x + this.width / 2, y: this.y }, // Top-center
      { x: this.x + this.width / 2, y: this.y + this.height }, // Bottom-center
      { x: this.x, y: this.y + this.height / 2 }, // Left-center
      { x: this.x + this.width, y: this.y + this.height / 2 }, // Right-center
    ];

    // Check if the mouse is hovering over any handle
    for (let i = 0; i < handlePositions.length; i++) {
      const { x, y } = handlePositions[i];
      if (
        mouseX >= x - handleSize / 2 &&
        mouseX <= x + handleSize / 2 &&
        mouseY >= y - handleSize / 2 &&
        mouseY <= y + handleSize / 2
      ) {
        this.selectedHandle = i; // Track the hovered handle
        return true;
      }
    }

    // If no resize handle is hovered over
    this.selectedHandle = null;
    return false;
  }

  // Method to check if mouse is hovering over the rotate handle
  checkHoverRotateHandle(mouseX, mouseY) {
    const handleSize = this.handleSize;
    const rotateHandle = {
      x: this.x + this.width / 2,
      y: this.y - this.handleSize * 2,
    };

    // Check if mouse is within the bounds of the rotate handle
    const distance = Math.sqrt(
      (mouseX - rotateHandle.x) ** 2 + (mouseY - rotateHandle.y) ** 2
    );
    const isHovering = distance <= handleSize / 2; // Within the radius of the rotate handle

    this.isHoveringRotateHandle = isHovering;
    return isHovering;
  }

  // Draw resize and rotate handles
  _drawHandles(ctx) {
    const handleSize = this.handleSize;
    const handlePositions = [
      { x: this.x, y: this.y }, // Top-left
      { x: this.x + this.width, y: this.y }, // Top-right
      { x: this.x, y: this.y + this.height }, // Bottom-left
      { x: this.x + this.width, y: this.y + this.height }, // Bottom-right
      { x: this.x + this.width / 2, y: this.y }, // Top-center
      { x: this.x + this.width / 2, y: this.y + this.height }, // Bottom-center
      { x: this.x, y: this.y + this.height / 2 }, // Left-center
      { x: this.x + this.width, y: this.y + this.height / 2 }, // Right-center
    ];

    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;

    handlePositions.forEach(({ x, y }, index) => {
      // Highlight the handle if it's the selected one
      if (this.selectedHandle === index) {
        ctx.fillStyle = "red"; // Highlight color
      } else {
        ctx.fillStyle = "white";
      }

      ctx.beginPath();
      ctx.rect(x - handleSize / 2, y - handleSize / 2, handleSize, handleSize);
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    });

    // Optional: Draw and highlight the rotate handle
    const rotateHandle = {
      x: this.x + this.width / 2,
      y: this.y - this.handleSize * 2,
    };

    ctx.fillStyle = this.isHoveringRotateHandle ? "red" : "white";
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.arc(rotateHandle.x, rotateHandle.y, handleSize / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  draw(ctx, mouseX, mouseY) {
    if (this.selected) {
      // Draw the highlight border
      ctx.beginPath();
      ctx.lineWidth = this.highlightThickness;
      ctx.strokeStyle = this.highlightColor;
      ctx.rect(
        this.x - this.highlightThickness / 2,
        this.y - this.highlightThickness / 2,
        this.width + this.highlightThickness,
        this.height + this.highlightThickness
      );
      ctx.stroke();
      ctx.closePath();

      // Draw resize handles and check hover
      this._drawHandles(ctx, mouseX, mouseY);
    }

    // Draw the rectangle
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  contains(cursorX, cursorY) {
    return (
      cursorX >= this.x &&
      cursorX <= this.x + this.width &&
      cursorY >= this.y &&
      cursorY <= this.y + this.height
    );
  }
}
