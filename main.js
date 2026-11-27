// import html content
const startBtn = document.getElementById('startBtn');
const main = document.getElementById('main');
const game = document.getElementById('game');

// start the game
startBtn.addEventListener('click', () => {
    main.classList.add('play');
    play();
});

function ran(level) {
    return Math.ceil(Math.random() * level);
}

let level = 10;
let score = 0;

const operation = ["+", "-", "/", "*"];

function play() {
    let x = ran(level);
    let y = ran(level);
    const op = operation[Math.floor(Math.random() * 4)];

    let answer;
    switch (op) {
        case '+':
            answer = x + y;
            break;
        case '-':
            if (y > x) [x, y] = [y, x];
            answer = x - y;
            break;
        case '*':
            answer = x * y;
            break;
        case '/':
            x = x * y;
            answer = x / y;
            break;
    }

    let choices = [answer];
    while (choices.length < 4) {
        const wrong = answer + ran(10) - 5;
        if (wrong >= 0 && !choices.includes(wrong)) {
            choices.push(wrong);
        }
    }

    choices.sort(() => Math.random() - 0.5);

    game.innerHTML = `
        <div class="mainCon">
            <p id="score">${score}</p>
            <div class="quest">
                <p>${x} ${op} ${y} = </p>
            </div>
            <div class="choises">
                ${choices.map(btn => `<button onclick="check(${btn}, ${answer})">${btn}</button>`).join("")}
            </div>
        </div>
    `;
}

function check(chosen, answer) {
    if (chosen === answer) {
        score++;
    } else {
        score = 0;
        main.classList.remove('play');
    }
    play();
}