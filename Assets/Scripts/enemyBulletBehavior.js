#pragma strict

private var force : Vector3;

private var speed : Vector3;	//speed of bullet

var lifeTime = 1.0;		//lifetime of bulelt in seconds

var explosion : GameObject;

private var explosionClone : GameObject;

var bulletDamage : int;

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
		if(collision.gameObject.CompareTag("Player"))
		{
			collision.gameObject.GetComponent(playerHealth).ChangeCurrentHealth(bulletDamage);

		}
			explosionClone.Instantiate(explosion,transform.position,transform.parent.rotation);
			Destroy (gameObject);
}