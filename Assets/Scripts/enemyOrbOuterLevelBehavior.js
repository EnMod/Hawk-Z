#pragma strict

private var target : Transform;			//Transform of the target.
//private var laserDist : int;			//Length of the laser.
//var laserDistMult : float = 2;		//Multiplier for laserDist
private var laserFade : float = 1.5;		//Duration the laser stays on screen.
private var laserFadeCount : float = 0;		//Counter for laser fade. When reaches 0, laser disappears.
private var orbCount : int;				//Number of Orbs active in the system.

private var laser : GameObject;			//Actual laser cylinder gameObject


private var charger : GameObject;		//The charger object itself.
var chargerSize : float = 2.0;			//Size of the charger orb.
private var chargeCount : float = 0.0;	//Counts up to chargeStart.
private var chargeInc : float = 1.0;	//Increment to chargeCount. Don't change.
var chargeTime : float = 0.0;			//Charge time.
private var charging : boolean;			//The charger is currently charging.
private var charged : boolean = false;	//The charger is fully charged.

private var audPlay = false;

var fireTime = 2.5;

var laserCirc : float = chargerSize;	//Circumference of laser cylinder.ß

var laserPrefab : GameObject;

private var hitClone : GameObject;
var explosionSize = 10;

private var start = true;

private var accReset = false;

//Starts the charger, finds the target, and sets up the laser.
function Awake() {	
	gameObject.GetComponent(enemyBehavior).fireOverride = true;
	
	charger = transform.Find("Charger").gameObject;
	
	charging = true;
	
	inner = transform.Find("InnerLevel").GetComponent(enemyOrbInnerLevelBehavior);
}

var inner : enemyOrbInnerLevelBehavior;

function Update () {
	if(start)
	{
		target = gameObject.GetComponent(enemyMoveShoot).aim;
		
		start = false;
	}
	
	
	//Causes the laser to disappears after a short duration.
	if(laserFadeCount > 0)	
	{
		laserFadeCount -= Time.deltaTime;
		
		if(hitClone)
		{
			hitClone.transform.position = target.position;
		}
		
	}
	else
	{
		
		Destroy(laser.gameObject);
		Destroy(hitClone);
		
		charging = true;
	}
	
	//restore accuracy after firing
	if(accReset && laserFadeCount <= 0)
	{
		//gameObject.GetComponent(enemyMoveShoot).aimAtTarget = true;
		gameObject.GetComponent(enemyBehavior).accuracy *= 4;
		accReset = false;
	}
		
	
	//Keeps track of the number of active orbs in the system and behaves accordingly.
	orbCount = inner.OrbCount;
	
	//If three orbs are active, charge the laser. If charged, fire and repeat.
	if(orbCount == 3)
	{
		if(laser)
		{
			laser.transform.forward = transform.forward;
			
			laser.transform.localPosition = transform.localPosition;
		}
		
		
		gameObject.GetComponent(enemyBehavior).fire = false;
		if(charging) 
		{
			if(chargeCount >= fireTime && !audPlay)
			{
				audio.Play();
				audPlay = true;
			}
			if(chargeCount >= chargeTime)
			{
				charging = false;
				charged = true;
				chargeCount = 0.0;
			}
			else if(chargeCount < chargeTime)
			{
				//Increases size of charger based on charge time.
				charger.transform.localScale.x += (chargerSize/chargeTime) * chargeInc * Time.deltaTime;
				charger.transform.localScale.y += (chargerSize/chargeTime) * chargeInc * Time.deltaTime;
				charger.transform.localScale.z += (chargerSize/chargeTime) * chargeInc * Time.deltaTime;
			
				//transform.LookAt(target);
				
				chargeCount += chargeInc * Time.deltaTime;
			}
		}
		
		//When charged, draw laser and fire.
		if(charged)
		{
			drawLaser();
			accReset = true;
			gameObject.GetComponent(enemyBehavior).accuracy /= 4;
			//gameObject.GetComponent(enemyMoveShoot).aimAtTarget = false;
			
			charged = false;
			charger.transform.localScale.x = 0;
			charger.transform.localScale.y = 0;
			charger.transform.localScale.z = 0;
		}
		
	}
	
	//2 or 1 Node Behavior
	else
	{
		gameObject.GetComponent(enemyBehavior).fire = true;
		charging = false;
		Destroy(charger);
		
		if(orbCount == 2)
		{
			if(laser != null)
			{
				Destroy(laser.gameObject);
				Destroy(hitClone);
			}
			
			if(transform.localPosition.z <= 0)
			{	
				hitClone = Resources.Load("EnemyHitSphere");
		
				hitClone = Instantiate(hitClone, transform.position, transform.rotation);
				hitClone.transform.localScale = Vector3(9, 9, 9);
				hitClone.transform.parent = transform.parent;
				hitClone.GetComponent(enemyHitSphere).collisionDamage = gameObject.GetComponent(enemyBehavior).bulletDamage;
				Destroy(gameObject);
			}
		}
	}
	
	if(orbCount <= 0)
	{
		if(laser != null)
		{
			Destroy(laser.gameObject);
			Destroy(hitClone);
		}
		
		gameObject.GetComponent(enemyBehavior).canExplode = false;
		Destroy(gameObject);
	}
}

//Draws the laser and shoots.
function drawLaser() {
	/*
	var endpoint : Vector3;
	
	laserDist = Vector3.Distance(target.position, transform.position) * laserDistMult;
	
	endpoint = transform.forward.normalized * laserDist;
	endpoint += transform.position;

	//Creates an cylinder shot at the target location.
	laser = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
	laser.gameObject.name = "Laser";
	laser.AddComponent(Rigidbody);
	laser.rigidbody.isKinematic = true;
	
	laser.transform.parent = transform.parent;
	
//	Vector3.Lerp(endPoint, transform.localPosition, 0)
	
	laser.transform.position = Vector3.Lerp(endpoint, transform.position, 0.5); //(target.position - transform.position) * 0.5f;
	laser.transform.localScale.x = laserCirc;
	laser.transform.localScale.z = laserCirc;
	laser.transform.localScale.y = laserDist/2;
	laser.transform.up = (target.position - transform.position).normalized;
	//laser.transform.forward = transform.forward;
	*/
	
	hitClone = Resources.Load("EnemyHitSphere");
		
	hitClone = Instantiate(hitClone, target.position, target.rotation);
	hitClone.transform.localScale = Vector3(10, 10, 10);
	hitClone.transform.parent = transform.parent;
	hitClone.GetComponent(enemyHitSphere).collisionDamage = gameObject.GetComponent(enemyBehavior).collisionDamage;
	hitClone.GetComponent(enemyHitSphere).lifeTime = laserFade;
	
	laserFadeCount = laserFade;
	
	laser = GameObject.Instantiate(laserPrefab, transform.position, transform.rotation);
	
	Debug.LogWarning(laser.name);
	
	laser.transform.parent = transform.parent;
	
	audPlay = false;
}