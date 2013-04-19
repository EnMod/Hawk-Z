#pragma strict
#pragma downcast
import System.Collections.Generic;

class SpeedData implements System.IComparable 
{
	var changeAt : float;
	var newSpeed : float;
	
	//compare function to allow sorting
	function CompareTo(obj : Object)
	{
		var otherSpeedData : SpeedData = obj;
		return changeAt.CompareTo(otherSpeedData.changeAt);
	}
}

class LookData implements System.IComparable 
{
	var changeAt : float;
	var lookAt : Transform;
	var moveTime : float;
	
	//compare function to allow sorting
	function CompareTo(obj : Object)
	{
		var otherLookData : LookData = obj;
		return changeAt.CompareTo(otherLookData.changeAt);
	}
}

var startSpeed = 75f;			//speed of player

var fastForwardTo = 0.0;

var fFSpeed = 1000f;		//speed while fastforwarding

var speedVariation : SpeedData [];

var lookVariation : LookData [];

@System.NonSerialized
var location : float = 0;	//location along rail (used by enemy spawn script)

private var path : Vector3[];		//path of movement

var playerPath : Transform;			//transform of the object to move

private var numPathPoints = 0;				//number of points along the player path

var startPosition : Transform;

var srs : RadicalLibrary.SmoothQuaternion;		//rotation of object
private var ts : float;							//time variable used for rotation	

private var pathSize = 100.0;		//the value that represents the end of the path

private var privateSpeed : float;

private var nextSpeed = 0;		//next location on speed variation array
private var nextLook = 0;		//next location on look variation array

var startMapping : float;		//compensates for a weird glitch where the player starts at a certain percent in
private var mapping : float;	//FIXED : caused by glitch in FF, keeping mapping because why the hell not

//look variables
private var lookMove = false;
private var lookDistance = 0.0;
private var lookOrb : Transform;
private var lookTarget : Transform;
private var lookCurrent : Vector3;
private var lookTime : float;

function Start () {
	Clean();
	
	//set player location
	transform.rotation = Quaternion(0,1,.1,0);
	transform.position = startPosition.position;
	
	numPathPoints = 0;
	while(playerPath != null && playerPath.Find("wp" + numPathPoints) != null)
	{
		numPathPoints++;
	}
	
	//Debug.LogWarning(numPathPoints);
	
	//init path
	path = new Vector3[numPathPoints];
	
	//fill path array with path points
	for(var k = 0; k < numPathPoints; k++)
		{
			path[k] = playerPath.FindChild("wp" + k).transform.position;
			playerPath.FindChild("wp" + k).gameObject.active = false;
		}
	
	//start at first point.	
	transform.position = path[0];
 	
    srs = transform.rotation;
    srs.Duration = 0.5f;

	startMapping /= 100;
	
	//set lookOrb
	lookOrb = GameObject.Find("LookOrb").transform;
	lookOrb.localPosition = transform.Find("LookStraight").localPosition; 
	lookCurrent = lookOrb.localPosition; 
	lookTime = Time.time;
}


function Update () {
	
	mapping = (ts - startMapping)*(1 - startMapping);
	
	
	if(gameObject.GetComponent(railEnemySpawn).speeding)
		privateSpeed = fFSpeed;
	else
		privateSpeed = startSpeed;
	
	//update speed based on location in level
	if(nextSpeed < speedVariation.Length && location >= speedVariation[nextSpeed].changeAt)
	{
		startSpeed = speedVariation[nextSpeed].newSpeed;
		nextSpeed++;
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
	
	//update lookOrb on location in level
	if(nextLook < lookVariation.Length && location >= lookVariation[nextLook].changeAt)
	{
		lookMove = true;
		lookDistance = 0.0;
		lookTarget = lookVariation[nextLook].lookAt;
		lookTime=Time.time;
		nextLook++;
	}
	
	if(lookMove)
	{
		lookDistance = (Time.time - lookTime) / lookVariation[nextLook - 1].moveTime; 
		lookOrb.localPosition = Vector3.Slerp(lookCurrent, lookTarget.localPosition, lookDistance);
		
		if (lookOrb.localPosition == lookTarget.localPosition)
		{
			lookCurrent = lookOrb.localPosition;
			lookMove = false;
		}
	}

	
	transform.LookAt(lookOrb.position);
	
	
	if(gameObject.GetComponent(railEnemySpawn).speeding)
		Debug.Log(location + " - FF");
	else
		Debug.Log(location);
}

function Clean(){
	//sort speed
	var newarr : Array = new Array (speedVariation);
	var i : int;
	var k : int;
	
	
	//System.Array.Sort(spawnList);
	for (i = 0; i < newarr.length; i++)
	{
		var temp : SpeedData = newarr[i];
		
		if(temp.changeAt <= 0)
		{
			newarr.RemoveAt(i);
		}
	}
	
	newarr.Sort();
	speedVariation = newarr.ToBuiltin(SpeedData) as SpeedData[];
	
	//sort look
	var newarr1 : Array = new Array (lookVariation);
	
	//System.Array.Sort(spawnList);
	for (k = 0; k < newarr1.length; k++)
	{
		var temp1 : LookData = newarr1[k];
		
		if(temp1.changeAt <= 0)
		{
			newarr1.RemoveAt(k);
		}
	}
	
	newarr1.Sort();
	lookVariation = newarr1.ToBuiltin(LookData) as LookData[];
}