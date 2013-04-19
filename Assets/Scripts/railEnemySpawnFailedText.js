#pragma strict

var fastForward = 0.0;

//All three of these arrays must have the same number of elements
var enemies : Transform[];
var paths : GameObject[]; 
var startingPlayerPositions : float[];

var pointsPerSpline = 5;		//the number of points on each path

private var splines : Vector3[,];		//two dimentional array that holds the points on each path

var numEnemies : int;

var enemyClone : Transform;			//clone of enemy

private var enemyPointer : int;

var spawnAsset : TextAsset;

var speeding = true;

private var j : int;
private var k : int;
private var i : int;
private var n : int;

function Start () {
	numEnemies = paths.Length;
	splines = new Vector3[numEnemies , pointsPerSpline];

	//fills spline array
	for(j = 0; j < paths.Length; j++)
	{
		for(k = 0; k < pointsPerSpline; k++)
		{
			splines[j,k] = paths[j].transform.Find("wp" + k).transform.localPosition;
			Debug.Log("splines[" + j + "][" + k + "]: " + splines[j,k]);
		}
	}
}


function Update () {
   
    //check if player has hit a spawn position
    while(enemyPointer < paths.Length && startingPlayerPositions[enemyPointer] <= gameObject.GetComponent(railMove).location)
    {
    	if(!speeding)
    	{
    		var arrayCopy = new Vector3[pointsPerSpline];
    		
    		for (i=0; i<pointsPerSpline; i++)
    			arrayCopy[i] = splines[enemyPointer, i];
    
    	instantiateEnemy(enemyPointer, arrayCopy);
    	}
    	enemyPointer += 1;
    }
    
    if(gameObject.GetComponent(railMove).location >= fastForward)
    {
    	speeding = false;
    }
    	
}

//instantiates the enemy
function instantiateEnemy(ep : int, path : Vector3[]){
	
	var sr : RadicalLibrary.SmoothQuaternion;
	
	enemyClone = Instantiate(enemies[ep], splines[ep, 0], Quaternion.identity);
    
    //set parent of clone
    enemyClone.parent = transform;
    
    //set poisition of clone
    enemyClone.localPosition = splines[ep, 0];
    
    //set initial variables of some kind
    sr = enemyClone.localRotation;
    sr.Duration = 0.5f;
    
    //pass variables to the enemy clone
    enemyClone.GetComponent(enemyBehavior).srs = sr;
    enemyClone.GetComponent(enemyBehavior).path = path;
}