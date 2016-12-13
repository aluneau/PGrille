var limit = 50;
var iteration = 0;

var affichageIteration=0;

var steps = [];
var x_Grille = 15;
var y_Grille = 15;
function new_forest(x,y)
{
	var forest = {
			toto: 0,
	    X: x_Grille,
	    Y: y_Grille,
	    propTree: 0.5,
	    propTree2: 0,
	    propBurn: 0.0025,
	    t: [],
	    c: ['rgb(255,255,255)', 'rgb(0,255,0)', 'rgb(255,0,0)', 'rgb(0,0,255)']
	};

	for(var i = 0; i < forest.Y; i++) {
	    forest.t[i] = [];
	}

	return forest;
}

function init_forest(forest)
{
	for(var i = 0; i < forest.Y; i++) {
			for(var j = 0; j < forest.Y; j++) {
					forest.t[i][j] = Math.random() < forest.propTree ? 1 : 0;
			}
			forest.toto = 0;
	}
}


var forest = new_forest();
init_forest(forest);

function afterLoad(forest) {
    var canvas = document.getElementById('canvas');
    var c = canvas.getContext('2d');
    for(var i = 0; i < forest.X; i++) {
        for(var j = 0; j < forest.Y; j++) {
            c.fillStyle = forest.c[forest.t[i][j]];
            c.fillRect(10*j, 10*i, 10*j+9, 10*i+9);
        }
    }
}

function doStep(forest) {
    var to = [];
    for(var i = 0; i < forest.Y; i++) {
        to[i] = forest.t[i].slice(0);
    }

		var n_forest = new_forest();

		for(var i = 0; i < forest.Y; i++) {
		    n_forest.t[i] = [];
			}

    //indices outside the array are undefined; which converts to 0=empty on forced typecast
    for(var i = 0; i < forest.Y; i++) {
        for(var j = 0; j < forest.Y; j++) {
            if(0 == to[i][j]) {
                n_forest.t[i][j] = Math.random() < forest.propTree2 ? 1 : 0;
            } else if(1 == to[i][j]) {
                if(
                    ((i>0) && (2 == to[i-1][j])) ||
                    ((i<forest.Y-1) && (2 == to[i+1][j])) ||
                    ((j>0) && (2 == to[i][j-1])) ||
                    ((j<forest.X-1) && (2 == to[i][j+1]))
                    ) {
                    n_forest.t[i][j] = 2;
                } else {
                    n_forest.t[i][j] = Math.random() < forest.propBurn ? 2 : 1;
                }
            } else if(2 == to[i][j]) {
                //If it burns, it gets bruned ...
                n_forest.t[i][j] = 3;
            }
        }
    }

		return n_forest;

}

function createSteps(nbr){
	var _steps=[];
  for (var i = 0; i < nbr; i++){
			_steps.push(doStep(forest));
			forest = doStep(forest)
			//afterLoad(forest);
	}
	return _steps;
}
