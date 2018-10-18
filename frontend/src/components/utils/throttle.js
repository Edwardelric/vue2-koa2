export default function(fn, delay) {
  let now, lastExec, timer, context, args; //eslint-disable-line
  
  let execute = function() {
    fn.apply(context, args);
    lastExec = now;
  };
  
  return function() {
    context = this;
    args = arguments;
    
    now = Date.now();
    
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    
    if (lastExec) {
      let diff = delay - (now - lastExec);
      if (diff < 0) {
        execute();
      } else {
        timer = setTimeout(() => {
          execute();
        }, diff);
      }
    } else {
      execute();
    }
  };
};
