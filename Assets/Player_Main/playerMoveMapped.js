#pragma strict

var speed = .5;
var velocityChangeThreshold = 1.0;
var proximity : float;
var maxVelocity = .2;
var velocityChange : float;
var velocity : Vector3;
var target : Transform;

var mapping = .5;

var premappedLocation = Vector3(0,0,0);

var maxXDistance = 4.0;
var maxYDistance = 2.0;

function Start () {

}

function Update () {
//moves avatar

velocity = Vector3(target.localPosition.x - premappedLocation.x, target.localPosition.y - premappedLocation.y, 0);

proximity = Mathf.Sqrt(Vector3.Distance(premappedLocation, Vector3(target.localPosition.x, target.localPosition.y, 0)));

velocityChange = speed * proximity / 10;

if (velocityChange > maxVelocity)
	velocityChange = maxVelocity;

/*if (velocity.magnitude > velocityChangeThreshold)
	useFastVelocity = true;
else
	useFastVelocity = false;*/

velocity.Normalize();

velocity = velocity * velocityChange;

premappedLocation = premappedLocation + velocity;

//keeps player within a preset bounds
if (premappedLocation.x > maxXDistance)
	premappedLocation.x = maxXDistance;
else if (premappedLocation.x < maxXDistance * -1)
	premappedLocation.x = maxXDistance * -1;
	
if (premappedLocation.y > maxYDistance)
	premappedLocation.y = maxYDistance;
else if (premappedLocation.y < maxYDistance * -1)
	premappedLocation.y = maxYDistance * -1;

premappedLocation.z = 0;

transform.localPosition = premappedLocation * mapping; 

//transform.rotation = Quaternion.Slerp (transform.rotation, target.rotation, Time.time * speed1);

transform.LookAt(target);

//transform.rotation.SetFromToRotation(Vector3(0,0,0), target.position);
} 