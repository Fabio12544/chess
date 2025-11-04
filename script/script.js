


let chessboard = document.querySelector("#chessboard")

var selectedInfo =
{
    X: 0,
    Y: 0,
    selected: false
}


// Set the date we're counting down to
let dateActuelle = new Date();
dateActuelle.setMinutes(dateActuelle.getMinutes() + 10)

var timerInfo =
{
    //Recupere le temps de 10min
    J1: 10 * 60 * 1000,
    J2: 10 * 60 * 1000,

    //Permet de determiner si c'est le J1 ou J2 qui joue
    isJ1Playing: true,
}

chessboard.addEventListener("mousedown", function (event) {
    //Recupere la position du div dans la page
    divPos = chessboard.getBoundingClientRect();

    //Calcule la position relative de la souris dans le div "chessboard"
    x = Math.floor((event.clientX - divPos.left) / 60) // 60 = Taille des cases
    y = Math.floor((event.clientY - divPos.top) / 60)

    console.log("X : " + x + " Y : " + y);


    //SelectedCase
    if (grille[y][x] != "" && !selectedInfo.selected) {

        clearBoardInformation();

        selectedInfo.selected = true;
        let caseHtml = document.querySelector("#row_" + y + " " + "#column_" + x)

        caseHtml.setAttribute("class", caseHtml.getAttribute("class") + " selected")

        let movablePlaces = grille[y][x].getAllMovablePlace();

        selectedInfo.X = x;
        selectedInfo.Y = y;

        if(movablePlaces.length != 0)
        {

            for (let index = 0; index < movablePlaces.length; index++) {

                //Verifie si les case ne sorte pas plateau
                if (movablePlaces[index][1] <= 7 && movablePlaces[index][0] <= 7 &&
                    movablePlaces[index][1] >= 0 && movablePlaces[index][0] >= 0) {

                    if (grille[movablePlaces[index][1]][movablePlaces[index][0]] == "") {
                        let moveCase = document.querySelector("#row_" + movablePlaces[index][1] + " " + "#column_" + movablePlaces[index][0])

                        moveCase.setAttribute("class", moveCase.getAttribute("class") + " movableCase")
                    }
                    else if (grille[movablePlaces[index][1]][movablePlaces[index][0]].couleur != grille[selectedInfo.Y][selectedInfo.X].couleur) 
                    {
                        let moveCase = document.querySelector("#row_" + movablePlaces[index][1] + " " + "#column_" + movablePlaces[index][0])

                        moveCase.setAttribute("class", moveCase.getAttribute("class") + " killableCase")

                    }

                }

            }
        
        }
        else
        {
            selectedInfo.selected = false;
            clearBoardInformation();
            showPlayablePiece(timerInfo.isJ1Playing);
        }
    }
    //PourJouer
    else if ((grille[y][x] == "" || grille[y][x].couleur != grille[selectedInfo.Y][selectedInfo.X].couleur) && selectedInfo.selected) {

        let canMove = false;
        
        //Uniquement utiliser si le pion qui bouge est de type "pawns"
        //let eatOpenent = false;

        grille[selectedInfo.Y][selectedInfo.X].getAllMovablePlace().forEach(element => {
            //Verifie si la case selectionner correspondes au case ou le pion peut se déplacer
            if (element[0] == x && element[1] == y) {
                canMove = true;

                if(element.length > 2)
                {
                    eatOpenent = true;
                }
            }

        });

        if (canMove) {

            //Reinitialise l'affichage des case
            clearBoardInformation();

            grille[selectedInfo.Y][selectedInfo.X].getAllMovablePlace().forEach(element => {

                //Verifie si les case ne sorte pas plateau
                if (element[1] <= 7 && element[0] <= 7 &&
                    element[1] >= 0 && element[0] >= 0) {
                    //Retire l'affichage des cases déplacables
                    let caseHtmlMovable = document.querySelector("#row_" + element[1] + " " + "#column_" + element[0])

                    caseHtmlMovable.setAttribute("class", caseHtmlMovable.getAttribute("class").split(' ')[0] + " " + caseHtmlMovable.getAttribute("class").split(' ')[1])
                }

            });

            //Definie sur true le premier mouvement
            grille[selectedInfo.Y][selectedInfo.X].hasBeenMoved = true;

            //Definie la nouvelle case avec le pion de l'ancienne case 
            grille[y][x] = grille[selectedInfo.Y][selectedInfo.X];

            //Definie la position dans les pions
            grille[y][x].positionX = x
            grille[y][x].positionY = y

            //Enleve le pion de l'ancienne case
            grille[selectedInfo.Y][selectedInfo.X] = "";
            selectedInfo.selected = false;

            switchTime();

            showPlayablePiece(timerInfo.isJ1Playing);
        }

        refreshBoard();
    }
})


main();


