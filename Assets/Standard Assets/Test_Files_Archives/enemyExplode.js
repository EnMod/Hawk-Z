//#pragma strict
//
////causes enemy to explode on death by instantiating explosion
//
//var explosion : GameObject;
//
//private var explosionClone : GameObject;
//
//private var canExplode = true;		//determines if it is okay for the enemy to explode
//
//function OnApplicationQuit()
//{
//	//tells script the app is quitting
//	canExplode = false;
//}
//
//function OnDestroy()
//{
//	//explode only if the app is not in the process of quitting 
//		//(necessary to prevent the enemies exploding in background on next playthrough
//	if (canExplode)
//	{
//        explosionClone.Instantiate(explosion,transform.position,transform.parent.rotation);
//    }
//}
