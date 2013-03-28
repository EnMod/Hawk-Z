#pragma strict

var brick : Rigidbody;

var force : Vector3;

var clone : Rigidbody;

var speed = 3.0;

function Start () {

}

function Update () {

if (Input.GetMouseButtonDown(0))
{
	clone = Instantiate(brick, transform.position, transform.rotation);
	
	force = transform.forward;
	
	force.Normalize();
	
	force = force * speed;
	
	clone.velocity = force;
}
}