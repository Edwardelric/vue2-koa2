export default {
  getScrollEventTarget(element, rootParent = window) {
    let currentNode = element;
    while (currentNode
        && currentNode.tagName !== 'HTML'
        && currentNode.tagName !== 'BODY'
        && currentNode.nodeType === 1
        && currentNode !== rootParent
     ) {
      let overFlowY = this.getComputedStyle(currentNode).overflowY;
      if (overFlowY === 'scroll' || overFlowY === 'auto') {
        return currentNode;
      }
      currentNode = currentNode.parentNode;
    }
    return rootParent;
  },
  getScrollTop(element) {
    if (element === window) {
      return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
    }
    return element.scrollTop;
  },
  getComputedStyle: document.defaultView.getComputedStyle.bind(document.defaultView),
  getVisibleHeight(element) {
    if (element === window) {
      return document.documentElement.clientHeight;
    }
    return element.clientHeight;
  },
  setScrollTop(element, value) {
    'scrollTop' in element ? element.scrollTop = value : element.scrollTo(element.scrollX, value)
  },
  getElementTop(element) {
    if (element === window) {
      return this.getScrollTop(window);
    }
    return element.getBoundingClientRect().top + this.getScrollTop(window);
  }
}
