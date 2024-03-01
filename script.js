$(document).ready(function () {
    const IMAGES_SRC = '/assets/images';
    const player1img = 'croix.png';
    const player2img = 'rond.png';

    let currentPlayer = '1';
    let gameInProgress = true;
    let moveCounter = 0;

    const updateCell = (index) => {
        const imageSrc = currentPlayer === '1' ? player1img : player2img;

        $(`#${index}`).attr('src', `${IMAGES_SRC}/${imageSrc}`);
    };

    const checkWin = () => {
        const combinaisons = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],

            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],

            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const combinaison of combinaisons) {
            const [a, b, c] = combinaison.map((i) =>
                $(`#image_${i}`).attr('src')
            );

            if (a && a === b && a === c) {
                gameInProgress = false;
                return true;
            }
        }

        return false;
    };

    const checkDraw = () => {
        if (moveCounter === 9) {
            gameInProgress = false;
            return true;
        }

        return false;
    };

    const displayEndGameMessage = (message, color) => {
        return $(`<h3 id="info-game">${message}</h3>`)
            .appendTo($('h3'))
            .css('color', color);
    };

    const resetGame = () => {
        setTimeout(() => {
            $('img').each(function () {
                $(this).removeAttr('src');
            });

            currentPlayer = '1';
            moveCounter = 0;

            $('joueur').text(currentPlayer);
            $('#info-game').remove();

            gameInProgress = true;
        }, 3000);
    };

    const changePlayer = () => {
        currentPlayer = currentPlayer === '1' ? '2' : '1';
        $('joueur').text(currentPlayer);
    };

    $('img').on('click', (e) => {
        if (!gameInProgress) return;

        const imageID = $(e.target).attr('id');
        const imgSrc = $(e.target).attr('src');

        if (imgSrc) return;

        updateCell(imageID);
        moveCounter++;

        if (checkWin()) {
            displayEndGameMessage(
                `Player ${currentPlayer} won the game!`,
                'green'
            );
            resetGame();
        } else if (checkDraw()) {
            displayEndGameMessage("It's a draw!", 'orange');
            resetGame();
        } else {
            changePlayer();
        }
    });
});
