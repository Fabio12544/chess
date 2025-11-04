class piece{
    
    /**
     * 
     * @param {*} name 
     * @param {*} char 
     * @param {*} couleur 
     * @param {*} positionX 
     * @param {*} positionY 
     * @param {*} point 
     */
    
    constructor(name, char, couleur, positionX, positionY, point)
    {
        this.name = name;
        this.char = char;
        this.couleur = couleur
        this.positionX = positionX;
        this.positionY = positionY;
        this.point = point;
    }

    
}

class pawns extends piece {
    
    /**
     * 
     * @param {string} name 
     * @param {string} char 
     * @param {int} positionX 
     * @param {int} positionY 
     * @param {*} point 
     * @param {boolean} hasBeenMoved 
     */
    constructor(name, char, couleur, positionX, positionY, point, hasBeenMoved)
    {   
        super(name, char, couleur , positionX, positionY, point);

        this.hasBeenMoved = hasBeenMoved; 
    }

    getAllMovablePlace()
    {
        let movablePlaces = [];
        
        if(!this.hasBeenMoved)
        {
            if(this.couleur == "white" && grille[this.positionY - 1][this.positionX] == "")
            {
                movablePlaces.push([this.positionX, this.positionY - 1], [this.positionX, this.positionY - 2])
            }
            else if(this.couleur == "black" && grille[this.positionY + 1][this.positionX] == "")
            {
                movablePlaces.push([this.positionX, this.positionY + 1], [this.positionX, this.positionY + 2])
            }
        }

        if(this.couleur == "white" && grille[this.positionY - 1][this.positionX] == "")
        {
            movablePlaces.push([this.positionX, this.positionY - 1])
        }
        else if(this.couleur == "black" && grille[this.positionY + 1][this.positionX] == "")
        {
            movablePlaces.push([this.positionX, this.positionY + 1])
        }

        let calculPositionY = this.positionY;

        if(this.couleur == "black")
        {
            calculPositionY += 1;
        }
        else if(this.couleur == "white")
        {
            calculPositionY -= 1;
        }

        //Verifie si on ne sort pas de la grille diagonal droite
        if(this.positionX + 1 <= 7 && grille[calculPositionY][this.positionX + 1] != "")
        {
            movablePlaces.push([[this.positionX + 1], [calculPositionY]])
        }

        //Verifie si on ne sort pas de la grille diagonal gauche
        if(this.positionX - 1 >= 0 && grille[calculPositionY][this.positionX - 1] != "")
        {
            
            movablePlaces.push([[this.positionX - 1], [calculPositionY]])
        }


        return movablePlaces;

    }
}

class king extends piece{

    constructor(name, char, couleur, positionX, positionY, point)
    {   
        super(name, char, couleur , positionX, positionY, point);

    }

    getAllMovablePlace()
    {

        let movablePlaces = [];

        //Bas Droite
        let Y = this.positionY + 1;
        let X = this.positionX + 1;

        if(Y < 8 && X < 8 && (grille[Y][X] == "" || grille[Y][X].couleur != this.couleur))
        {
            movablePlaces.push([X, Y])
        }

        //Bas
        Y = this.positionY + 1;
        X = this.positionX;

        if(Y < 8 && (grille[Y][X] == "" || grille[Y][X].couleur != this.couleur))
        {
            movablePlaces.push([X, Y])
        }

        //Bas Gauche
        Y = this.positionY + 1;
        X = this.positionX - 1;

        if(Y < 8 && X >= 0 && (grille[Y][X] == "" || grille[Y][X].couleur != this.couleur))
        {
            movablePlaces.push([X, Y])
        }

        //Gauche
        Y = this.positionY;
        X = this.positionX - 1;

        if(X >= 0 && (grille[Y][X] == "" || grille[Y][X].couleur != this.couleur))
        {
            movablePlaces.push([X, Y])
        }

        //Haut Gauche
        Y = this.positionY - 1;
        X = this.positionX - 1;

        if(X >= 0 && Y >= 0 && (grille[Y][X] == "" || grille[Y][X].couleur != this.couleur))
        {
            movablePlaces.push([X, Y])
        }

        //Haut
        Y = this.positionY - 1;
        X = this.positionX;

        if(Y >= 0 && (grille[Y][X] == "" || grille[Y][X].couleur != this.couleur))
        {
            movablePlaces.push([X, Y])
        }

        //Haut Droite
        Y = this.positionY - 1;
        X = this.positionX + 1;

        if(Y >= 0 && X >= 0 && (grille[Y][X] == "" || grille[Y][X].couleur != this.couleur))
        {
            movablePlaces.push([X, Y])
        }

        //Droite
        Y = this.positionY;
        X = this.positionX + 1;

        if(X >= 0 && (grille[Y][X] == "" || grille[Y][X].couleur != this.couleur))
        {
            movablePlaces.push([X, Y])
        }

        return movablePlaces;
    }
}

