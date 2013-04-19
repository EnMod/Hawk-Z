#pragma strict
@System.NonSerialized
var path : Vector3[];		//the path the enemy is given

//enemy speed
@System.NonSerialized
var speed = 3f;

//accuracy
@System.NonSerialized
var accuracy = 1f;

private var aim : Transform;	//aimer

private var player : Transform;	//player

private var takeStats = 0;		//determines when to take stats

var stopTime = 3f;

private var nextMove = 1;
private var moveTime = 0f;
private var tempVec : Vector3;

//kill at end of path
private var kill = false;

private var behavior : enemyBehavior;

function Awake () {
	behavior = gameObject.GetComponent(enemyBehavior);
	
	//find aimer and player
	aim = transform.Find("AimObject");
	behavior.aim = aim.gameObject;
	player = GameObject.FindWithTag("Player").transform.parent;
	aim.parent = player.parent;
	aim.localPosition = player.localPosition;
	
	
	
	//allow enemy to fire
	behavior.fire = true;
}

function Update () {
	if(takeStats == 0)
		takeStats++;
	
	//take all of the stats from the enemy move script
	else if (takeStats == 1)
	{
		path = behavior.path;
		speed = 1/behavior.speed;
		accuracy = behavior.accuracy;
		
		takeStats ++;
	}
	else
	{
		if(nextMove == path.Length && moveTime <= 0)
		{
			kill = true;
		}
		else if(moveTime <= 0)
		{
			moveTime = stopTime + speed;
			
			tempVec = transform.localPosition;
			
			iTween.ValueTo(gameObject, iTween.Hash("from", tempVec, "to", path[nextMove], "easeType", iTween.EaseType.easeOutCubic, "time", speed, "onupdate", "UpdateLocalPos"));
			
			nextMove++;
			
			if(nextMove == path.Length)
			{
				behavior.fire = false;
				moveTime -= stopTime;
			}
		}
		
		moveTime -= Time.deltaTime;
		
	    aim.localPosition = Vector3.Lerp(aim.localPosition, player.localPosition, Time.deltaTime * accuracy);
	    transform.LookAt(aim.position);
	    
		//if at the end of the path, destroy the enemy without exploding it
		if(kill)
		{
			behavior.canExplode = false;
			Destroy(gameObject);
		}
	}
}

function UpdateLocalPos(val : Vector3)
{
	transform.localPosition = val;
}