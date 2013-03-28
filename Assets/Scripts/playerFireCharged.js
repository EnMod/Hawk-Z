#pragma strict

var bullet : Rigidbody;		//bullet prefab

var stage1Bullet : GameObject;

private var force : Vector3;		//the force applied to the new bullet

private var chargeClone : GameObject;

private var bulletClone : Rigidbody;	//bullet created	

var bulletSpeed = 50.0;

var initCharge = 5.0;		//number of seconds that it takes to reach full charge

var charge = initCharge;

var canFire = false;		//whether or not can fire

var startDelay = .5;			//number of seconds until charge begins

var lockOn : Transform;		//tranform of locked on target

function Start () {

}

function Update () {
//start charge when pressed
if (Input.GetMouseButtonDown(0))
{	
	charge = initCharge;
	
	//set bullet to be parented by the avatar

}

//on release, shoot
if (Input.GetMouseButtonUp(0))
{
	//if the player is able to fire, shoot
	if (canFire)
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
	
	Destroy(chargeClone);
	
	canFire = false;
	}
}

//charge shot
if (Input.GetMouseButton(0))
{
	//charge
	charge -= Time.deltaTime;
	
	//initialize the bullet and allow firing after start delay threshold
	if (charge < initCharge - startDelay && charge > 0 && !canFire)
	{
		canFire = true;
		
		chargeClone = Instantiate(stage1Bullet,transform.position, transform.rotation);
		
		chargeClone.transform.parent = transform;
		
	}
	
	//when fully charged, fire no matter what the player does
	if(charge < 0 && canFire)
	{
		bulletClone = Instantiate(bullet, transform.position, transform.rotation);
	
		force = transform.forward;
	
		force.Normalize();
	
		force = force * bulletSpeed;
	
		bulletClone.velocity = force;
	
		//ensures bullet is parented to rail
		bulletClone.transform.parent = transform.parent;
		
		//prevent bullet from hitting player
		Physics.IgnoreCollision(bulletClone.collider, collider);
	
		//turns off ability to fire
		canFire = false;
		
		Destroy(chargeClone);
	}
}
}