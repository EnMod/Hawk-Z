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

@System.NonSerialized
var lockOn : Transform;		//tranform of locked on target

@System.NonSerialized
var target : Transform;

var mainReticle : GameObject;

var lockReticle : GameObject;

private var mBehavior : reticleDraw;

private var lBehavior : reticleLockDraw;

private var cam : Camera;

function Awake()
{
	mBehavior = mainReticle.GetComponent(reticleDraw);
	lBehavior = lockReticle.GetComponent(reticleLockDraw);
	
	cam = Camera.main;
}

function Update () {

if(canFire)
{
	var lockDraw : Vector3;
	
	//set bullet to be parented by the avatar
	for (var child : Transform in transform.parent)
	{
		lockDraw = cam.WorldToScreenPoint(child.position);
		//if(child.tag == "Enemy") Debug.LogError("Enemy: " + lockDraw);
		
		lockDraw.y = Screen.height - lockDraw.y;
		
		if(child.tag == "Enemy" && lockDraw.x >= mBehavior.drawRect.xMin && lockDraw.x <= mBehavior.drawRect.xMax
			&& lockDraw.y >= mBehavior.drawRect.yMin && lockDraw.y <= mBehavior.drawRect.yMax)
		{
			lBehavior.target = child;
			target = child;
		}
	}
}
else
{
	lBehavior.target = null;
}

//start charge when pressed
if (Input.GetMouseButtonDown(0))
{	
	charge = initCharge;
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
	//Physics.IgnoreCollision(bulletClone.collider, collider);	
	bulletClone.GetComponent(playerLockBulletBehavior).target = target;
	
	
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
		//Physics.IgnoreCollision(bulletClone.collider, collider);
	
		//turns off ability to fire
		canFire = false;
		
		Destroy(chargeClone);
	}
}
}