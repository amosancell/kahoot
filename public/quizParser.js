const fs = require('fs');

var fileName = 'testQuiz.txt';

try {
    var data = fs.readFileSync(fileName,'utf8');
} catch(e) {
    console.log('Error: ', e.stack);
}

// parse the file into an object
// returned: object with keys as the questions of the quiz, values of the keys are objects with 2 keys:
//          answers: which is a list of the answers (all strings),
//          correctAnswer: which an object containing the letter of the correct answer and the index of it in answers
function parseFile(data) {
    let qs = data.split('\n\n');
    let result = {};
    for(let q of qs) {
        let qParsed = parseQuestion(q)
        result[qParsed['question']] = {'answers':qParsed['answers'],'correctAnswer':qParsed['correctAnswer']};
    }
    return result;
}

// qBlock is a block of the txt file that includes the questions, answers, and correct answer (a value of qs)
function parseQuestion(qBlock) {
    let answers = {};
    let correctAnswer;
    let lines = qBlock.split('\n');
    let question = lines[0]; // the question will always be the first line
    let l=1;
    let line = lines[l];
    let r = /[A-Za-z]\)/;
    // search through the lines and get all the answers
    while(l < lines.length && r.test(line.trimLeft())) {
        //answers.push(line.trimLeft().substring(2).trim())
        answers[line.substring(line.search(r),line.search(r)+1)] = line.trimLeft().substring(2).trim();
        l++;
        line = lines[l];
    }
    correctAnswer = line.trimLeft().substring(1).trim();
    correctAnswerIdx = Object.keys(answers).indexOf(correctAnswer);
    return {'question':question,'answers':Object.values(answers),'correctAnswer':{'letter':correctAnswer,'idx':correctAnswerIdx}};
}

let quiz = parseFile(data);
console.log(quiz);