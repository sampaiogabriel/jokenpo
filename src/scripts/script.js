const score = {
    you_score: 0,
    cpu_score: 0
}

// -- Placar

const updateScore = (number_cpu, number_you) => {
    const score_cpu = document.querySelector("#score_cpu");
    const score_you = document.querySelector("#score_you");

    score_cpu.innerText = score.cpu_score = number_cpu;
    score_you.innerText = score.you_score = number_you;
}

const papel = document.querySelector('#papel');
const pedra = document.querySelector('#pedra');
const tesoura = document.querySelector('#tesoura');

papel.addEventListener('click', () => {
    play('papel');
});

pedra.addEventListener('click', () => {
    play('pedra');
});

tesoura.addEventListener('click', () => {
    play('tesoura');
});

/////////////////

const playCpu = () => {
    const value = Math.floor(Math.random() * (3 - 1) + 1);

    switch (value) {
        case 1:
            return 'papel';
            break;

        case 2:
            return 'pedra';
            break;

        case 3:
            return 'tesoura'
            break;
    }
}

const compareResult = (you, cpu) => {
    if (you === cpu) {
        return 'empate';
    }

    if (you === 'pedra' && cpu === 'papel') {
        return 'cpu';
    }

    if (you === 'papel' && cpu === 'tesoura') {
        return 'cpu';
    }

    if (you === 'tesoura' && cpu === 'pedra') {
        return 'cpu';
    }

    return 'you';
}

const addResultScore = (winner) => {
    if (winner === 'cpu') {
        score.cpu_score += 1;
    }

    if (winner === 'you') {
        score.you_score += 1;
    }

    return score;
}

const updateScoreInfo = (winner) => {

    const score_info = document.querySelector('#score_info');

    if (winner === 'empate') {
        score_info.innerText = 'Empate! 😐'
    }

    if (winner === 'cpu') {
        score_info.innerText = 'Perdeu! 😞'
    }

    if (winner === 'you') {
        score_info.innerText = 'Ganhou! 😍'
    }

}

const cardBackground = (card, background) => {

    if (background === 'pedra') {
        card.classList.add('background-pedra');
    } else if (background === 'papel') {
        card.classList.add('background-papel');
    } else if (background === 'tesoura') {
        card.classList.add('background-tesoura');
    }

}

const cardBackgroundReset = (card) => {
    card.classList.remove('background-pedra');
    card.classList.remove('background-papel');
    card.classList.remove('background-tesoura');
}

const cardFlip = (play_you, play_cpu) => {
    const game_cpu_move = document.querySelector('#game-cpu-move');
    const game_you_move = document.querySelector('#game-you-move');

    const card_cpu_face = document.querySelector('#game_cpu_card_face_back');
    const card_you_face = document.querySelector('#game_you_card_face_back');

    const card_cpu = document.querySelector('.card-cpu');
    const card_you = document.querySelector('.card-you');

    cardBackgroundReset(card_cpu_face);
    cardBackgroundReset(card_you_face);

    if (play_you === 'pedra') {
        game_you_move.innerText = '✊'
        cardBackground(card_you_face, play_you);
    } else if (play_you === 'papel') {
        game_you_move.innerText = '✋'
        cardBackground(card_you_face, play_you);
    } else if (play_you === 'tesoura') {
        game_you_move.innerText = '✌️'
        cardBackground(card_you_face, play_you);
    }

    if (play_cpu === 'pedra') {
        game_cpu_move.innerText = '✊'
        cardBackground(card_cpu_face, "pedra");
    } else if (play_cpu === 'papel') {
        game_cpu_move.innerText = '✋'
        cardBackground(card_cpu_face, "papel");
    } else if (play_cpu === 'tesoura') {
        game_cpu_move.innerText = '✌️'
        cardBackground(card_cpu_face, "tesoura");
    }

    card_cpu.classList.toggle('is-flipped');
    card_you.classList.toggle('is-flipped');
}


const blockPlay = () => {
    papel.removeEventListener('click', () => {}, false);
}

const resetFlipCard = () => {
    const card_cpu = document.querySelector('.card-cpu');
    const card_you = document.querySelector('.card-you');

    card_cpu.classList.toggle('is-flipped');
    card_you.classList.toggle('is-flipped');
}

const loadingCard = () => {

    setTimeout(() => {
        blockPlay();
        resetFlipCard();
    }, 2000)

}

const play = (play_you) => {
    const play_cpu = playCpu();
    const winner = compareResult(play_you, play_cpu);;

    cardFlip(play_you, play_cpu);

    loadingCard();

    addResultScore(winner);
    updateScore(score.cpu_score, score.you_score);
    updateScoreInfo(winner);

}






