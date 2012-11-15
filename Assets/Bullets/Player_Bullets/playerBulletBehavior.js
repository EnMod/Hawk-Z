#pragma strict

var force : Vector3;

var speed : Vector3;	//speed of bullet, placeholder

var lifeTime = 1.0;		//lifetime of bulelt in seconds

var explosion : GameObject;

var explosionClone : GameObject;

function Start () {

speed = rigidbody.velocity;

}

function Update()
{
	lifeTime -= Time.deltaTime;
	
	if (lifeTime <= 0)
		Destroy (gameObject);
}

//keep velocity of bullet fized
function FixedUpdate () {

rigidbody.velocity = speed;

}

//destroy whatever bullet collides with
function OnCollisionEnter(collision : Collision)
{
		//do not destroy terrain
		if(collision.gameObject.name != "Terrain")
			Destroy (collision.gameObject);
		
		explosionClone.Instantiate(explosion,transform.position,transform.parent.rotation);
		Destroy (gameObject);
}