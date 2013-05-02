#pragma strict

//copy all stats from behavior
//when it's time to fire, change bullet so that if it's behind the player it auto destructs.  Also ensure fire is at right time

private var behavior : enemyBehavior;

@System.NonSerialized 
var aim : Transform;	//aimer

private var player : Transform;	//player

private var agro : Rigidbody; 

private var ori : Vector3;

@System.NonSerialized
var inRange = false;

@System.NonSerialized
var bullet : Rigidbody;		//bullet prefab
private var bulletClone : Rigidbody;	//bullet created
@System.NonSerialized
var bulletSpeed = 200.0;
@System.NonSerialized
var bulletDamage = -10;		//damage of bullet
@System.NonSerialized
var accuracy = 1f;						//bullet accuracy
private var cooldown : float;
private var force : Vector3;
@System.NonSerialized
var reloadTime = 2.0;
@System.NonSerialized
var reloadStartDelay = 0.0;			//start
@System.NonSerialized
var collisionDamage = -30.0;			//damage if enemy collides with player
 
private var rData : railEnemySpawn;
 
var throwTime = .7;  

var numShots = 3;

private var hitClone : GameObject;
var explosionSize = 50;

var suicide = false;
 
function Awake () {
	rData = GameObject.FindGameObjectWithTag("Rail").GetComponent(railEnemySpawn);
	
	behavior = gameObject.GetComponent(enemyBehavior);
	
	//find aimer and player
	aim = transform.Find("AimObject");
	//agro = transform.Find("AgroObject").rigidbody;
	behavior.aim = aim.gameObject;
	player = GameObject.FindWithTag("Player").transform.parent;
	aim.parent = player.parent;
	aim.localPosition = player.localPosition;
	
	//allow enemy to fire
	behavior.fire = true;
	
	ori = transform.forward;
	
	behavior.fireOverride = true;
}

function Start()
{
	//take stats from behavior
	bullet = behavior.bullet;
	bulletSpeed = behavior.bulletSpeed;
	bulletDamage = behavior.bulletDamage;
	accuracy = behavior.accuracy;
	reloadTime = behavior.reloadTime;
	reloadStartDelay = behavior.reloadStartDelay;
	collisionDamage = behavior.collisionDamage;
}

function Update () {
	aim.localPosition = Vector3.Lerp(aim.localPosition, player.localPosition, Time.deltaTime * accuracy);
	
	transform.LookAt(aim.position);
	
	if(inRange && numShots > 0 && !rData.speeding) 
	{
		if(!suicide)
		{
			Fire();
		}
		else
		{
			Debug.LogWarning("Self-Detonate2");
			Detonate();
		} 
	}
	
	transform.forward = ori;
}

//fires in whatever direction the enemy is facing
function Fire()
{
		if(cooldown <= throwTime  && !transform.Find("Graphic").animation.isPlaying)
			transform.Find("Graphic").animation.Play("Take 001");
		
		//if fire isn't being overriden, fire.
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
			bulletClone.transform.parent = GameObject.FindGameObjectWithTag("Rail").transform;
			
			//destroy bullet if behind player
			if(bulletClone.transform.localPosition.z <= 5)
			{
				 Destroy(bulletClone.gameObject);
				 inRange = false;
			}
			
			cooldown = reloadTime; 
			
			numShots --;
		}
		
		cooldown -= Time.deltaTime;
}

function Detonate()
{
	hitClone = Resources.Load("EnemyHitSphere");
		
	hitClone = Instantiate(hitClone, transform.position, transform.rotation);
	hitClone.transform.localScale = Vector3(explosionSize, explosionSize, explosionSize);
	hitClone.transform.parent = transform.parent;
	hitClone.GetComponent(enemyHitSphere).collisionDamage = gameObject.GetComponent(enemyBehavior).collisionDamage;
	Destroy(gameObject);
}