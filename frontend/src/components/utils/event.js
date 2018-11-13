export function OnEvent (target, event, handler, opts = {
  capture: false,
  once: false,
  passive: false
}) {
  target.addEventListener(event, handler, opts);
}

export function OffEvent(target, event, handler) {
  target.removeEventListener(event, handler);
}

