#pragma strict

var enemy1 : Transform;
var enemyTypeMap : int;
var ts : float[];
var srs : RadicalLibrary.SmoothQuaternion[];
var splines : Vector3[,];
var paths : GameObject[]; 
var enemies : Transform[];
var startingPlayerPositions : int[];

var pointsPerSpline = 5;
var numEnemies = 1;
var enemyPointer = 0;

var speed = 3f;

private var hasNext = true;

private var j : int;
private var k : int;
private var i : int;
private var n : int;

function Start () {
	numEnemies = paths.Length;
	splines = new Vector3[numEnemies , pointsPerSpline];
	enemies = new Transform[numEnemies];
	srs = new RadicalLibrary.SmoothQuaternion[numEnemies];
	ts = new float[numEnemies];
	
	//startingPlayerPositions[0] = 1;
	/*splines[0,0] = Vector3(0, 12, 30);
	splines[0,1] = Vector3(0, 12, 30);
	splines[0,2] = Vector3(0, 2, 30);
	splines[0,3] = Vector3(0, 0, 30);
	splines[0,4] = Vector3(0, 0, 30);*/
	
	for(j = 0; j < 1; j++)
	{
		for(k = 0; k < pointsPerSpline; k++)
		{
			splines[j,k] = paths[j].transform.Find("wp" + j + "-" + k).transform.position;
			Debug.Log(splines[j,k]);
		//	Debug.Log(paths[j].transform.Find("wp" + j + "-" + k).transform.position.y);
		//	Debug.Log(paths[j].transform.Find("wp" + j + "-" + k).transform.position.z);
		}
	}	
}

//dont declare local variables
//move n and i


function Update () {
   
    
    if(hasNext)
    {
    if(startingPlayerPositions[enemyPointer] <= transform.position.z && enemyPointer < numEnemies){//position of rail?
    	instantiateEnemy(enemyPointer);
    	enemyPointer += 1;
    	
    	//makes sure index does not go out of bounds by determining if another enemy exists
    	if(enemyPointer >= startingPlayerPositions.Length)
    		hasNext = false;
    }
    }
    
    for(n=0; n<enemyPointer; n++){
    	if(enemies[n] != null){
    		var arrayCopy = new Vector3[pointsPerSpline];
    		for (i=0; i<pointsPerSpline; i++){
    			arrayCopy[i] = splines[n, i];
   			}
    		moveEnemy(arrayCopy, n);
   		}
    }
}

//no local variables

function instantiateEnemy(ep : int){

	Debug.Log("Instantiating Enemy " + ep + " : "); 
	var obj : Transform;
	var sr : RadicalLibrary.SmoothQuaternion;
	obj = Instantiate(enemy1, splines[ep, 0], Quaternion.identity);
    obj.parent = transform;
    obj.position = splines[ep, 0];
    sr = obj.localRotation;
    sr.Duration = 0.5f;
    enemies[ep] = obj;
    srs[ep] = sr;
}

function moveEnemy(sl : Vector3[], ep : int){
	var q : Quaternion;
    enemies[ep].localPosition = Spline.MoveOnPath(sl, enemies[ep].localPosition, ts[ep], q, speed, 100, EasingType.Sine, true, true);
    Debug.Log(enemies[ep].position);
    srs[ep].Value = q;
    enemies[ep].localRotation = srs[ep];
}