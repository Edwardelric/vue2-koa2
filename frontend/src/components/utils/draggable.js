let isDragging = false;
const supportTouch = "ontouchstart" in window;

export default function(ele, options) {
  const moveFn = (event) => {
    if (options.move) {
      options.move(event)
    }
  };
  const endFn = (event) => {
    if (!supportTouch) {
      document.removeEventListener("mousemove", moveFn);
      document.removeEventListener("mouseup", endFn);
    }
    document.onselectstart = null;
    document.ondragstart = null;
    isDragging = false;
    if (options.end) {
      options.end(event)
    }
  };
  ele.addEventListener(supportTouch ? "touchstart" : "mousedown", (event) => {
    if (isDragging) {
      return false;
    }
    document.onselectstart = () => { return false;}
    document.ondragstart = () => { return false;}
    // if (!supportTouch) {
    //   document.addEventListener("mousemove", moveFn);
    //   document.addEventListener("mouseup", endFn);
    // }
    isDragging = true;
    if (options.start) {
      event.preventDefault();
      event.stopPropagation()
      console.log(event);
      options.start(event);
    }
  });
  if (supportTouch) {
    ele.addEventListener('touchmove', moveFn)
    ele.addEventListener('touchend', endFn)
    ele.addEventListener('touchcancel', endFn)
  }
}