class tower extends piece{

    constructor(name, char, couleur, positionX, positionY, point)
    {   
        super(name, char, couleur , positionX, positionY, point);

    }

    getAllMovablePlace()
    {
        let movableCases = [];
        for (let index = this.positionX + 1; index <= 7; index++) {
            
            //Sort de la boucle si il y a un pion
            if(grille[this.positionY][index] != "")
            {
                //Verifie si le pion est de l'equipe adverse
                if(grille[this.positionY][index].couleur == this.couleur)
                {
                    break;
                }
                else
                {
                    //Si oui ajoute la case pour le manger
                    movableCases.push([index, this.positionY]);
                    break;
                }
            }

            movableCases.push([index, this.positionY]); // Droite
        }

        for (let index = this.positionY + 1; index <= 7; index++) {
            //Sort de la boucle si il y a un pion
            if(grille[index][this.positionX] != "")
            {
                //Verifie si le pion est de l'equipe adverse
                if(grille[index][this.positionX].couleur == this.couleur)
                {
                    break;
                }
                else
                {
                    //Si oui ajoute la case pour le manger
                    movableCases.push([this.positionX, index]);
                    break;
                }
            }

            movableCases.push([this.positionX, index]); //Bas
        }

        for (let index = this.positionX - 1; index >= 0; index--) {
            
            //Sort de la boucle si il y a un pion
            if(grille[this.positionY][index] != "")
            {
                //Verifie si le pion est de l'equipe adverse
                if(grille[this.positionY][index].couleur == this.couleur)
                {
                    break;
                }
                else
                {
                    //Si oui ajoute la case pour le manger
                    movableCases.push([index, this.positionY]);
                    break;
                }
            }
            
            movableCases.push([index, this.positionY]); //Gauche
        }
        
        for (let index = this.positionY - 1; index >= 0; index--) {
            
            //Sort de la boucle si il y a un pion
            if(grille[index][this.positionX] != "")
            {
                //Verifie si le pion est de l'equipe adverse
                if(grille[index][this.positionX].couleur == this.couleur)
                {
                    break;
                }
                else
                {
                    //Si oui ajoute la case pour le manger
                    movableCases.push([this.positionX, index]);
                    break;
                }
            }

            movableCases.push([this.positionX, index]); //Haut
        }

        return movableCases;
    }
}

//Fou
class bishop extends piece{
    
    constructor(name, char, couleur, positionX, positionY, point)
    {   
        super(name, char, couleur , positionX, positionY, point);

    }

