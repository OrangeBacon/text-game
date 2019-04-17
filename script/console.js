class DOMConsole {
  constructor(elem) {
    this.node = elem;
    this.screen = document.createElement("div");
    this.screen.classList.add("screen");
    this.node.appendChild(this.screen);
    this.charWidth = 15;
    this.charHeight = 20;
    this.calcSize();
  }

  set textSize(value) {
    this.charWidth = getTextWidth("m", `${value-1}px monospace`);
    this.charHeight = value;
    this.screen.style.fontSize = `${value - 1}px`;
    this.screen.style.lineHeight = `${value}px`;
  }

  calcSize() {
    this.columns = (this.node.clientWidth - (this.node.clientWidth % this.charWidth)) / this.charWidth;
    this.lines = (this.node.clientHeight - (this.node.clientHeight % this.charHeight)) / this.charHeight;
  }

  render() {
    this.calcSize();
    this.node.childNodes[0].style.width = `${this.columns * this.charWidth}px`;
    this.node.childNodes[0].style.height = `${this.lines * this.charHeight}px`;
  }

  writeArray(arr) {
    this.screen.innerText = "";
    arr.forEach(line => {
      this.screen.append(document.createTextNode(line.join("")+"\n"));
    });
  }
}

function getTextWidth(text, font) {
  const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
  const ctx = canvas.getContext("2d");
  ctx.font = font;
  return ctx.measureText(text).width;
}