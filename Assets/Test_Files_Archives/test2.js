#pragma strict

var force : Vector3;

var speed : Vector3;

function Start () {

speed = rigidbody.velocity;

}

function FixedUpdate () {

rigidbody.velocity = speed;

}

function OnCollisionEnter(collision : Collision)
{
	if (collision.gameObject.name != "Avatar" && collision.gameObject.name != "Reticle" && collision.gameObject.name != "Reticle2" && collision.gameObject.name != "Terrain")
	{
		//destroy other thing first
		
		if(collision.gameObject.name != "Plane")
			Destroy (collision.gameObject);
		
		Destroy (gameObject);
	}
}