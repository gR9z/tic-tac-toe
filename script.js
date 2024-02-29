$(document).ready(function () {
    const player1img = 'croix.png';
    const player2img = 'rond.png';

    let currentPlayer = '1';

    const checkWin = () => {
        const combinaisons = [
            // Horizontal
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],

            // Vertical
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],

            // Diagonal
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const combinaison of combinaisons) {
            const [a, b, c] = combinaison.map((i) => {
                console.log(i);
                return $(`#image_${i}`).attr('src');
            });

            if (a === b && a === c) true;
            console.log('a = ', a);
            console.log('b = ', b);
            console.log('c = ', c);

            return false;
        }
    };
    const updateCell = (index) => {
        const imageSrc = currentPlayer === '1' ? player1img : player2img;

        $(`#${index}`).attr('src', `assets/images/${imageSrc}`);
    };

    $('td').on('click', (e) => {
        const imageID = $(e.target).attr('id');
        const imgSrc = $(e.target).attr('src');

        if (imgSrc) return;
        updateCell(imageID);
        checkWin();

        currentPlayer = currentPlayer === '1' ? '2' : '1';
        $('joueur').text(currentPlayer);
    });
});