    getAllMovablePlace()
    {
        let movableCases = [];

        let X = this.positionX + 1;

        //Bas Droite
        for (let Y = this.positionY + 1; Y < 8; Y++) {
            
            //Verifie si la case est libre
            if(X < 8 && grille[Y][X] == "")
            {
                movableCases.push([X, Y]);
            }
            //Verifie si la case est un enemi
            else if(X < 8 && grille[Y][X].couleur != this.couleur)
            {
                movableCases.push([X, Y]);
                break;
            }
            else
            {
                break;
            }
            
            X++;
        }

        //Bas Gauche

        X = this.positionX - 1;

        for (let Y = this.positionY + 1; Y < 8; Y++) {
            
            //Verifie si la case est libre
            if(X >= 0 && grille[Y][X] == "")
            {
                movableCases.push([X, Y]);
            }
            //Verifie si la case est un enemi
            else if(X >= 0 && grille[Y][X].couleur != this.couleur)
            {
                movableCases.push([X, Y]);
                break;
            }
            else
            {
                break;
            }
            
            X--;
        }

        //Haut Droite

        X = this.positionX + 1;
        
        for (let Y = this.positionY - 1; Y >= 0; Y--) {
            
            //Verifie si la case est libre
            if(X < 8 && grille[Y][X] == "")
            {
                movableCases.push([X, Y]);
            }
            //Verifie si la case est un enemi
            else if(X < 8 && grille[Y][X].couleur != this.couleur)
            {
                movableCases.push([X, Y]);
                break;
            }
            else
            {
                break;
            }
            
            X++;
        }

        //Haut Gauche

        X = this.positionX - 1;

        for (let Y = this.positionY - 1; Y >= 0; Y--) {
            
            //Verifie si la case est libre
            if(X >= 0 && grille[Y][X] == "")
            {
                movableCases.push([X, Y]);
            }
            //Verifie si la case est un enemi
            else if(X >= 0 && grille[Y][X].couleur != this.couleur)
            {
                movableCases.push([X, Y]);
                break;
            }
            else
            {
                break;
            }
            
            X--;
        }

        return movableCases;
    }
}

//Reine
class queen extends piece{

    constructor(name, char, couleur, positionX, positionY, point)
    {   
        super(name, char, couleur , positionX, positionY, point);
    }

    getAllMovablePlace()
    {
        let movableCases = [];

        let X = this.positionX + 1;

        //Bas Droite
        for (let Y = this.positionY + 1; Y < 8; Y++) {
            
            //Verifie si la case est libre
            if(X < 8 && grille[Y][X] == "")
            {
                movableCases.push([X, Y]);
            }
            //Verifie si la case est un enemi
            else if(X < 8 && grille[Y][X].couleur != this.couleur)
            {
                movableCases.push([X, Y]);
                break;
            }
            else
            {
                break;
            }
            
            X++;
        }

        //Bas Gauche

        X = this.positionX - 1;

        for (let Y = this.positionY + 1; Y < 8; Y++) {
            
            //Verifie si la case est libre
            if(X >= 0 && grille[Y][X] == "")
            {
                movableCases.push([X, Y]);
            }
            //Verifie si la case est un enemi
            else if(X >= 0 && grille[Y][X].couleur != this.couleur)
            {
                movableCases.push([X, Y]);
                break;
            }
            else
            {
                break;
            }
            
            X--;
        }

        //Haut Droite

        X = this.positionX + 1;
        
        for (let Y = this.positionY - 1; Y >= 0; Y--) {
            
            //Verifie si la case est libre
            if(X < 8 && grille[Y][X] == "")
            {
                movableCases.push([X, Y]);
            }
            //Verifie si la case est un enemi
            else if(X < 8 && grille[Y][X].couleur != this.couleur)
            {
                movableCases.push([X, Y]);
                break;
            }
            else
            {
                break;
            }
            
            X++;
        }

        //Haut Gauche

        X = this.positionX - 1;

        for (let Y = this.positionY - 1; Y >= 0; Y--) {
            
            //Verifie si la case est libre
            if(X >= 0 && grille[Y][X] == "")
            {
                movableCases.push([X, Y]);
            }
            //Verifie si la case est un enemi
            else if(X >= 0 && grille[Y][X].couleur != this.couleur)
            {
                movableCases.push([X, Y]);
                break;
            }
            else
            {
                break;
            }
            
            X--;
        }

        for (let index = this.positionX + 1; index <= 7; index++) {
            
            //Sort de la boucle si il y a un pion
            if(grille[this.positionY][index] != "")
            {
                //Verifie si le pion est de l'equipe adverse
                if(grille[this.positionY][index].couleur == this.couleur)
                {
                    break;
                }
                else
                {
                    //Si oui ajoute la case pour le manger
                    movableCases.push([index, this.positionY]);
                    break;
                }
            }

            movableCases.push([index, this.positionY]); // Droite
        }

        for (let index = this.positionY + 1; index <= 7; index++) {
            //Sort de la boucle si il y a un pion
            if(grille[index][this.positionX] != "")
            {
                //Verifie si le pion est de l'equipe adverse
                if(grille[index][this.positionX].couleur == this.couleur)
                {
                    break;
                }
                else
                {
                    //Si oui ajoute la case pour le manger
                    movableCases.push([this.positionX, index]);
                    break;
                }
            }

            movableCases.push([this.positionX, index]); //Bas
        }

        for (let index = this.positionX - 1; index >= 0; index--) {
            
            //Sort de la boucle si il y a un pion
            if(grille[this.positionY][index] != "")
            {
                //Verifie si le pion est de l'equipe adverse
                if(grille[this.positionY][index].couleur == this.couleur)
                {
                    break;
                }
                else
                {
                    //Si oui ajoute la case pour le manger
                    movableCases.push([index, this.positionY]);
                    break;
                }
            }
            
            movableCases.push([index, this.positionY]); //Gauche
        }
        
        for (let index = this.positionY - 1; index >= 0; index--) {
            
            //Sort de la boucle si il y a un pion
            if(grille[index][this.positionX] != "")
            {
                //Verifie si le pion est de l'equipe adverse
                if(grille[index][this.positionX].couleur == this.couleur)
                {
                    break;
                }
                else
                {
                    //Si oui ajoute la case pour le manger
                    movableCases.push([this.positionX, index]);
                    break;
                }
            }

            movableCases.push([this.positionX, index]); //Haut
        }

        return movableCases;
    }
}

