// Test Algorithme percolation 

// Version propagation NB: plus tard, utiliser une proba de bruler ou non.
function percolateProp(grille, size){
    var array = [];
    // On stocke tous les arbres
    for(var i = 0; i < size; i++){
        for(var j = 0; j < size; j++){
            if(grille[i][j].empty == 1){
                array.push(grille[i][j]);
            }
        }
    }
    // TODO : make a rand on the liste
    var cible = [];
    // Le tableau qui contient l'arbre ciblé, auquel on ajoutera ses voisins
    cible.push(array[i]);
    while(cible.length > 0){
        var x = cible[length-1].x;  // On stocke les coordonnées.
        var y = cible[length-1].y;
        cible.pop();                // On supprime de la liste.
        grille[i][j].visite = 1; // a été visité
        // On ajoute les voisins vide à notre liste.
        if(i>0 && grille[i-1][j].empty == 1 && grille[i][j].visite == 0){
            cible.push(grille[i-1][j]);
        }
        if(i < size-1 && grille[i+1][j].empty == 1 && grille[i][j].visite == 0){
            cible.push(grille[i+1][j]);
        }
        if(j > 0 && grille[i][j-1].empty == 1 && grille[i][j].visite == 0){
            cible.push(grille[i][j-1]);
        }
        if(j < size-1 && grille[i][j+1].empty == 1 && grille[i][j].visite == 0){
            cible.push(grille[i][j+1]);
        }
    }
}

// Version café 
function percolateCaf(grille, size){
    var n = size
    var array = [];
    for(var j = 0; j<size; j++){
        if(grille[0][j].empty == 0){
            array.push(grille[0][j]);
        }
    }
    while(array.length > 0){
        var x = array[length-1].x;  // On stocke les coordonnées.
        var y = array[length-1].y;
        array.pop();                // On supprime de la liste.
        grille[i][j].visité = 1; // a été visité
        // On ajoute les voisins vide à notre liste.
        if(i>0 && grille[i-1][j].empty == 0){
            array.push(grille[i-1][j]);
        }
        if(i < size-1 && grille[i+1][j].empty == 0){
            array.push(grille[i+1][j]);
        }
        if(j > 0 && grille[i][j-1].empty == 0){
            array.push(grille[i][j-1]);
        }
        if(j < size-1 && grille[i][j+1].empty == 0){
            array.push(grille[i][j+1]);
        }
    }
}