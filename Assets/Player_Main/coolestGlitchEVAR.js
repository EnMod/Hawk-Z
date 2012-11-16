#pragma strict

var bullet : Rigidbody;		//bullet prefab

var stage1Bullet : GameObject;

private var force : Vector3;		//the force applied to the new bullet

private var chargeClone : GameObject;

private var bulletClone : Rigidbody;	//bullet created	

var bulletSpeed = 50.0;

var initCharge = 5.0;		//number of seconds that it takes to reach full charge

var charge = 0.0;

private var canFire = true;		//whether or not can fire

var startDelay = .05;			//number of seconds until charge begins

function Start () {

}

function Update () {
if (Input.GetMouseButtonDown(0))
{	
	charge = initCharge;
	
	//put bullet in front of player
	/*bulletClone.transform.position = transform.forward;
	
	bulletClone.transform.position.Normalize();
	
	bulletClone.transform.position = bulletClone.transform.position * .5;*/
	
	//set bullet to be parented by the avatar

}

if (Input.GetMouseButtonUp(0))
{
	charge = initCharge;
	
	if (canFire && charge < initCharge - startDelay)
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
	
	Destroy(chargeClone);
	
	canFire = false;
	}
}

if (Input.GetMouseButton(0))
{
	charge -= Time.deltaTime;
	
	if (charge < initCharge - startDelay)
	{
		canFire = true;
		
		chargeClone = Instantiate(stage1Bullet,transform.position, transform.rotation);
	
		chargeClone.transform.parent = transform;
	}
	if (canFire)
	{
	if(charge < 0)
	{
		bulletClone = Instantiate(bullet, transform.position, transform.rotation);
	
		force = transform.forward;
	
		force.Normalize();
	
		force = force * bulletSpeed;
	
		bulletClone.velocity = force;
	
		//ensures bullet is parented to rail
		bulletClone.transform.parent = transform.parent;
		canFire = false;
		
		Destroy(chargeClone);
	}
	}
}
}