class knight extends piece{
    
    constructor(name, char, couleur, positionX, positionY, point)
    {   
        super(name, char, couleur , positionX, positionY, point);
    }

    getAllMovablePlace()
    {
        let movableCases = [];

        let X = this.positionX + 1;
        let Y = this.positionY + 2;

        //Bas Droite Haut
        if(X < 8 && Y < 8 && grille[Y][X] == "")
        {
            movableCases.push([X, Y]);
        }

        X = this.positionX + 2;
        Y = this.positionY + 1;

        //Bas Droite Bas
        if(X < 8 && Y < 8 && grille[Y][X] == "")
        {
            movableCases.push([X, Y]);
        }

        X = this.positionX - 1;
        Y = this.positionY + 2;

        //Bas Gauche Haut
        if(X >= 0 && Y < 8 && grille[Y][X] == "")
        {
            movableCases.push([X, Y]);
        }

        X = this.positionX - 2;
        Y = this.positionY + 1;

        //Bas Gauche Bas
        if(X >= 0 && Y < 8 && grille[Y][X] == "")
        {
            movableCases.push([X, Y]);
        }

        X = this.positionX + 1;
        Y = this.positionY - 2;

        //Haut Droite Haut
        if(X < 8 && Y >= 0 && grille[Y][X] == "")
        {
            movableCases.push([X, Y]);
        }

        X = this.positionX + 2;
        Y = this.positionY - 1;

        //Haut Droite Bas
        if(X < 8 && Y >= 0 && grille[Y][X] == "")
        {
            movableCases.push([X, Y]);
        }

        X = this.positionX - 1;
        Y = this.positionY - 2;

        //Haut Gauche Haut
        if(X >= 0 && Y >= 0 && grille[Y][X] == "")
        {
            movableCases.push([X, Y]);
        }

        X = this.positionX - 2;
        Y = this.positionY - 1;

        //Haut Gauche Bas
        if(X >= 0 && Y >= 0 && grille[Y][X] == "")
        {
            movableCases.push([X, Y]);
        }

        return movableCases;
    }
}

equipeBlanc = [];

equipeNoir = []; 

//l'equipe du Joueur 1

equipeNoir["tower_0"] = new tower("tower", "&#9820;", "black", 0, 0, 3);
equipeNoir["tower_1"] = new tower("tower", "&#9820;", "black", 7, 0, 3);
equipeNoir["king_0"] = new king("king", "&#9818;", "black", 4, 0, 3);
equipeNoir["bishop_0"] = new bishop("bishop", "&#9821;", "black", 2, 0, 3);
equipeNoir["bishop_1"] = new bishop("bishop", "&#9821;", "black", 5, 0, 3);
equipeNoir["queen_0"] = new queen("queen", "&#9819;", "black", 3, 0, 3);
equipeNoir["knight_0"] = new knight("knight", "&#9822;", "black", 1, 0, 3);
equipeNoir["knight_1"] = new knight("knight", "&#9822;", "black", 6, 0, 3);

