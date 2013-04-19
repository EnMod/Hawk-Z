#pragma strict
#pragma downcast
import System.Collections.Generic;

private var fastForward = 0.0;

class SpawnData implements System.IComparable
{
	var enemy : Transform;
	var path : GameObject;
	var playerPosition : float;
	var addedDelay : float;
	
	//compare function to allow sorting
	function CompareTo(obj : Object)
	{
		var otherSpawnData : SpawnData = obj;
		return playerPosition.CompareTo(otherSpawnData.playerPosition);
	}
}


var spawnList : SpawnData [];
var otherList : Array;

var pointsPerSpline = 5;		//the number of points on each path

private var splines : Vector3[,];		//two dimentional array that holds the points on each path

@System.NonSerialized
var enemyClone : Transform;			//clone of enemy

private var enemyPointer : int;

@System.NonSerialized
var speeding = true;

private var j : int;
private var k : int;
private var i : int;
private var n : int;

function Start () {
	Clean();
	splines = new Vector3[spawnList.Length , pointsPerSpline];

	//fills spline array
	for(j = 0; j < spawnList.Length; j++)
	{
		for(k = 0; k < pointsPerSpline; k++)
		{
			splines[j,k] = spawnList[j].path.transform.Find("wp" + k).transform.localPosition;
			Debug.Log("splines[" + j + "][" + k + "]: " + splines[j,k]);
			spawnList[j].path.transform.Find("wp" + k).gameObject.active = false;
		}
	}
	
	fastForward = gameObject.GetComponent(railMove).fastForwardTo;
	
	if (fastForward == 0)
		speeding = false;
}


function Update () {
   
    //check if player has hit a spawn position
    while(enemyPointer < spawnList.Length && spawnList[enemyPointer].playerPosition <= gameObject.GetComponent(railMove).location)
    {
    	if(!speeding)
    	{
    		var arrayCopy = new Vector3[pointsPerSpline];
    		
    		for (i=0; i<pointsPerSpline; i++)
    			arrayCopy[i] = splines[enemyPointer, i];
    
    	InstantiateEnemy(enemyPointer, arrayCopy);
    	}
    	enemyPointer += 1;
    }
    
    if(gameObject.GetComponent(railMove).location >= fastForward)
    {
    	speeding = false;
    }
    	
}

//instantiates the enemy
function InstantiateEnemy(ep : int, path : Vector3[]){
	
	var sr : RadicalLibrary.SmoothQuaternion;
	
	enemyClone = Instantiate(spawnList[ep].enemy, splines[ep, 0], Quaternion.identity);
    
    //set parent of clone
    enemyClone.parent = transform;
    
    //set poisition of clone
    enemyClone.localPosition = splines[ep, 0];
    
    //set initial variables of some kind
    sr = enemyClone.localRotation;
    sr.Duration = 0.5f;
    
    //pass variables to the enemy clone
    enemyClone.GetComponent(enemyBehavior).srs = sr;
    enemyClone.GetComponent(enemyBehavior).path = path;
    enemyClone.GetComponent(enemyBehavior).reloadStartDelay += spawnList[ep].addedDelay;
    
//    Debug.LogWarning(enemyClone.GetComponent(enemyBehavior).reloadStartDelay);
}

function Clean()
{
	var newarr : Array = new Array (spawnList);
	
	//System.Array.Sort(spawnList);
	for (i = 0; i < newarr.length; i++)
	{
		var temp : SpawnData = newarr[i];
		
		if(temp.playerPosition <= 0)
		{
			newarr.RemoveAt(i);
		}
	}
	
	newarr.Sort();
	spawnList = newarr.ToBuiltin(SpawnData) as SpawnData[];
}