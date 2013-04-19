#pragma strict

import System.Collections.Generic;

@System.NonSerialized
var childList : List.<Transform>;

private var nextChild = 0;

function Awake()
{
	childList = new List.<Transform>();
	
	for (var child : Transform in transform) 
	{
    	childList.Add(child);
    	
    	//set variables
    	child.gameObject.GetComponent(enemyBehavior).bulletSpeed     = gameObject.GetComponent(enemyBehavior).bulletSpeed;
    	child.gameObject.GetComponent(enemyBehavior).bulletDamage    = gameObject.GetComponent(enemyBehavior).bulletDamage;
    	child.gameObject.GetComponent(enemyBehavior).maxHealth       = gameObject.GetComponent(enemyBehavior).maxHealth;
    	child.gameObject.GetComponent(enemyBehavior).collisionDamage = gameObject.GetComponent(enemyBehavior).collisionDamage;
    	child.gameObject.GetComponent(enemyBehavior).explosion = gameObject.GetComponent(enemyBehavior).explosion;
    	child.gameObject.GetComponent(enemyBehavior).bullet = gameObject.GetComponent(enemyBehavior).bullet;
	}
	
	//turn on fire override
	gameObject.GetComponent(enemyBehavior).fireOverride = true;
}

function Update()
{
	if(gameObject.GetComponent(enemyBehavior).fireThisFrame)
	{
		if(childList[nextChild] != null)
		{
			childList[nextChild].gameObject.GetComponent(enemyBehavior).ForceShoot();
		}
		
		nextChild ++;
	}
	
	//loop through available children
	nextChild = nextChild % childList.Count;
}







//
//@System.NonSerialized
//var dist : float;			//distance along path
//@System.NonSerialized
//var srs : RadicalLibrary.SmoothQuaternion;
//@System.NonSerialized
//var path : Vector3[];		//the path the enemy is given
//private var sr : RadicalLibrary.SmoothQuaternion;
//
//private var tempPath : Vector3[,];		//path of spawns
//
////enemy speed
//@System.NonSerialized
//var speed = 10f;
//
//var spreadOfUnits = 5.0;
//
//var numUnits = 3;
//
//var unitType : GameObject;
//
//private var unitClone : GameObject[];
//private var mult : Vector3;
//private var i : int;
//
//private var takeStats = 0;		//determines when to take stats
//
//function Awake()
//{
//	unitClone = new GameObject[numUnits];
//	tempPath = new Vector3[numUnits,];
//}
//
//function Update () {
//
//	//wait one frame for the enemy move script to initialize
//	if(takeStats == 0)
//		takeStats++;
//	
//	//take all of the stats from the enemy move script
//	else if (takeStats == 1)
//	{
//		srs = gameObject.GetComponent(enemyBehavior).srs;
//		path = gameObject.GetComponent(enemyBehavior).path;
//		speed = gameObject.GetComponent(enemyBehavior).speed;
//		
//		takeStats ++;
//		
//		for(i = 0; i < numUnits; i++)
//		{
//			//add to each path
//			mult = new Vector3(Mathf.Cos(Mathf.PI / (i + 1)), Mathf.Sin(Mathf.PI / (i + 1)), 0) * spreadOfUnits;
//			
//			tempPath[i] = path;
//			
//			for(var vec : Vector3 in tempPath)
//			{
//				vec += mult;
//				Debug.LogWarning(i + "  " + vec);
//			}
//			
//			var sr : RadicalLibrary.SmoothQuaternion;
//	
//	
//			unitClone[i] = GameObject.Instantiate(unitType, Vector3(0,0,0), Quaternion(0,0,0,0));
//		    
//		    //set parent of clone
//		    unitClone[i].transform.parent = GameObject.FindGameObjectWithTag("Rail").transform;
//		    
//		    unitClone[i].transform.localPosition = tempPath[i][0];
//		    
//		    //set initial variables of some kind
//		    sr = unitClone[i].transform.localRotation;
//		    sr.Duration = 0.5f;
//		    
//		    //pass variables to the enemy clone
//		    unitClone[i].GetComponent(enemyBehavior).srs = sr;
//		    unitClone[i].GetComponent(enemyBehavior).path = tempPath[i];
//		}
//	}
//			
//	//if at the end of the path, destroy the enemy without exploding it
//	if(dist >= .999)
//	{
//		gameObject.GetComponent(enemyBehavior).canExplode = false;
//		Destroy(gameObject);
//	}
//}
//	
//	/*
//function InstantiateEnemy(path : Vector3[]){
//	
//	
//	
//	
//	unitClone = Instantiate(unitType, Vector3(0,0,0), Quaternion(0,0,0,0));
//    
//    //set parent of clone
//    unitClone.transform.parent = GameObject.FindGameObjectWithTag("Rail").transform;
//    
//    unitClone.transform.localPosition = tempPath[0];
//    
//    //set initial variables of some kind
//    sr = unitClone.transform.localRotation;
//    sr.Duration = 0.5f;
//    
//    //pass variables to the enemy clone
//    unitClone.GetComponent(enemyBehavior).srs = sr;
//    unitClone.GetComponent(enemyBehavior).path = tempPath;
//}*/
