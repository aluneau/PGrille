var grille = function(size, density){
    this.size = size;
    this.density = density;
    this.tab = [];
    this.tree = [];
    this.Create();
}

grille.prototype.constructor =   grille;

grille.prototype.Create = function(){

    for(var i = 0; i < this.size; i++){
        var temp = [];
        for(var j = 0; j< this.size; j++){
            if(Math.random()*100<=this.density){
                var newTree = new object(1, true, i, j);
                temp.push(newTree);
                this.tree.push(newTree);
            }else{
                temp.push(new object(0, false, i, j));
            }
        }
        this.tab.push(temp);
    }
}

grille.prototype.getNeighbourhood = function(x, y){
    var voisin = [];
    for(var i = x-1; i <= x+1; i++){
        for(var j = y-1; j <= y+1; j++){
            if((i>=0) && (j>=0) && (i<this.size) && (j<this.size)){
                if((i!=x)||(j!=y)){
                    if(this.tab[i][j].exist){
                        voisin.push(this.tab[i][j]);
                    }
                }
            }
        }
    }
    return voisin;
}

// Version propagation NB: plus tard, utiliser une proba de bruler ou non.
grille.prototype.percolateProp = function(){
    var array = [];
    // On stocke tous les arbres
    for(var i = 0; i < this.size; i++){
        for(var j = 0; j < this.size; j++){
            if(this.tab[i][j].exist){
                array.push(this.tab[i][j]);
            }
        }
    }

    var cible = [];
    // Le tableau qui contient l'arbre ciblé, auquel on ajoutera ses voisins
    var rand = Math.floor(Math.random() * array.length);
    cible.push(array[rand]);
    console.log(array);
    while(cible.length > 0){
        var i = cible[(cible.length-1)].x;  // On stocke les coordonnées.
        var j = cible[(cible.length-1)].y;
        cible.pop();                // On supprime de la liste.
        this.tab[i][j].visite = 1; // a été visité
        this.tab[i][j].val= 2; // a été brulé;


        //var voisin = this.getNeighbourhood(i, j);
        // On ajoute les voisins vide à notre liste.
        if(i>0 && this.tab[i-1][j].exist == 1 && this.tab[i-1][j].visite == 0){
            cible.push(this.tab[i-1][j]);
        }
        if(i < this.size-1 && this.tab[i+1][j].exist == 1 && this.tab[i+1][j].visite == 0){
            cible.push(this.tab[i+1][j]);
        }
        if(j > 0 && this.tab[i][j-1].exist == 1 && this.tab[i][j-1].visite == 0){
            cible.push(this.tab[i][j-1]);
        }
        if(j < this.size-1 && this.tab[i][j+1].exist == 1 && this.tab[i][j+1].visite == 0){
            cible.push(this.tab[i][j+1]);
        }
    }
}

grille.prototype.PercoDiagRec = function(arbre = 0){
    if(arbre == 0){
        var arbre = this.tree[(Math.floor(Math.random()*this.tree.length))];
    }
    arbre.visite = 1;
    arbre.val = 2;
    var voisin = this.getNeighbourhood(arbre.x, arbre.y);
    for(var i = 0; i < voisin.length; i++){
        if(voisin[i].visite == 0){
            this.PercoDiagRec(voisin[i]);
        }
    }
}

grille.prototype.SetVal = function(x, y, val){
    this.tab[x][y].val = val;
}

grille.prototype.ReturnObj = function(x, y){
    return this.tab[x][y];
}

var object = function(val, exist, x, y){
    this.val = val;
    this.exist = exist;
    this.visite = 0;
    this.x = x;
    this.y = y;
}

object.prototype.constructor = object;
