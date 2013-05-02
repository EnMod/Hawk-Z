#pragma strict

private var force : Vector3;

private var last : Vector3;	//last pos of bullet

private var speed : Vector3;

var lifeTime = 1.0;		//lifetime of bulelt in seconds

var explosion : GameObject;

private var explosionClone : GameObject;

var bulletDamage : int;

@System.NonSerialized
var pull : float;

private var first = true;

@System.NonSerialized
var target : Transform;

@System.NonSerialized
var velocity = 10.0;

private var hitClone : GameObject;

var explosionSize = 30;

function Start () {

	last = transform.localPosition;

}
function Update()
{
	//transform.LookAt(target);
	
	
	
	/*if(first)
	{
		speed = transform.localPosition - last;
		first = false;
	}*/
	
	lifeTime -= Time.deltaTime;
	
	if (lifeTime <= 0)
		Destroy (gameObject);
	
	//speed.Normalize();
	
	//speed *= velocity * Time.deltaTime;
	
	//transform.localPosition += speed;
}


var maxVelocity = 100;

function FixedUpdate()
{
	
	if(target != null)
	{
		var tempV = (target.position - transform.position).normalized;
		//tempV.y *= -1;
		//if(tempV.z <= 0)
			rigidbody.AddForce (tempV * pull);
	}
	
	var v = rigidbody.velocity;
	
	//lock speed at a max
	if(v.sqrMagnitude > (maxVelocity * maxVelocity)){ // Equivalent to: rigidbody.velocity.magnitude > maxVelocity, but faster.
        // Vector3.normalized returns this vector with a magnitude 
        // of 1. This ensures that we're not messing with the 
        // direction of the vector, only its magnitude.
        rigidbody.velocity = v.normalized * maxVelocity;
    } 
}

//destroy whatever bullet collides with
function OnCollisionEnter(collision : Collision)
{
		if(collision.gameObject.layer == "Enemy Bullets")
		{
			Physics.IgnoreCollision(collision.collider, collider);
		}
		
		if(collision.gameObject.CompareTag("Enemy"))
		{
			collision.gameObject.GetComponent(enemyBehavior).ChangeCurrentHealth(bulletDamage);

		}
		explosionClone.Instantiate(explosion,transform.position,transform.parent.rotation);
		
		//hitsphere
		hitClone = Resources.Load("PlayerHitSphere");
	
		hitClone = Instantiate(hitClone, transform.position, transform.rotation);
		hitClone.transform.localScale = Vector3(explosionSize, explosionSize, explosionSize);
		hitClone.transform.parent = transform.parent;
		hitClone.GetComponent(playerHitSphere).collisionDamage = bulletDamage;
		Destroy(gameObject);
		
		Destroy (gameObject);
}