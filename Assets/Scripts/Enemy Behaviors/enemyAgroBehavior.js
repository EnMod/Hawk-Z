#pragma strict

function Start () {

}

function OnTriggerEnter (other : Collider) 
{
	if(other.gameObject.tag == "Player")
	{
		transform.parent.GetComponent(enemyStationaryShoot).inRange = true;
		transform.parent.GetComponent(enemyStationaryShoot).aim.position = other.transform.position;
		Destroy(gameObject);
	}
}

//function OnCollisionExit (other : Collision) 
//{
//	if(other.gameObject.tag == "Player")
//	{
//		transform.parent.GetComponent(enemyStationaryShoot).inRange = false;
//	}
//}