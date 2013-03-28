#pragma strict

var bullet : Rigidbody;		//bullet prefab

var force : Vector3;		//the force applied to the new bullet

private var bulletClone : Rigidbody;		//bullet created

var bulletSpeed = 200.0;

var shotSpeed = 2;	//bullets per second

private var counter : float;	//counter keeps track of the time since last fire

function Start () {
	counter = 1;
}

function Update () {

//if mouse is held down
if (Input.GetMouseButton(1))
{	
	if (counter <= 0)
	counter = 1;
	
	//fires only if counter is full
	if (counter == 1)
	{
	//instantiates bullet at player position, sets it face the same direction as the player and
	//	fire at bullet speed
	bulletClone = Instantiate(bullet, transform.position, transform.rotation);
	
	force = transform.forward;
	
	force.Normalize();
	
	force = force * bulletSpeed;
	
	bulletClone.velocity = force;
	
	bulletClone.transform.parent = transform.parent;
	}
	
	//reduce counter between shots
	counter -= Time.deltaTime * shotSpeed;
}	

//will only deplete counter until it reaches zero and resets
else if (counter > 0)
	counter -= Time.deltaTime * shotSpeed;


}