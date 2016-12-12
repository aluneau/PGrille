TreeGenerator = function(scene, sd, g) {
    this.treeNumber = 50;
    this.step = 0;
    this._trees = [];
    this.scene = scene;
    this.minSizeBranch = 15;
    this.maxSizeBranch = 20;
    this.State = 0;
    this.minSizeTrunk = 10;
    this.maxSizeTrunk = 15;
    this.minRadius = 1;
    this.maxRadius = 5;
    this.g = g;
    this.sd = sd;

    this.generate();
};

TreeGenerator.prototype.generate = function() {

    this.clean();

    var randomNumber = function (min, max) {
        if (min == max) {
            return (min);
        }
        var random = Math.random();
        return ((random * (max - min)) + min);
    };

    var size,
        sizeTrunk, x, z, radius;
    var sizeGrille = this.g.percolateProp()[0].length;
    var percolationResult = this.g.percolateProp()[0];
    console.log(percolationResult);
    for (let i=0; i < sizeGrille; i++){
        for (let j=0; j < sizeGrille; j++){
          console.log("state", percolationResult[i][j].val);
          if(percolationResult[i][j].exist){
            size = (this.minSizeBranch+this.maxSizeBranch)/2;
            sizeTrunk = this.maxSizeTrunk;
            radius = randomNumber(this.minRadius,this.maxRadius);
            xTree=((percolationResult[i][j].x/sizeGrille)*400)-150;
            yTree = ((percolationResult[i][j].y/sizeGrille)*400)-150;
            var tree = new Tree(size, sizeTrunk, radius, scene, percolationResult[i][j].val ,this.sd);
            tree.position.x = xTree;
            tree.position.z = yTree;
            this._trees.push(tree);
          }
      }
    }
    // for (var i = 0; i<this.treeNumber; i++) {
    //     size = randomNumber(this.minSizeBranch,this.maxSizeBranch);
    //     sizeTrunk = randomNumber(this.minSizeTrunk,this.maxSizeTrunk);
    //     radius = randomNumber(this.minRadius,this.maxRadius);
    //     x = randomNumber(-300, 300);
    //     z = randomNumber(-300, 300);
    //
    //     var tree = new Tree(size, sizeTrunk, radius, scene, this.State ,this.sd);
    //     tree.position.x = x;
    //     tree.position.z = z;
    //     this._trees.push(tree);
    // }
};

TreeGenerator.prototype.clean = function() {
    this._trees.forEach(function(t) {
        t.dispose();
    });

    this._trees = [];
};
