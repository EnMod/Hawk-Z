#pragma strict

var collisionDamage = -30;
var lifeTime = 1.0;

function Start () {

}

function Update () {

}

function OnCollisionEnter(collision : Collision)
{
		lifeTime -= Time.deltaTime;
		if(lifeTime <= 0)
			Destroy(gameObject);
		
		if(collision.gameObject.CompareTag("Player"))
		{
			collision.gameObject.GetComponent(playerHealth).ChangeCurrentHealth(collisionDamage);
			Destroy (gameObject);
		}
		
}