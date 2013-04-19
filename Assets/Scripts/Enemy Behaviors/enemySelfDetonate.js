#pragma strict

private var hitClone : GameObject;
var explosionSize = 10;

function Start () {

}

function Update () {
	if(transform.localPosition.z <= 0)
	{
		hitClone = Resources.Load("EnemyHitSphere");
		
		hitClone = Instantiate(hitClone, transform.position, transform.rotation);
		hitClone.transform.localScale = Vector3(explosionSize, explosionSize, explosionSize);
		hitClone.transform.parent = transform.parent;
		hitClone.GetComponent(enemyHitSphere).collisionDamage = gameObject.GetComponent(enemyBehavior).collisionDamage;
		Destroy(gameObject);
	}
}