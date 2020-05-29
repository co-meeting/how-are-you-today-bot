const questions = require('./list');

function getIndex(day) {
  let index = day % questions.length;
  if ( index === questions.length ) {
    return getIndex(day - questions.length);
  }
  return index;
}

const getQuestion = function (){
  // 順番に質問を表示
  var date1 = new Date(2020, 4, 29);  // 起点:2020/5/29
  var date2 = new Date();
  date2.setHours(0);
  date2.setMinutes(0);
  date2.setSeconds(0);
  date2.setMilliseconds(0);

  var diffDay = (date2 - date1) / (24 * 60 * 60 * 1000);
  const index = getIndex(diffDay);
  return questions[index];
  
};
module.exports = getQuestion;