equipeNoir["pawns_0"] = new pawns("pawns", "&#9823;", "black", 0, 1, 1, false);
equipeNoir["pawns_1"] = new pawns("pawns", "&#9823;", "black", 1, 1, 1, false);
equipeNoir["pawns_2"] = new pawns("pawns", "&#9823;", "black", 2, 1, 1, false);
equipeNoir["pawns_3"] = new pawns("pawns", "&#9823;", "black", 3, 1, 1, false);
equipeNoir["pawns_4"] = new pawns("pawns", "&#9823;", "black", 4, 1, 1, false);
equipeNoir["pawns_5"] = new pawns("pawns", "&#9823;", "black", 5, 1, 1, false);
equipeNoir["pawns_6"] = new pawns("pawns", "&#9823;", "black", 6, 1, 1, false);
equipeNoir["pawns_7"] = new pawns("pawns", "&#9823;", "black", 7, 1, 1, false);

//l'equipe du Joueur 2

equipeBlanc["tower_0"] = new tower("tower", "&#9814;", "white", 0, 7, 3);
equipeBlanc["tower_1"] = new tower("tower", "&#9814;", "white", 7, 7, 3);
equipeBlanc["king_0"] = new king("king", "&#9812;", "white", 4, 7, 3);
equipeBlanc["bishop_0"] = new bishop("bishop", "&#9815;", "white", 2, 7, 3);
equipeBlanc["bishop_1"] = new bishop("bishop", "&#9815;", "white", 5, 7, 3);
equipeBlanc["queen_0"] = new queen("queen", "&#9813;", "white", 3, 7, 3);
equipeBlanc["knight_0"] = new knight("knight", "&#9816;", "white", 1, 7, 3);
equipeBlanc["knight_1"] = new knight("knight", "&#9816;", "white", 6, 7, 3);

equipeBlanc["pawns_0"] = new pawns("pawns", "&#9817;", "white", 0, 6, 1, false);
equipeBlanc["pawns_1"] = new pawns("pawns", "&#9817;", "white", 1, 6, 1, false);
equipeBlanc["pawns_2"] = new pawns("pawns", "&#9817;", "white", 2, 6, 1, false);
equipeBlanc["pawns_3"] = new pawns("pawns", "&#9817;", "white", 3, 6, 1, false);
equipeBlanc["pawns_4"] = new pawns("pawns", "&#9817;", "white", 4, 6, 1, false);
equipeBlanc["pawns_5"] = new pawns("pawns", "&#9817;", "white", 5, 6, 1, false);
equipeBlanc["pawns_6"] = new pawns("pawns", "&#9817;", "white", 6, 6, 1, false);
equipeBlanc["pawns_7"] = new pawns("pawns", "&#9817;", "white", 7, 6, 1, false);

grille = [[equipeNoir["tower_0"],equipeNoir["knight_0"],equipeNoir["bishop_0"],equipeNoir["queen_0"],equipeNoir["king_0"],equipeNoir["bishop_1"],equipeNoir["knight_1"],equipeNoir["tower_1"]],
        [equipeNoir["pawns_0"],equipeNoir["pawns_1"],equipeNoir["pawns_2"],equipeNoir["pawns_3"],equipeNoir["pawns_4"],equipeNoir["pawns_5"],equipeNoir["pawns_6"],equipeNoir["pawns_7"]],
        ["","","","","","","",""],
        ["","","","","","","",""],
        ["","","","","","","",""],
        ["","","","","","","",""],
        [equipeBlanc["pawns_0"],equipeBlanc["pawns_1"],equipeBlanc["pawns_2"],equipeBlanc["pawns_3"],equipeBlanc["pawns_4"],equipeBlanc["pawns_5"],equipeBlanc["pawns_6"],equipeBlanc["pawns_7"]],
        [equipeBlanc["tower_0"],equipeBlanc["knight_0"],equipeBlanc["bishop_0"],equipeBlanc["queen_0"],equipeBlanc["king_0"],equipeBlanc["bishop_1"],equipeBlanc["knight_1"],equipeBlanc["tower_1"]]]
