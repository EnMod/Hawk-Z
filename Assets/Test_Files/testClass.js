#pragma strict

var target : Transform;

var reticle : Transform;

private var reticleClone : GameObject;

private var onTarget = false;

function Start () {
	
}

function Update () {
	if(GameObject.Find("Player").GetComponent(playerFireCharged).canFire == false)
	{
		reticle.localPosition = Vector3(0, 0, -30);
		
		GameObject.Find("LockReticle").transform.parent = transform.parent;
	}
}

function OnTriggerEnter(collision : Collider)
{
	//when the enemy is within sights, lock on if the bullet is charging
		if(! onTarget && GameObject.Find("Player").GetComponent(playerFireCharged).canFire == true)
		{
		
		target = collision.transform;
		
		transform.parent.GetComponent(playerFireCharged).lockOn = target;
		
		Debug.Log("entered collision");
		
		/*reticleClone = Instantiate(reticle, target.position, GameObject.Find("Reticle").transform.rotation);
		
		reticleClone.transform.localScale = Vector3(1,0,1);
		
		reticleClone.transform.parent = transform.parent.parent;*/
		
		reticle.position = target.position;
		
		reticle.parent = target;
		
		reticle.localRotation = GameObject.Find("Reticle").transform.rotation;
		}
}

/*function OnTriggerExit(collision : Collider)
{
	if(onTarget)
	{
	reticle.localPosition = Vector3(0, 0, -30);
	
	//GameObject.Find("LockReticle").transform.parent = transform.parent;
	
	onTarget = false;
	}
}*/