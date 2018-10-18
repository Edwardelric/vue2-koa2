export function onEvent(target, event, handler, opts = {
  capture: false,
  once: false,
  passive: false
}) {
  target.addEventListener(event, handler, opts);
}

export function offEvent(target, event, handler) {
  target.removeEventListener(event, handler);
}

