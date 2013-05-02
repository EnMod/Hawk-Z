#pragma strict
@System.NonSerialized var Orb0 : GameObject;		//The 3 Orbs circling around.
@System.NonSerialized var Orb1 : GameObject;
@System.NonSerialized var Orb2 : GameObject;
@System.NonSerialized var OrbCount : int;			//Number of orbs alive.
var backForth : float = 0;				//Back and forth increment for 2-orb.
var posMultiplier : float = 3.0;	//Distance multiplier of orbs from center.
var rotateSpeed3 : float = 1.0;		//Rotation with 3 orbs
var rotateSpeed2 : float = 3.0;		//Rotation with 2 orbs (faster)
var connectorWidth : float = 3;

function Awake () {

	//Searches for the 3 gameObjects and sets them to the variables.
	Orb0 = transform.Find("Sphere0").gameObject;
	Orb1 = transform.Find("Sphere1").gameObject;
	Orb2 = transform.Find("Sphere2").gameObject;
	
	//Sets initial Orb Count to 3, affecting the behavior of the enemy.
	OrbCount = 3;
	
}

function Update () {
	
	//When 3 Orbs, rotate around the center and render lines accordingly.
	if(OrbCount == 3)
	{
		rendLines (3);
		transform.Rotate(0,0,rotateSpeed3);
		
	}
	//When 2 Orbs, fluctuate remaining 2 and render lines accordingly.
	else if(OrbCount == 2)
	{
		rendLines(2);
		
		transform.Rotate(0,0,rotateSpeed2);
		
		transform.localPosition.x += backForth;
		
		if(transform.localPosition.x >= 2 || transform.localPosition.x <= -2)
			backForth *= -1;
	}
	
	//If 1 Orb, rend lines accordingly.
	else if(OrbCount == 1)
	{
		rendLines(1);
	}
	//If any other values, set count to 0 to prevent any errors. 0 will destroy object.
	else
	{
		OrbCount = 0;
	}
}

//Draws the connections with Orb functions based on total Orb count.
function rendLines(count : int) {

	if(count == 3)
	{
		Orb0.gameObject.GetComponent(enemyOrbBehavior).drawConnection(Orb1.transform.position);
		Orb1.gameObject.GetComponent(enemyOrbBehavior).drawConnection(Orb2.transform.position);
		Orb2.gameObject.GetComponent(enemyOrbBehavior).drawConnection(Orb0.transform.position);
	} //End 3
	
	else if(count == 2)
	{
		if(Orb0)
		{
			
			if(Orb1)	//Orbs 0 and 1 are active
			{
				Orb0.gameObject.GetComponent(enemyOrbBehavior).drawConnection(Orb1.transform.position);
				Orb1.gameObject.GetComponent(enemyOrbBehavior).lineRend.SetVertexCount(0);
			}
			
			else		//Orbs 0 and 2 are active
			{
				Orb0.gameObject.GetComponent(enemyOrbBehavior).drawConnection(Orb2.transform.position);
				Orb2.gameObject.GetComponent(enemyOrbBehavior).lineRend.SetVertexCount(0);
			}
		}
		
		else			//Orbs 1 and 2 are active
		{
			Orb1.gameObject.GetComponent(enemyOrbBehavior).drawConnection(Orb2.transform.position);
			Orb2.gameObject.GetComponent(enemyOrbBehavior).lineRend.SetVertexCount(0);
		}
	}//End 2
	
	else if(count == 1)
	{
		if(Orb0)
			Orb0.gameObject.GetComponent(enemyOrbBehavior).lineRend.SetVertexCount(0);
		else if(Orb1)
			Orb1.gameObject.GetComponent(enemyOrbBehavior).lineRend.SetVertexCount(0);
		else
			Orb2.gameObject.GetComponent(enemyOrbBehavior).lineRend.SetVertexCount(0);
	}//End 1
	
}
