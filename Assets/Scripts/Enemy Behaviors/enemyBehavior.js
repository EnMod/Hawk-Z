#pragma strict

//This is THE script for enemy behavior.  Everything the enemy does, it does through this script.  All important
//variables are stored in here as public variables.  Turn on Fire override in a different script to change what behavior
//triggers when it's time to fire.  Use "fireThisFrame" to know when to trigger that scripts fire override behavior

//You will need to pair this script with some kind of movement script, either "enemyStopShoot" or "enemyMoveShoot"

var maxHealth = 100.0;
//enemy speed
var speed = 10f;
var explosion : GameObject;
var explosionSize = 1.0;

private var explosionClone : GameObject;

@System.NonSerialized
var canExplode = true;		//determines if it is okay for the enemy to explode
@System.NonSerialized
var aim : GameObject;		//a transform of the aimer object.  It will need ot be destroyed on enemy death

//pathing variables.  These are passed in at spwn time, and then used by movement script
@System.NonSerialized
var srs : RadicalLibrary.SmoothQuaternion;
@System.NonSerialized
var path : Vector3[];		//the path the enemy is given
@System.NonSerialized
var CurrHealth = 100;

//firing variables
var bullet : Rigidbody;		//bullet prefab
private var bulletClone : Rigidbody;	//bullet created
var bulletSpeed = 200.0;
var bulletDamage = -10;		//damage of bullet
var accuracy = 1f;						//bullet accuracy
private var cooldown : float;
private var force : Vector3;
var reloadTime = 2.0;
var reloadStartDelay = 0.0;			//start
var stopFiringAtPathPercent = 99.0;			//will not fire past this percentage along the path
var collisionDamage = -30.0;			//damage if enemy collides with player

@System.NonSerialized
var fire = false;

@System.NonSerialized
var fireOverride = false;

@System.NonSerialized
var fireThisFrame = false;

private var statDelay = 2;

function Start () {
	cooldown = reloadStartDelay;
	
	CurrHealth = maxHealth;
}

function Update () {
	
	if(CurrHealth <= 0 )	
	{
		Destroy(gameObject);
	}
	
	Fire();
}

function ChangeCurrentHealth( Change : int){

	CurrHealth += Change;
	
	if(CurrHealth > maxHealth)
	{
		CurrHealth = maxHealth;
	}
	
}

//don't explode if application is quitting
function OnApplicationQuit()
{
	//tells script the app is quitting
	canExplode = false;
}

//explode when destroying in game
function OnDestroy()
{
	//explode only if the app is not in the process of quitting 
		//(necessary to prevent the enemies exploding in background on next playthrough
	if (canExplode)
	{
        explosionClone = Instantiate(explosion,transform.position,transform.rotation);
        explosionClone.transform.parent = transform.parent;
        explosionClone.transform.localScale = Vector3(explosionSize, explosionSize, explosionSize);
    }
    if(aim != null)
    {
    	Destroy(aim);
    }
}


//fires in whatever direction the enemy is facing
function Fire()
{
	if(fire)
	{
		//if fire isn't being overriden, fire.
		if(!fireOverride)
		{
			if(cooldown <= 0)
			{
			//instantiates bullet at player position, sets it face the same direction as the player and
			//	fire at bullet speed
				bulletClone = Instantiate(bullet, transform.position, transform.rotation);
				
				force = transform.forward;
			
				force.Normalize();
				
				force = force * bulletSpeed;
				
				bulletClone.velocity = force;
				
				bulletClone.GetComponent(enemyBulletBehavior).bulletDamage = bulletDamage;
				bulletClone.GetComponent(enemyBulletBehavior).velocity = bulletSpeed;
				
				//ensures bulelt is parented to rail
				bulletClone.transform.parent = transform.parent;
			}
		}
		
		//otherwise, cooldown
		if(cooldown <= 0)
		{
			cooldown = reloadTime;
			fireThisFrame = true;
		}
		else
		{
			fireThisFrame = false;
		}
		
		cooldown -= Time.deltaTime;
	}
}

//damage player in collision
function OnCollisionEnter(collision : Collision)
{
		if(collision.gameObject.tag == "Player")
		{
			Debug.LogWarning("collide!");
			collision.gameObject.GetComponent(playerHealth).ChangeCurrentHealth(collisionDamage);
			Destroy (gameObject);
		}
		
}

function ForceShoot()
{
	bulletClone = Instantiate(bullet, transform.position, transform.rotation);
				
	force = transform.forward;
	force.Normalize();
			
	force = force * bulletSpeed;
			
	bulletClone.velocity = force;
			
	bulletClone.GetComponent(enemyBulletBehavior).bulletDamage = bulletDamage;
	bulletClone.GetComponent(enemyBulletBehavior).velocity = bulletSpeed;
			
	//ensures bulelt is parented to rail
	bulletClone.transform.parent = transform.parent;
}