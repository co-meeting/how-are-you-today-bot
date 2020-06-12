const { createCanvas, loadImage } = require('canvas')

const canvasWidth = 1200;
const canvasHeight = 630;

const canvas = createCanvas(canvasWidth, canvasHeight)
const ctx = canvas.getContext('2d')

function getNum() {
  let num;
  do {
    num = Math.floor(Math.random() * 10) + 1;
  } while (num > 10);
  return ('0' + num).slice(-2);
}

async function generateImage(question, answer) {
  const num = getNum();
  const image = await loadImage(`https://co-meeting.github.io/how-are-you-today-bot/images/how-are-you-${num}.png`);
  ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);

  ctx.fillStyle = '#f7ffed';
  ctx.font = 'bold 48px "Noto Sans CJK JP"';
  ctx.textAlign = 'center';
  ctx.fillText(question, canvasWidth/2, 120);

  ctx.fillStyle = '#f7ffed';
  ctx.font = 'bold 72px "Noto Sans CJK JP"';
  ctx.textAlign = 'center';
  ctx.fillText(answer, canvasWidth/2, canvasHeight/2);

  return canvas.createPNGStream();
}

module.exports = {
  generateImage
};