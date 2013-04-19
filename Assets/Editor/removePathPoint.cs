using UnityEngine;
using UnityEditor;
using System.Collections;
using System.Collections.Generic;

public class removePathPoint : ScriptableWizard {
	public GameObject path;
	public int pathLength = 0;
	public int removeAt;
	public int numberOfPointsToRemove = 1;
	
	private List<Transform> modded = new List<Transform>();
	private GameObject newPoint;
	
	//runs next function when menu item is activated
	[MenuItem("Editor/Remove Path Waypoint")]
	static void Generate()
	{
		
		
		ScriptableWizard.DisplayWizard("Remove Waypoint", typeof(removePathPoint),
			"Remove Point");
	}
	
	void OnWizardCreate () 
	{	
		AddPathPoint();
	}
	
	void AddPathPoint()
	{
		Undo.RegisterSceneUndo("Add Path Point");
		
		for(int i = removeAt + numberOfPointsToRemove; i < pathLength; i++)
		{
			modded.Add (path.transform.Find("wp" + i));
			modded[i - removeAt - numberOfPointsToRemove].name = ("temp" + (i - numberOfPointsToRemove));
		}
		
		for(int i = 0; i < numberOfPointsToRemove; i++)
		{	
			DestroyImmediate(path.transform.Find("wp" + (i + removeAt)).gameObject);
		}
		
		for(int i = 0; i < modded.Count; i++)
		{
			modded[i].name = ("wp" + (removeAt + i));
		}
		
		//update path graphic
		path.transform.Find ("PathGraphic(Clone)").gameObject.GetComponent<pathGraphicUpdate>().pathLength = pathLength - numberOfPointsToRemove;
	}
	
	void OnWizardUpdate()
	{
		//automate path length calculation
		int i = 0;
		while(path != null && path.transform.Find("wp" + i) != null)
		{
			i++;
		}
		
		if(i != 0 && pathLength == 0)
		{
			pathLength = i;
		}
		
		for(int k = 0; k < pathLength; k++)
		{
			if(path != null && path.transform.Find("wp" + k) == null)
			{
				errorString = "Error at waypoint " + k +". Number of waypoints does not match path length properly.";
				isValid = false;
				break;
			}
			else 
			{
				errorString = "";
				isValid = true;
			}
		}
		
		if(removeAt > pathLength)
		{
			errorString = "\"Remove At\" cannot be greater than \"Path Length\"";
			isValid = false;
		}
		else 
		{
			errorString = "";
			isValid = true;
		}
		
		if(removeAt == pathLength || removeAt <= 0)
		{
			errorString = "\"Remove At\" cannot be equal to the path's length or 0";
			isValid = false;
		}
		else 
		{
			errorString = "";
			isValid = true;
		}
	}
}
