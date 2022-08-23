let control_Buttons = document.querySelector('.control-buttons'),
    your_Name = document.querySelector('.name > span'),
    music_Background = document.querySelector('#background');

control_Buttons.onclick = function() {

    let the_Name = prompt('Whats Your Name?');

    if (the_Name == null || the_Name == '') {

        your_Name.innerHTML = 'Unknow';

    } else {
        your_Name.innerHTML = the_Name;
    };

    document.querySelector('.control-buttons').remove();

    music_Background.play();

    timer();

};


let duration = 1000,
    container_Game = document.querySelector('.container-game'),
    the_Blocks = Array.from(container_Game.children),
    the_Range = Array.from(Array(the_Blocks.length).keys());

shuffle(the_Range);

the_Blocks.forEach((block, index) => {

    block.style.order = the_Range[index];

    block.addEventListener('click', function() {

        flipped_Block(block);

    })

});

function timer() {


    let the_Time = setInterval(() => {

        let div_Timer = document.querySelector('.timer');

        if (div_Timer.textContent > 0) {

            div_Timer.textContent = div_Timer.textContent - 1;

        } else if (div_Timer.textContent == '0') {

            game_Over();

            clearInterval(the_Time);

            div_Timer.textContent = 'Game Over';

            container_Game.classList.add('no-clicking');

            the_Rate();

            document.querySelector('#endgame').play();

        };

    }, 1000);

};

function game_Over() {

    let the_Game_Over = document.querySelector('.game-over');

    the_Game_Over.classList.add('show');

    let the_Name_End = document.querySelector('.game-over .name');

    the_Name_End.innerHTML += your_Name.innerHTML;

    let the_tries = document.querySelector('.tries span');

    let the_Try = document.querySelector('.game-over .try');

    the_Try.innerHTML += the_tries.innerHTML;

    let the_But = document.querySelector('.game-over .but');

    music_Background.pause();

    the_But.onclick = function() {
        window.location.reload();
    };
};

function the_Win() {

    let class_Win = document.querySelector('.win');

    class_Win.classList.add('show');

    container_Game.classList.add('no-clicking');

    music_Background.pause();

}

function the_Rate() {

    let rate = document.querySelector('.rate');

    rate.classList.add('show');

    let win_Name = your_Name.innerHTML;

    let name_Rate = document.querySelector('.name-rate');

    name_Rate.innerHTML = win_Name;

    let the_tries = document.querySelector('.tries span');

    let num = document.querySelector('.num');

    num.innerHTML = the_tries.innerHTML;

}

function flipped_Block(flipped) {

    flipped.classList.add('is-flipped');

    let block_Filter = the_Blocks.filter((flipped_Blocks) => flipped_Blocks.classList.contains('is-flipped'));

    if (block_Filter.length === 2) {

        duration_Func();

        matching(block_Filter[0], block_Filter[1]);

    };

}

function duration_Func() {

    container_Game.classList.add('no-clicking');

    setTimeout(() => {

        container_Game.classList.remove('no-clicking');

    }, duration);

};

function matching(first_Element, second_Element) {

    if (first_Element.dataset.tec === second_Element.dataset.tec) {

        first_Element.classList.remove('is-flipped');
        second_Element.classList.remove('is-flipped');

        first_Element.classList.add('the-match');
        second_Element.classList.add('the-match');

        document.querySelector('#success').play();

    } else {

        let tries = document.querySelector('.tries span');

        tries.innerHTML = parseInt(tries.innerHTML) + 1;

        setTimeout(() => {

            first_Element.classList.remove('is-flipped');
            second_Element.classList.remove('is-flipped');

        }, duration);

        document.querySelector('#fail').play();

    }

}

function shuffle(array) {

    let currant = array.length,
        box,
        random;

    while (currant > 0) {

        random = Math.floor(Math.random() * the_Range.length);

        currant--;

        box = array[currant];

        array[currant] = array[random];

        array[random] = box;

    };

    return array;

}
