#pragma strict
//charges player.
//use with enough start delay to aim at player, and impossibly high reload.

var chargeSpeed : float;

private var currentSpeed = 0.0;
private var storedDirection : Vector3;

private var behavior : enemyBehavior;

function Awake () {	
	behavior = gameObject.GetComponent(enemyBehavior);
	
	//do not fire actualy bullets
	behavior.fireOverride = true;
}

function Update () {
	//gameObject.GetComponent(enemyBehavior).fireOverride = true;
	
	//instead of firing, add to charge speed and begin movement
	if(behavior.fireThisFrame)
	{
		iTween.ValueTo(gameObject,iTween.Hash("from", 0f, "to", chargeSpeed, "easeType", iTween.EaseType.easeInCubic, "time", .75, "onupdate", "UpdateSpeed"));
		transform.Find("Graphic").animation.Play("Take 001");	
	}
	
	//when too close to player, stop following and move in current direction
	if(transform.localPosition.z <= 5)
	{
		transform.forward = storedDirection;
	}
	
	transform.Translate(Vector3.forward * Time.deltaTime * currentSpeed);
	
	//give a little forward thrust as well
	transform.localPosition.z -= Time.deltaTime * currentSpeed / 5;
	
	storedDirection = transform.forward;
	
	//destroy if offscreen
	if(transform.localPosition.z < Camera.main.transform.localPosition.z - 5)
	{
		behavior.canExplode = false;
		Destroy(gameObject);
	}
}

//updates the speed for the iTween function
function UpdateSpeed(val : float)
{
	currentSpeed = val;
}