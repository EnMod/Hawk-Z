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

//look at aimer?  In this case, will look towards camera if false
var lookAtTarget = true;

//when to stop
var activate = 50f;
var stopTime = 2f;

private var stopTimer = 0.0;

private var stop = false;
private var stoppedOnce = false;

private var takeStats = 0;		//determines when to take stats

private var aim : Transform;	//aimer

private var player : Transform;	//player

private var q : Quaternion;		//rotation for spline

//NOTE: make sure to use this format for all enemy move scripts.

function Start()
	{
		srs = behavior.srs;
		path = behavior.path;
		speed = behavior.speed;
		accuracy = behavior.accuracy;
		
		
		takeStats ++;
		
		//turn off firing for the sake of the start delay on reload
		behavior.fire = false;
		}
	
function Update(){
	    if(!stop)
	    {
	    	transform.localPosition = Spline.MoveOnPath(path, transform.localPosition, dist, q, speed, 100, EasingType.Quadratic, true, true);
	    	
	   		if(lookAtTarget)
	   		{
	   			if(!stoppedOnce)
	   			{
	   				srs.Value = q;
	   				transform.localRotation = srs;
	   				transform.LookAt(aim.position);
	   			}
	   			else
	   			{
	   				aim.localPosition = Vector3.Lerp(aim.localPosition, player.localPosition, Time.deltaTime * accuracy);
	   				transform.LookAt(aim.position);
	   			}
			}
			else
			{
				transform.LookAt(Camera.main.transform);
			}

	    	//dist += Time.deltaTime/20;
	    }
	    
	    //if(stop)
	    if(dist >= (activate / 100) && !stoppedOnce)
	    {
	    	if(!stop)
	    	{
	    		stop = true;
	    		
	    		aim.parent = player.parent;
	    			
	    		stopTimer = stopTime;
	    	}
	
	    	aim.localPosition = Vector3.Lerp(aim.localPosition, player.localPosition, Time.deltaTime * accuracy); 
	    	
	    	//look at the aimer, thus shooting in that direction
	    	transform.LookAt(aim.position);
	    	
	    	//fire
	    	behavior.fire = true;
	    	
	    	if(!lookAtTarget)
	    	{
	    		//if not looking at target, we need to properly control when we fire. 
	    		//by the end of the loop enemy will change look direction, need to shoot now.
	    		behavior.Fire();
	    		behavior.fire = false;
	    	}
			
			//count down until able to move again
			stopTimer -= Time.deltaTime;
			
			if(stopTimer <= 0)
			{
				stop = false;
				stoppedOnce = true;
				behavior.fire = false;
			}
	    }
		
		//look along the path
		if(!lookAtTarget)
		{
			transform.LookAt(Camera.main.transform);
		}
		
		//if at the end of the path, destroy the enemy without exploding it
		if(dist >= .999)
		{
			behavior.canExplode = false;
			Destroy(gameObject);
		}
	}


private var behavior : enemyBehavior;

function Awake () {	
	behavior = gameObject.GetComponent(enemyBehavior);
	//find aimer and player
	aim = transform.Find("AimObject");
	behavior.aim = aim.gameObject;
	player = GameObject.FindWithTag("Player").transform.parent;
}
	
//	iTween.ValueTo(gameObject,iTween.Hash("from", 0f, "to", (activate/100), "easeType", iTween.EaseType.easeOutQuad, "time", 4, "onupdate", "UpdateDist"));
//}
//
//function UpdateDist(val : float)
//{
//	dist = val;
//	
//	if(dist >= (activate / 100))
//	{
//		stop = true;
//		
//		aim.parent = player.parent;
//	}
//}