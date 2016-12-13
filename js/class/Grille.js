var grille = function(size, density){
    this.size = size;
    this.density = density;
    this.tab = [];
    this.tree = [];
    this.tree_burn = [];
    this.Create();
}

grille.prototype.constructor = grille;

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
  //Recherche des arbres et stockage dans la liste
  var listTree = [];
  for(var i = 0; i < this.size; i++){
      for(var j = 0; j < this.size; j++){
          if(this.tab[i][j].exist){
              listTree.push(this.tab[i][j]);
          }
      }
  }

  //Déclaration d'une liste qui va contenir les arbres qui vont bruler
  var burnTree = [];
  var randTree = Math.floor(Math.random() * listTree.length);

  //Choix d'un arbre parmi ceux existant
  burnTree.push(listTree[randTree]);

  //Stockage initial
  var stepPrint = [];
  for(var x = 0; x < this.size; x++){

      console.log(this.tab[x][0].val, ' | ',this.tab[x][1].val, ' | ',this.tab[x][2].val, ' | ',this.tab[x][3].val, ' | ',this.tab[x][4].val);
      console.log('_______________________________');
  }
  console.log('ok1');
  stepPrint.push(this.tab);

  while(burnTree.length > 0){
    var i = burnTree[(burnTree.length-1)].x;  // On stocke les coordonnées.
    var j = burnTree[(burnTree.length-1)].y;
    //On retire l'arbre courant, et on le fait bruler
    burnTree.pop();
    this.tab[i][j].visite = 1;
    this.tab[i][j].val = 2;
    //On stocke la grille
    for(var x = 0; x < this.size; x++){

        console.log(this.tab[x][0].val, ' | ',this.tab[x][1].val, ' | ',this.tab[x][2].val, ' | ',this.tab[x][3].val, ' | ',this.tab[x][4].val);
        console.log('_______________________________');
    }

    console.log('ok2');
    stepPrint.push(this.tab);
    // On ajoute les voisins vide à notre liste.
    //Les voisins directs

    if(i>0){
      //voisin du haut
      if(this.tab[i-1][j].exist == 1 && this.tab[i-1][j].visite == 0){
          burnTree.push(this.tab[i-1][j]);
      }
    }

    if(i < this.size-1){
      //voisin du dessous
      if(this.tab[i+1][j].exist == 1 && this.tab[i+1][j].visite == 0){
          burnTree.push(this.tab[i+1][j]);
      }
    }

    if(j > 0){
      //voisin de gauche
      if(this.tab[i][j-1].exist == 1 && this.tab[i][j-1].visite == 0){
          burnTree.push(this.tab[i][j-1]);
      }
    }

    if(j < this.size-1){
      //voisin de droite
      if(this.tab[i][j+1].exist == 1 && this.tab[i][j+1].visite == 0){
          burnTree.push(this.tab[i][j+1]);
      }
    }

    //Les voisins diagonaux
    if(i>0 && j>0){
      //voisin haut gauche
      if(this.tab[i-1][j-1].exist == 1 && this.tab[i-1][j-1].visite == 0){
          burnTree.push(this.tab[i-1][j-1]);
      }
    }

    if(i>0 && j<this.size-1){
      //voisin haut droit
      if(this.tab[i-1][j+1].exist == 1 && this.tab[i-1][j+1].visite == 0){
          burnTree.push(this.tab[i-1][j+1]);
      }
    }

    if(j > 0 && i<this.size-1){
      //voisin bas gauche
      if(this.tab[i+1][j-1].exist == 1 && this.tab[i+1][j-1].visite == 0){
          burnTree.push(this.tab[i+1][j-1]);
      }
    }

    if(j < this.size-1 && i<this.size-1){
      //voisin bas droit
      if(this.tab[i+1][j+1].exist == 1 && this.tab[i+1][j+1].visite == 0){
          burnTree.push(this.tab[i+1][j+1]);
      }
    }
  }

  //return la liste
  for(var x = 0; x < this.size; x++){

      console.log(this.tab[x][0].val, ' | ',this.tab[x][1].val, ' | ',this.tab[x][2].val, ' | ',this.tab[x][3].val, ' | ',this.tab[x][4].val);
      console.log('_______________________________');
  }
  console.log('ok3');
  console.log(stepPrint);
  return stepPrint;
}

grille.prototype.PercoDiagRec = function(arbre = null){
    if(!arbre){
        var x = (Math.floor(Math.random()*this.size));
        var y = (Math.floor(Math.random()*this.size));
        var arbre = this.tab[x][y];
    }
    if(!arbre){
        console.log("do nothing");
    }else{
        if(arbre.exist){
            arbre.visite = 1;
            arbre.val = 2;
            this.tree_burn.push(arbre);
        }
        var voisin = this.getNeighbourhood(arbre.x, arbre.y);
        for(var i = 0; i < voisin.length; i++){
            if(voisin[i].visite == 0){
                this.PercoDiagRec(voisin[i]);
            }
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
