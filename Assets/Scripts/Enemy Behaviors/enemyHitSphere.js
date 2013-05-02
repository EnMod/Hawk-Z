#pragma strict

var collisionDamage = -30;
var lifeTime = 1.0;

function Start () {

}

function Update () {
	lifeTime -= Time.deltaTime;
	if(lifeTime <= 0)
		Destroy(gameObject);
}

function OnCollisionEnter(collision : Collision)
{
		
		if(collision.gameObject.CompareTag("Player"))
		{
			collision.gameObject.GetComponent(playerHealth).ChangeCurrentHealth(collisionDamage);
			Destroy (gameObject);
		}
		
}