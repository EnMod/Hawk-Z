#pragma strict

@System.NonSerialized
var dist : float;			//distance along path
@System.NonSerialized
var srs : RadicalLibrary.SmoothQuaternion;
@System.NonSerialized
var path : Vector3[];		//the path the enemy is given

//enemy speed
@System.NonSerialized
var speed = 3f;

//accuracy
@System.NonSerialized
var accuracy = 1f;

//look at aimer?  In this case, will look along path if false
var lookAtTarget = true;
var aimAtTarget = true;

@System.NonSerialized
var aim : Transform;	//aimer

private var player : Transform;	//player

private var stopFiringAt : float;	//percentage of path past which unit will not fire

private var takeStats = 0;		//determines when to take stats

private var q : Quaternion;		//rotation for spline

private var tempObj : GameObject;

private var behavior : enemyBehavior;

function Awake () {	
	behavior = gameObject.GetComponent(enemyBehavior);
	//find aimer and player
//	tempObj = new GameObject();
//	aim = tempObj.transform;
//	tempObj.name = "aimObject";
//	behavior.aim = aim.gameObject;

	aim = transform.Find("AimObject");
	behavior.aim = aim.gameObject;
	player = GameObject.FindWithTag("Player").transform.parent;
	aim.parent = player.parent;
	aim.localPosition = player.localPosition;
	
	//allow enemy to fire
	behavior.fire = true;
}


//NOTE: make sure to use this format for all enemy move scripts.

function Start()
	{
		srs = behavior.srs;
		path = behavior.path;
		speed = behavior.speed;
		accuracy = behavior.accuracy;
		stopFiringAt = behavior.stopFiringAtPathPercent / 100;
		
		takeStats ++;
	}
	//begin moving.  This is the code that gets replaced for each enemy
	function Update()
	{	    
	    transform.localPosition = Spline.MoveOnPath(path, transform.localPosition, dist, q, speed, 100, EasingType.Quadratic, true, true);
	    //ts += Time.deltaTime/20;
	    
	    srs.Value = q;
	    
	    //look at aimer as it moves towards player
	    if(aimAtTarget)
	    {
	    	aim.localPosition = Vector3.Lerp(aim.localPosition, player.localPosition, Time.deltaTime * accuracy);
	    	transform.LookAt(aim.position);
	    }
	    
	    //fire
	    if(!lookAtTarget && !(dist >= stopFiringAt))
	    {
	    	//if not looking at target, we need to properly control when we fire. 
	    	//by the end of the loop enemy will change look direction, need to shoot now.
	    	behavior.fire = true;
	    	behavior.Fire();
	    	behavior.fire = false;
	    	
	    	//look along path if not told to look at target	
	    	transform.localRotation = srs;
	   	}
	   	
	   	//stop firing if too far along path
	   	if(dist >= stopFiringAt)
	   	{
	   		behavior.fire = false;
	   	}
		
		//if at the end of the path, destroy the enemy without exploding it
		if(dist >= .999)
		{
			behavior.canExplode = false;
			Destroy(gameObject);
		}
	}
