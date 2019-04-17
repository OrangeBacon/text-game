class DOMConsole {
  constructor(elem) {
    this.node = elem;
    this.screen = document.createElement("div");
    this.screen.classList.add("screen");
    this.node.appendChild(this.screen);
    this.charWidth = 15;
    this.charHeight = 20;
    this.onResize = () => { };
    this.currentLineCount = 0;
    this.calcSize();
  }

  set onResize(value) {
    this.onResizeFn = () => {
      if (this.lines > this.currentLineCount) {
        const val = this.lines - this.currentLineCount;
        for (let i = 0; i < val; i++) {
          const item = document.createElement("span");
          item.classList.add("line");
          this.screen.appendChild(item);
        }
      } else if (this.lines < this.currentLineCount) {
        const val = this.currentLineCount - this.lines;
        for (let i = 0; i < val; i++) {
          this.screen.removeChild(this.screen.children[this.screen.children.length - 1]);
        }
      }
      this.currentLineCount = this.lines;
      value();
    };
    this.onResizeFnDebounce = debounce(this.onResizeFn, 100);
  }

  set textSize(value) {
    this.oldFontSize = this.charHeight
    this.charWidth = getTextWidth("m", `${value - 1}px monospace`);
    this.charHeight = value;
    this.screen.style.fontSize = `${value - 1}px`;
    this.screen.style.lineHeight = `${value}px`;
    this.calcSize(false);
  }

  calcSize(debounce = true) {
    if (this.pixelWidth == this.node.clientWidth &&
      this.pixelHeight == this.node.clientHeight &&
      this.oldFontSize == this.charHeight) {
      return;
    }
    this.oldFontSize = this.charHeight;
    this.pixelWidth = this.node.clientWidth;
    this.pixelHeight = this.node.clientHeight;
    this.columns = (this.node.clientWidth - (this.node.clientWidth % this.charWidth)) / this.charWidth;
    this.lines = (this.node.clientHeight - (this.node.clientHeight % this.charHeight)) / this.charHeight;
    this.screen.style.width = `${this.columns * this.charWidth}px`;
    this.screen.style.height = `${this.lines * this.charHeight}px`;
    if(debounce) {
      this.onResizeFnDebounce();
    } else {
      this.onResizeFn();
    }
  }

  render() {
    this.calcSize();
  }

  writeArray(arr, start = 0) {
    for (let i = start; i < arr.length; i++) {
      if(i < this.lines){
        this.screen.children[i].innerText = arr[i].join("");
      } else {
        break;
      }
    }
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