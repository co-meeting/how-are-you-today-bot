const { createCanvas, loadImage } = require('canvas')

const canvasWidth = 1200;
const canvasHeight = 630;

const canvas = createCanvas(canvasWidth, canvasHeight)
const ctx = canvas.getContext('2d')

async function generateImage(question, answer) {
  const num = Math.floor(Math.random() * 9) + 1;
  const image = await loadImage(`https://co-meeting.github.io/how-are-you-today-bot/images/how-are-you-0${num}.png`);
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