#pragma strict

var speed = .5;
var velocityChangeThreshold = 1.0;
var proximity : float;
var maxVelocity = .2;
var velocityChange : float;
var velocity : Vector3;
var target : Transform;

var maxXDistance = 4.0;
var maxYDistance = 2.0;

function Start () {

}

function Update () {
//moves avatar

velocity = Vector3(target.localPosition.x - transform.localPosition.x, target.localPosition.y - transform.localPosition.y, 0);

proximity = Mathf.Sqrt(Vector3.Distance(transform.localPosition, Vector3(target.localPosition.x, target.localPosition.y, 0)));

velocityChange = speed * proximity / 10;

if (velocityChange > maxVelocity)
	velocityChange = maxVelocity;

/*if (velocity.magnitude > velocityChangeThreshold)
	useFastVelocity = true;
else
	useFastVelocity = false;*/

velocity.Normalize();

velocity = velocity * velocityChange;

transform.localPosition = transform.localPosition + velocity;

//keeps player within a preset bounds
if (transform.localPosition.x > maxXDistance)
	transform.localPosition.x = maxXDistance;
else if (transform.localPosition.x < maxXDistance * -1)
	transform.localPosition.x = maxXDistance * -1;
	
if (transform.localPosition.y > maxYDistance)
	transform.localPosition.y = maxYDistance;
else if (transform.localPosition.y < maxYDistance * -1)
	transform.localPosition.y = maxYDistance * -1;


transform.localPosition.z = 0;

//transform.rotation = Quaternion.Slerp (transform.rotation, target.rotation, Time.time * speed1);

transform.LookAt(target);

//transform.rotation.SetFromToRotation(Vector3(0,0,0), target.position);
} 