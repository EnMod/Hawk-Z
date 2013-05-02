#pragma strict

@System.NonSerialized
var path : Transform[];  

private var pathLength = 7;

//variable that scale range to 6th waypoint.
private var scalePath : float;
private var scaleFactor : float;

private var tempPath : Vector3[];
 
var bullet : Transform;
private var bulletClone : Transform;
 
private var behavior : enemyBehavior;

function Awake () {	
	behavior = gameObject.GetComponent(enemyBehavior);
	//turn on fire override
	behavior.fireOverride = true;
	
	//fill path of bullet
	path = new Transform[pathLength]; 
	tempPath = new Vector3[pathLength];
	
	var i = 0;
	for (i = 0; i < pathLength; i++) 
	{
		path[i] = transform.Find("FirePath").Find("wp" + i); 
		path[i].renderer.enabled = false;
	} 
	
	scalePath = path[pathLength - 2].localPosition.z;
}

function Update () {
	if(behavior.fireThisFrame)
	{
		//Debug.LogWarning(path[1].name);
		
		var i : int;
		
		//scale to aimer
		scaleFactor = Vector3.Distance(transform.localPosition, behavior.aim.transform.localPosition);
		
		scaleFactor /= scalePath;
		
		//scaleFactor = 2;
		
		//Debug.LogWarning(behavior.aim.transform.localPosition);
		
		//Set tempPath
		for (i = 0; i < pathLength; i++)
		{
			//use scale factor to multiply z position
			path[i].localPosition *= scaleFactor;
			//set parent of path point to rail, get position, then reset parent to enemy
			path[i].transform.parent = transform.parent;
			tempPath[i] = new Vector3(path[i].localPosition.x, path[i].localPosition.y, path[i].localPosition.z);
			path[i].parent = transform.Find("FirePath"); 
			path[i].localPosition /= scaleFactor;
		}
		
		Debug.LogWarning(tempPath[tempPath.length - 2]);
		 
		 
		var sr : RadicalLibrary.SmoothQuaternion;
		
		bulletClone = Instantiate(bullet, transform.position, transform.rotation);
    	
    	//set parent of clone
    	bulletClone.parent = transform.parent;
    	
    	//set poisition of clone
    	bulletClone.localPosition = tempPath[0];
    	
    	//set initial variables of some kind
    	sr = bulletClone.localRotation;
    	sr.Duration = 0.5f;
    	
    	//pass variables to the enemy clone
    	bulletClone.GetComponent(enemyBehavior).srs = sr;
    	bulletClone.GetComponent(enemyBehavior).path = tempPath;
    	bulletClone.GetComponent(enemyBehavior).collisionDamage = behavior.bulletDamage;
    	bulletClone.GetComponent(enemyBehavior).speed = behavior.bulletSpeed;
	}
}