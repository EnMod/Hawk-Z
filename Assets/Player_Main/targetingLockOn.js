#pragma strict

var target : Transform;		//what is being locked on to

var reticle : Transform;	//the lock on reticle itself	

function Start () {
	
}

function Update () {
	//if player is not charging bullet or bullet cannot fire, move lock reticle to behind player and parent it there
	if(GameObject.Find("Player").GetComponent(playerFireCharged).canFire == false)
	{
		reticle.localPosition = Vector3(0, 0, -30);
		
		GameObject.Find("LockReticle").transform.parent = transform.parent;
	}
}

function OnTriggerEnter(collision : Collider)
{
	//when the enemy is within sights, lock on if the bullet is charging
		if(collision.gameObject.CompareTag("Enemy") 
			&& gameObject.Find("Player").GetComponent(playerFireCharged).canFire == true)
		{
		
		//move lock reticle to the target
		target = collision.transform;
		
		//set lockOn variable of playerFireCharged to the target
		transform.parent.GetComponent(playerFireCharged).lockOn = target;
		
		//move the reticle to the target and parent it
		reticle.position = target.position;
		reticle.parent = target;
		
		//roate lock reticle to the same as main reticle
		reticle.localRotation = GameObject.Find("Reticle").transform.localRotation;
		}
}