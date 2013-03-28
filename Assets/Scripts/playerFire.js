#pragma strict

var bullet : Rigidbody;		//bullet prefab

private var bulletClone : Rigidbody;	//bullet created

private var force : Vector3;		//the force applied to the new bullet	

var bulletSpeed = 200.0;

function Start () {

}

function Update () {

//if mouse is pressed
if (Input.GetMouseButtonDown(0))
{
	//instantiates bullet at player position, sets it face the same direction as the player and
	//	fire at bullet speed
	bulletClone = Instantiate(bullet, transform.position, transform.rotation);
	
	force = transform.forward;
	
	force.Normalize();
	
	force = force * bulletSpeed;
	
	bulletClone.velocity = force;
	
	//ensures bulelt is parented to rail
	bulletClone.transform.parent = transform.parent;
	
	//prevent bullet from hitting player
	Physics.IgnoreCollision(bulletClone.collider, collider);
}
}