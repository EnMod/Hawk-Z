#pragma strict

private var fastForward = 0.0;

class SpawnData {
	var enemy : Transform;
	var path : GameObject;
	var playerPosition : float;
}

var spawnList : SpawnData [];

var pointsPerSpline = 5;		//the number of points on each path

private var splines : Vector3[,];		//two dimentional array that holds the points on each path

@System.NonSerialized
var enemyClone : Transform;			//clone of enemy

private var enemyPointer : int;

@System.NonSerialized
var speeding = true;

private var j : int;
private var k : int;
private var i : int;
private var n : int;

function Start () {
	splines = new Vector3[spawnList.Length , pointsPerSpline];

	//fills spline array
	for(j = 0; j < spawnList.Length; j++)
	{
		for(k = 0; k < pointsPerSpline; k++)
		{
			splines[j,k] = spawnList[j].path.transform.Find("wp" + k).transform.localPosition;
			Debug.Log("splines[" + j + "][" + k + "]: " + splines[j,k]);
		}
	}
	
	fastForward = gameObject.GetComponent(railMove).fastForwardTo;
	
	if (fastForward == 0)
		speeding = false;
}


function Update () {
   
    //check if player has hit a spawn position
    while(enemyPointer < spawnList.Length && spawnList[enemyPointer].playerPosition <= gameObject.GetComponent(railMove).location)
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
	
	enemyClone = Instantiate(spawnList[ep].enemy, splines[ep, 0], Quaternion.identity);
    
    //set parent of clone
    enemyClone.parent = transform;
    
    //set poisition of clone
    enemyClone.localPosition = splines[ep, 0];
    
    //set initial variables of some kind
    sr = enemyClone.localRotation;
    sr.Duration = 0.5f;
    
    //pass variables to the enemy clone
    enemyClone.GetComponent(enemyMove).srs = sr;
    enemyClone.GetComponent(enemyMove).sl = path;
}