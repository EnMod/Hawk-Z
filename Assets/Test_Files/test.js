#pragma strict

var speed = 5;
var maxMoveSpeed : float = 2;
var transDistanceX;
var transDistanceY;
var target : Transform;

var maxXDistance = 20;
var maxYDistance = 20;

function Start () {

}

function Update () {
//moves avatar
//NOTE: must be rewritten to use Vector acceleration in order for smooth, fun movement
if (target.position.x - transform.position.x > maxMoveSpeed)
	transDistanceX = maxMoveSpeed;
else if (target.position.x - transform.position.x < maxMoveSpeed * -1)
	transDistanceX = maxMoveSpeed * -1;
else
	transDistanceX = target.position.x - transform.position.x;
	
if (target.position.y - transform.position.y > maxMoveSpeed)
	transDistanceY = maxMoveSpeed;
else if (target.position.y - transform.position.y < maxMoveSpeed * -1)
	transDistanceY = maxMoveSpeed * -1;
else
	transDistanceY = target.position.y - transform.position.y;

transform.Translate(transDistanceX, transDistanceY , 0);

//keeps player within a preset bounds
if (transform.position.x > maxXDistance)
	transform.position.x = maxXDistance;
else if (transform.position.x < maxXDistance * -1)
	transform.position.x = maxXDistance * -1;
	
if (transform.position.y > maxYDistance)
	transform.position.y = maxYDistance;
else if (transform.position.y < maxYDistance * -1)
	transform.position.y = maxYDistance * -1;


transform.localPosition.z = 0;

//transform.rotation = Quaternion.Slerp (transform.rotation, target.rotation, Time.time * speed1);

transform.LookAt(target);

//transform.rotation.SetFromToRotation(Vector3(0,0,0), target.position);
} 