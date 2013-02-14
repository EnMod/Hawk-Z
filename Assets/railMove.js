#pragma strict


var speed = 50f;			//speed of player
var location : float = 0;	//location along rail (used by enemy spawn script)

private var path : Vector3[];		//path of movement

var playerPath : Transform;			//transform of the object to move

var numPathPoints = 5;				//number of points along the player path

var srs : RadicalLibrary.SmoothQuaternion;		//rotation of object
private var ts : float;							//time variable used for rotation	

private var pathSize = 100.0;		//the value that represents the end of the path

function Start () {
	
	//init path
	path = new Vector3[numPathPoints];
	
	//fill path array with path points
	for(var k = 0; k < numPathPoints; k++)
		{
			path[k] = playerPath.FindChild("wp" + k).transform.position;
		}
	
	//start at first point.	
	transform.position = path[0];
 	
    srs = transform.rotation;
    srs.Duration = 0.5f;

}

function Update () {
	
	//rotate and move along path
	var q : Quaternion;
	
	transform.localPosition = Spline.MoveOnPath(path, transform.position, ts, q, speed, 10000, EasingType.Quadratic
, true, true);
    //ts += Time.deltaTime/20;
    
    srs.Value = q;
    transform.rotation = srs;
	
	//add to location value
	location = ts * pathSize;
	
	Debug.Log(ts);
}