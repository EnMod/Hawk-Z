#pragma strict

private var force : Vector3;

private var last : Vector3;	//last pos of bullet

private var speed : Vector3;

var lifeTime = 1.0;		//lifetime of bulelt in seconds

var explosion : GameObject;

private var explosionClone : GameObject;

var bulletDamage : int;

private var first = true;

@System.NonSerialized
var velocity = 10.0;

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


//destroy whatever bullet collides with
function OnCollisionEnter(collision : Collision)
{
		
		if(collision.gameObject.CompareTag("Enemy"))
		{
			collision.gameObject.GetComponent(enemyBehavior).ChangeCurrentHealth(bulletDamage);

		}
			explosionClone.Instantiate(explosion,transform.position,transform.parent.rotation);
			Destroy (gameObject);
}