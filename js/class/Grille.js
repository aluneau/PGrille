var grille = function(size, density){
    this.size = size;
    this.density = density;
    this.tab = [];
    this.Create();
}

grille.prototype.constructor =   grille;

grille.prototype.Create = function(){

    for(var i = 0; i < this.size; i++){
        var temp = [];
        for(var j = 0; j< this.size; j++){
            if(Math.random()*100<=this.density){
                temp.push(new object(0, true, i, j));
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

grille.prototype.SetVal = function(x, y, val){
    this.tab[x][y].val = val;
}

grille.prototype.ReturnObj = function(x, y){
    return this.tab[x][y];
}

var object = function(val, exist, x, y){
    this.val = val;
    this.exist = exist;
    this.x = x;
    this.y = y;
}

object.prototype.constructor = object;
