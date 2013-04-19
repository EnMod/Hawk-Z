#pragma strict

private var force : Vector3;

private var last : Vector3;	//last pos of bullet

private var speed : Vector3;

@System.NonSerialized
var velocity = 10.0;

var lifeTime = 1.0;		//lifetime of bulelt in seconds

var explosion : GameObject;

private var explosionClone : GameObject;

var bulletDamage : int;

private var first = true;

function Start () {

last = transform.localPosition;

}

function Update()
{
	if(first)
	{
		speed = transform.localPosition - last;
		first = false;
	}
	
	lifeTime -= Time.deltaTime;
	
	if (lifeTime <= 0)
		Destroy (gameObject);
	
	speed.Normalize();
	
	speed *= velocity * Time.deltaTime;
	
	transform.localPosition += speed;
}

/*
//keep velocity of bullet fized
function FixedUpdate () {

//rigidbody.velocity = speed;

}*/

//destroy whatever bullet collides with
function OnCollisionEnter(collision : Collision)
{
		//do not destroy terrain
		if(collision.gameObject.CompareTag("Player"))
		{
			collision.gameObject.GetComponent(playerHealth).ChangeCurrentHealth(bulletDamage);

		}
			explosionClone.Instantiate(explosion,transform.position,Quaternion.identity);
			Destroy (gameObject);
}