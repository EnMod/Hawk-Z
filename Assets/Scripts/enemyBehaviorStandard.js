#pragma strict

var ts : float;			//distance along path
var srs : RadicalLibrary.SmoothQuaternion;
var sl : Vector3[];		//the path the enemy is given

//enemy speed
var speed = 3f;

private var takeStats = 0;		//determines when to take stats

function Start () {

}


//NOTE: make sure to use this format for all enemy move scripts.

function Update () {

//wait one frame for the enemy move script to initialize
if(takeStats == 0)
	takeStats++;

//take all of the stats from the enemy move script
else if (takeStats == 1)
{
	srs = gameObject.GetComponent(enemyMove).srs;
	sl = gameObject.GetComponent(enemyMove).sl;
	speed = gameObject.GetComponent(enemyMove).speed;
	
	takeStats ++;
}
//begin moving.  This is the code that gets replaced for each enemy
else
{
var q : Quaternion;
    
    transform.localPosition = Spline.MoveOnPath(sl, transform.localPosition, ts, q, speed, 100, EasingType.Sine, true, true);
    ts += Time.deltaTime/20;
    
    srs.Value = q;
    transform.rotation = srs;
	
	//if at the end of the path, destroy the enemy without exploding it
	if(ts >= .999)
	{
		gameObject.GetComponent(enemyExplode).canExplode = false;
		Destroy(gameObject);
	}
}
}