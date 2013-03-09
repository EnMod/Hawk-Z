#pragma strict

class SpeedData {
	var changeAt : float;
	var newSpeed : float;
}

var fastForwardTo = 0.0;

var fFSpeed = 1000f;		//speed while fastforwarding

var speedVariation : SpeedData [];

var startSpeed = 50f;			//speed of player
@System.NonSerialized
var location : float = 0;	//location along rail (used by enemy spawn script)

private var path : Vector3[];		//path of movement

var playerPath : Transform;			//transform of the object to move

var numPathPoints = 5;				//number of points along the player path

var srs : RadicalLibrary.SmoothQuaternion;		//rotation of object
private var ts : float;							//time variable used for rotation	

private var pathSize = 100.0;		//the value that represents the end of the path

private var privateSpeed : float;

private var next = 0;		//next location on speed variation array

var startMapping : float;		//compensates for a weird glitch where the player starts at a certain percent in
private var mapping : float;	//FIXED : caused by glitch in FF, keeping mapping because why the hell not

function Start () {
	numPathPoints++;
	
	//init path
	path = new Vector3[numPathPoints];
	
	//fill path array with path points
	for(var k = 0; k < numPathPoints; k++)
		{
			path[k] = playerPath.FindChild("wp" + k).transform.position;
			playerPath.FindChild("wp" + k).active = false;
		}
	
	//start at first point.	
	transform.position = path[0];
 	
    srs = transform.rotation;
    srs.Duration = 0.5f;

	startMapping /= 100;
}

function Update () {
	mapping = (ts - startMapping)*(1 - startMapping);
	
	
	if(gameObject.GetComponent(railEnemySpawn).speeding)
		privateSpeed = fFSpeed;
	else
		privateSpeed = startSpeed;
	
	//update speed based on location in level
	if(next < speedVariation.Length && location >= speedVariation[next].changeAt)
	{
		startSpeed = speedVariation[next].newSpeed;
		next++;
	}
	
	//rotate and move along path
	var q : Quaternion;
	
	transform.localPosition = Spline.MoveOnPath(path, transform.position, ts, q, privateSpeed, 10000, EasingType.Quadratic
, true, true);
    //ts += Time.deltaTime/20;
    
    srs.Value = q;
    transform.rotation = srs;
	
	//add to location value
	location = mapping * 100;
	
	//ADDED - Looks at object while flying.
	
	//transform.LookAt(looky);
	
	//END ADDED
	
	if(gameObject.GetComponent(railEnemySpawn).speeding)
		Debug.Log(location + " - FF");
	else
		Debug.Log(location);
}