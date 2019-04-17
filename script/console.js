class DOMConsole {
  constructor(elem) {
    this.node = elem;
    this.screen = document.createElement("div");
    this.screen.classList.add("screen");
    this.node.appendChild(this.screen);
    this.charWidth = 15;
    this.charHeight = 20;
    this.onResize = () => { };
    this.calcSize();
  }

  set onResize(value) {
    this.onResizeFn = value;
    this.onResizeFnDebounce = debounce(value, 250);
  }

  set textSize(value) {
    this.charWidth = getTextWidth("m", `${value - 1}px monospace`);
    this.charHeight = value;
    this.screen.style.fontSize = `${value - 1}px`;
    this.screen.style.lineHeight = `${value}px`;
    this.calcSize();
  }

  calcSize() {
    if (this.pixelWidth == this.node.clientWidth &&
      this.pixelHeight == this.node.clientHeight &&
      this.oldFontSize == this.charHeight) {
      return;
    }
    this.pixelWidth = this.node.clientWidth;
    this.pixelHeight = this.node.clientHeight;
    this.columns = (this.node.clientWidth - (this.node.clientWidth % this.charWidth)) / this.charWidth;
    this.lines = (this.node.clientHeight - (this.node.clientHeight % this.charHeight)) / this.charHeight;
    this.node.childNodes[0].style.width = `${this.columns * this.charWidth}px`;
    this.node.childNodes[0].style.height = `${this.lines * this.charHeight}px`;
    this.onResizeFnDebounce();
  }

  render() {
    this.calcSize();
  }

  writeArray(arr) {
    this.screen.innerText = "";
    arr.forEach(line => {
      const lineEl = document.createElement("span");
      lineEl.classList.add("line");
      lineEl.append(document.createTextNode(line.join("") + "\n"));
      this.screen.append(lineEl);
    });
  }
}

function getTextWidth(text, font) {
  const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
  const ctx = canvas.getContext("2d");
  ctx.font = font;
  return ctx.measureText(text).width;
}

function debounce(func, wait, immediate) {
  var timeout;
  return function debounceClosure() {
    var context = this, args = arguments;
    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};