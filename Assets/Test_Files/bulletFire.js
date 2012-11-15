#pragma strict

var player : Transform;
var reticle : Transform;
var target : Vector3;
var start : Vector3;

var velocity : Vector3;

var speed = .5;

function OnEnable () {
	
}

function Update () {

if(Input.GetMouseButtonDown(0))
{
	transform.position = player.position;
	
	transform.LookAt(reticle);
	
	velocity = transform.forward;
	
	velocity.Normalize();
	
	velocity = velocity * speed;
}

transform.position = transform.position + velocity;

/*//init.  Replace to start area when converting to prefab
if(Input.GetMouseButtonDown(0))
{
	transform.position = player.position;
	
	target = Vector3(reticle.position.x, reticle.position.y, 100);
}

	transform.LookAt(target);
	transform.position = Vector3.Lerp(transform.position, target, .1);*/
}