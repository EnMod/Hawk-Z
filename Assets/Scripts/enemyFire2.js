#pragma strict

var bullet : Rigidbody;		//bullet prefab

private var bulletClone : Rigidbody;	//bullet created

private var force : Vector3;		//the force applied to the new bullet	

var bulletSpeed = 200.0;
private var cooldown : float;
var initCooldown = 2.0;
var camTransform: Transform;
var targetTransform: Transform;
var Aimer : GameObject; // empty game object (prefab)

function Start () {
cooldown = initCooldown;
}

function Update () {

	Aimer.transform.position = transform.position; // moves aimer empty game object with the enemy
	if(cooldown <= 0)
	{
	//instantiates bullet at player position, sets it face the same direction as the player and
	//	fire at bullet speed
		bulletClone = Instantiate(bullet, transform.position, transform.rotation);
		
		camTransform = gameObject.FindGameObjectWithTag("MainCamera").transform;
	
		Aimer.transform.LookAt(camTransform); // aims without rotating enemy
		
		force = Aimer.transform.forward;
	
		force.Normalize();
	
		force = force * bulletSpeed;
	
		bulletClone.velocity = force;
	
	//ensures bulelt is parented to rail
		bulletClone.transform.parent = transform.parent;
	
	//prevent bullet from hitting player
		Physics.IgnoreCollision(bulletClone.collider, collider);
			
		cooldown = initCooldown;
	}
	cooldown -=Time.deltaTime;
}