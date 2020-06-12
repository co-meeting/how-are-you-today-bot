const { createCanvas, loadImage, registerFont } = require('canvas')
const { getConfig } = require('./config');

const canvasWidth = 1200;
const canvasHeight = 630;
const padding = 50;

let canvas;
let ctx;

function getNum() {
  let num;
  do {
    num = Math.floor(Math.random() * 10) + 1;
  } while (num > 10);
  return ('0' + num).slice(-2);
}

function splitByMeasureWidth(str) {
  const maxWidth = canvasWidth - (padding * 2);

  // サロゲートペアを考慮した文字分割
  let chars = Array.from(str);
  let line = '';
  let lines = [];
  chars.forEach((char, index) => {
    if (maxWidth <= ctx.measureText(line + char).width) {
      lines.push(line);
      line = char;
    }
    else {
      line += char;
    }
  });
  lines.push(line);
  return lines;
}

function renderText(text, style) {
  ctx.fillStyle = style.fillStyle;
  ctx.font = style.font;
  ctx.textAlign = style.textAlign;

  const lines = splitByMeasureWidth(text);
  lines.forEach((line, index) => {
    ctx.fillText(line, canvasWidth/2, style.top + (style.lineHeight * index))
  });
}

async function renderUser(user) {
  const iconSize = 48;
  const iconMargin = 20;

  ctx.font = `bold 36px ${ctx.font}`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  const boxWidth = ctx.measureText(user.name).width;

  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, canvasHeight - iconMargin*2 - iconSize, iconSize + 10 + boxWidth + iconMargin*2, iconSize + iconMargin*2);

  const userImage = await loadImage(user.profile.image_48);
  ctx.drawImage(userImage, iconMargin, canvasHeight - iconMargin - iconSize, iconSize, iconSize);

  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(user.name, iconMargin + iconSize + 10, canvasHeight - (iconMargin + iconSize/2));
}

async function generateImage(question, answer, user) {
  const num = getNum();
  const config = getConfig(num);
  const image = await loadImage(`https://co-meeting.github.io/how-are-you-today-bot/images/how-are-you-${num}.png`);
  registerFont(config.font.path, config.font.fontFace);
  canvas = createCanvas(canvasWidth, canvasHeight)
  ctx = canvas.getContext('2d')

  ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);

  renderText(question, {
    font: `bold 48px ${config.font.fontFace.family}`,
    lineHeight: 58,
    fillStyle: config.fillStyle,
    textAlign: config.textAlign,
    top: 120
  });

  renderText(answer, {
    font: `bold 72px ${config.font.fontFace.family}`,
    lineHeight: 84,
    fillStyle: config.fillStyle,
    textAlign: config.textAlign,
    top: canvasHeight/2
  });

  await renderUser(user);

  return canvas.createPNGStream();
}

module.exports = {
  generateImage
};