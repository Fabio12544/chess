
function main() {
    timer();
    refreshBoard();
    showPlayablePiece(timerInfo.isJ1Playing);
}

function refreshBoard() {
    
    for (let X = 0; X < grille.length; X++) {
        for (let Y = 0; Y < grille[X].length; Y++) {

            if (grille[X][Y] != "") {
                caseHTML = document.querySelector("#row_" + X + " #column_" + Y)

                caseHTML.innerHTML = grille[X][Y].char
            }
            else {
                caseHTML = document.querySelector("#row_" + X + " #column_" + Y)

                caseHTML.innerHTML = ""
            }

        }
    }
}


function switchTime() {

    timerInfo.isJ1Playing = !timerInfo.isJ1Playing

    //Change l'affichage du joueur qui joue (dans le header)
    let playerNumberHtml = document.querySelector("#player")
    if (playerNumberHtml.innerHTML == "1") {
        
        playerNumberHtml.innerHTML = 2
        
        // affichage des informations de l'autre joueur
        let minutes = Math.floor(timerInfo.J1/ 1000 / 60);
        let secondes = Math.floor((timerInfo.J1 / 1000) % 60);
        document.querySelector("#other_timer").innerHTML = minutes+ "m " + secondes + "s"
        document.querySelector("#other_player").innerHTML = "1"
        return;
    }
    
    // le cas ou c'est le Joueur 1 a jouer
    playerNumberHtml.innerHTML = 1

    let minutes = Math.floor(timerInfo.J2/ 1000 / 60);
    let secondes = Math.floor((timerInfo.J2 / 1000) % 60);
    document.querySelector("#other_timer").innerHTML = minutes+ "m " + secondes + "s"
    document.querySelector("#other_player").innerHTML = "2"
}

/**
 * Met en evidence les pieces que le joueur peut jouer
 * @param {*} Player //Player qui va jouer 
 */
function showPlayablePiece(Player)
{
    for (let X = 0; X < grille.length; X++) {
        for (let Y = 0; Y < grille[X].length; Y++) {

            if (grille[X][Y] != "") {
                
                //Joueur 1 qui Joue
                if(grille[X][Y].couleur == "black" && Player)
                {
                    let caseHTML = document.querySelector("#row_" + X + " #column_" + Y)

                    if(grille[X][Y].getAllMovablePlace().length != 0)
                    {
                        caseHTML.setAttribute("class", caseHTML.getAttribute("class") + " canBeSelected")
                    
                        console.log(grille[X][Y].name +" "+ grille[X][Y].couleur+" "+ " peut manger : ");
                        grille[X][Y].getAllMovablePlace().forEach(cell => {
                            console.log(grille[cell[1]][cell[0]]);
                        });
                    }
    
                }
                //Joueur 2 qui joue
                else if(grille[X][Y].couleur == "white" && !Player)
                {
                    let caseHTML = document.querySelector("#row_" + X + " #column_" + Y)

                    if(grille[X][Y].getAllMovablePlace().length != 0)
                    {
                        caseHTML.setAttribute("class", caseHTML.getAttribute("class") + " canBeSelected")

                        console.log(grille[X][Y].name +" "+ grille[X][Y].couleur+" "+ " peut manger : ");
                        grille[X][Y].getAllMovablePlace().forEach(cell => {
                            if(grille[X][Y].couleur != grille[cell[1]][cell[0]].couleur)
                            {
                                if(grille[cell[1]][cell[0]].name == "king")
                                {
                                    alert("ECHEC ET MAT");
                                }
                            }
                        });
                        
                    }
                }
            }
            else {
                caseHTML = document.querySelector("#row_" + X + " #column_" + Y)

                caseHTML.innerHTML = ""
            }

        }
    }
}

/**
 * Eneleve tout les marquage sur le plateau
 */
function clearBoardInformation()
{
    for (let X = 0; X < grille.length; X++) {
        for (let Y = 0; Y < grille[X].length; Y++) {

            let caseHTML = document.querySelector("#row_" + X + " #column_" + Y)
    
            caseHTML.setAttribute("class", caseHTML.getAttribute("class").split(' ')[0] + " " + caseHTML.getAttribute("class").split(' ')[1])
        }
    }
}

async function timer() {

    var x = setInterval(function () {
        let dureeTimer = 0;

        if (timerInfo.isJ1Playing) {
            dureeTimer = timerInfo.J1;
        }
        else
        {
            dureeTimer = timerInfo.J2;
        }

        let minutes = Math.floor(dureeTimer / 1000 / 60); // Calcul des minutes restantes
        let secondes = Math.floor((dureeTimer / 1000) % 60); // Calcul des secondes restantes

        // Afficher le temps restant
        document.querySelector("#timer").innerHTML = minutes+ "m " + secondes + "s"

        //Reduis le timer selon le joueur qui joue
        if (timerInfo.isJ1Playing) {
            timerInfo.J1 -= 1000;
        }
        else
        {
            timerInfo.J2 -= 1000;
        }

        // Si le timer est terminé
        if (timerInfo.J1 <= 0 || timerInfo.J2 <= 0) {
            clearInterval(x); // Arrêter le timer
            document.querySelector("#timer").innerHTML = "TEMPS ECOULER"
        }

    }, 1000);
}