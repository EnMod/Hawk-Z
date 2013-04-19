#pragma strict

//TO USE: figure our how many seconds you need until a point, then place at that point.

//falls to target in number of seconds equal to fall time starting at drop point.
//then keeps going
 
var fallTime = 1;
var dropPoint: float;


private var falling : boolean = false;
private var startHeight : float;
private var fallTarget : float;
private var currentLocation = 0.0; 
private var lastFallSpeed : float; //fall speed of previous frame
private var lastPos : float;

function Start () {
	 startHeight = transform.position.y; 
	 fallTarget = transform.Find("FallObject").position.y;
}

function Update () {

	
	if(!falling && dropPoint <= GameObject.FindGameObjectWithTag("Rail").GetComponent(railMove).location)
	{
		falling = true;
		iTween.ValueTo(gameObject,iTween.Hash("from", 0f, "to", 1f, "easeType", iTween.EaseType.easeInCubic, "time", fallTime, "onupdate", "UpdateLocation"));
	}
		
	//lerp to target 
	if(currentLocation < 1f)
	{
		transform.position.y = Mathf.Lerp(startHeight, fallTarget, currentLocation); 
	} 
	else
	{
		 //duct tape solution to ensure fall is continuous
		 transform.position.y += lastFallSpeed;
	}
 
	
	lastFallSpeed = transform.position.y - lastPos;
	lastPos = transform.position.y;  
	
	//destroy at floor
	if(transform.position.y < 0)
	{
	 	//gameObject.GetComponent(enemyBehavior).canExplode = false;
	 	Destroy(gameObject);
	}
}

//updates the location on path to sphere for the iTween function
function UpdateLocation(val : float)
{
	currentLocation = val;
}