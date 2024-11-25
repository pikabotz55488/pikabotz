const iframeElement = document.getElementById('iframe-container');
const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');
const submitButton = document.getElementById('submit');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score-value');

let currentAnswer;
let score = 0;

// Hello World

function generateQuestion() {
    //const num1 = Math.floor(Math.random() * 10) + 1;
    //const num2 = Math.floor(Math.random() * 10) + 1;
    //const operation = Math.random() < 0.5 ? '+' : '-';

    //if (operation === '+') {
    //currentAnswer = num1 + num2;
    //} else {
    //currentAnswer = num1 - num2;
    //}

    //questionElement.textContent = `${num1} ${operation} ${num2} = ?`;

    const textArray = [
"If current trends continue, by which year, the world's oceans will contain more plastic than fish?",
"How much more plastic(in billion tons) was produced in 2019 than 2015?",
"What percentage of plastic waste is recycled as of 2019?",
"What percentage of plastic is incinerated (burned) as of 2019?",
"How much plastic is produced by the largest sector that uses plastic(in million tons) as of 2019?",
"How much more plastic(in million tons) does the Packaging sector use plastic than Building and Construction in 2019?",
"What is the product lifetime(in years) of plastic that is used as packaging?",
"What is the product lifetime(in years) of plastic that is used in textiles (clothing)?",
"What is the rank of United States in the list of countries producing the highest amounts of plastic waste?",
];

const srcArray = [
"https://www.theworldcounts.com/embeds/counters/117",
"https://ourworldindata.org/grapher/cumulative-global-plastics?time=earliest..2019&tab=chart",
"https://ourworldindata.org/grapher/plastic-fate?tab=chart",
"https://ourworldindata.org/grapher/plastic-fate?tab=chart",
"https://ourworldindata.org/grapher/plastic-waste-by-sector?tab=chart",
"https://ourworldindata.org/grapher/plastic-waste-by-sector?tab=chart",
"https://ourworldindata.org/grapher/mean-product-lifetime-plastic?tab=chart",
"https://ourworldindata.org/grapher/mean-product-lifetime-plastic?tab=chart",
"https://ourworldindata.org/grapher/plastic-waste-generation-total?tab=map",
];

const answerArray = [
"2050",
"1.72",
"9.29",
"19.05",
"142.6",
"65.71",
"0.5",
"5",
"2",
];
var height = score ? '600px' : '100%';
questionElement.textContent = textArray[score];
window.onload = createIframe(srcArray[score], height);
currentAnswer = Number(answerArray[score]);
}

function checkAnswer() {
const userAnswer = Number(answerElement.value);

if (userAnswer === currentAnswer) {
resultElement.textContent = 'Correct!';
resultElement.style.color = 'green';
score++;
} else {
resultElement.textContent = `Incorrect. The correct answer is ${currentAnswer}.`;
resultElement.style.color = 'red';
}

scoreElement.textContent = score;
answerElement.value = '';

var iframes = document.querySelectorAll('iframe');
iframes.forEach(iframe => iframe.remove());

if (score < 9) {
generateQuestion();
} else {
    questionElement.textContent = "Refresh to play again.\n\n Or if you would like, help Team Pikabotz grow this petition."
    createIframe('images/petition.png');
    resultElement.textContent = 'Thank you for your support!';
    answerElement.remove();
    submitButton.innerHTML = 'Sign Petition';
    submitButton.removeEventListener('click', checkAnswer);
    submitButton.addEventListener('click', () => {
        window.location.href = "https://chng.it/jMxf2NwrKf";
    });
}
}

function createIframe(src, height='600px') {
var iframe = document.createElement('iframe');
iframe.src = src;
iframe.loading="lazy";
iframe.style.width= '100%';
iframe.style.height= height;
iframe.style.border= 'none';
iframeElement.appendChild(iframe);
}

submitButton.addEventListener('click', checkAnswer);
answerElement.addEventListener('keypress', function(event) {
if (event.key === 'Enter') {
    checkAnswer();
}
});

generateQuestion();