#pragma strict

private var path : Vector3[];		//path of movement

var circularPlayerPath : Transform;			//transform of the object to move

var numPathPoints = 5;				//number of points along the player path

var srs : RadicalLibrary.SmoothQuaternion;		//rotation of object
private var ts : float;							//time variable used for rotation
var speed : float;

var loopNode : GameObject;
private var start = true;

function Start () {
	
}

function Update () {
	if(gameObject.GetComponent(railMove).location == 100)
	{
	
	if(start)
	{
	path = new Vector3[numPathPoints + 2];
	
	path[0] = loopNode.transform.position;
	
	//fill path array with path points
	for(var k = 1; k < numPathPoints + 1; k++)
		{
			path[k] = circularPlayerPath.FindChild("wp" + k).transform.position;
			circularPlayerPath.FindChild("wp" + k).gameObject.active = false;
		}
		
	path[numPathPoints + 1] = loopNode.transform.position;
	
	srs = transform.rotation;
    
    srs.Duration = 0.5f;
    
    start = false;
    
    gameObject.GetComponent(railMove).enabled = false;
    }
	
	//rotate and move along path
	var q : Quaternion;
	
	transform.localPosition = Spline.MoveOnPath(path, transform.position, ts, q, speed, 10000, EasingType.Quadratic
, true, true);
    //ts += Time.deltaTime/20;
    
    srs.Value = q;
    transform.rotation = srs;
    
    if(ts == 1)
    	ts = 0;
    }
}