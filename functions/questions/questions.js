const questions = require('./list');

function getIndex(day) {
  let index = day % questions.length;
  if (index === questions.length) {
    return getIndex(day - questions.length);
  }
  return index;
}

const getQuestion = function () {
  // 順番に質問を表示
  var date1 = new Date(2020, 4, 29);  // 起点:2020/5/29
  var date2 = new Date();
  // 日本のタイムゾーンに合わせる
  date2 = date2.getTime() + 9 * 60 * 60 * 1000;

  var diffDay = Math.floor((date2 - date1) / (24 * 60 * 60 * 1000));
  const index = getIndex(diffDay);
  return questions[index];
};
module.exports = getQuestion;
