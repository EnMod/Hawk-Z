using UnityEngine;
using UnityEditor;
using System.Collections;
using System.Collections.Generic;

public class addPathPoint : ScriptableWizard {
	public GameObject path;
	public int pathLength = 0;
	public int addAt;
	public int numberOfPointsToAdd = 1;
	
	private List<Transform> modded = new List<Transform>();
	private GameObject newPoint;
	
	//runs next function when menu item is activated
	[MenuItem("Editor/Add Path Waypoint")]
	static void Generate()
	{
		
		
		ScriptableWizard.DisplayWizard("Add Waypoint", typeof(addPathPoint),
			"Add Point");
	}
	
	void OnWizardCreate () 
	{	
		AddPathPoint();
	}
	
	void AddPathPoint()
	{
		Undo.RegisterSceneUndo("Add Path Point");
		
		for(int i = addAt; i < pathLength; i++)
		{
			modded.Add (path.transform.Find("wp" + i));
			modded[i - addAt].name = ("temp" + (i + numberOfPointsToAdd));
		}
		
		for(int i = 0; i < numberOfPointsToAdd; i++)
		{
			newPoint = GameObject.CreatePrimitive(PrimitiveType.Cube);
			newPoint.name = "wp" + (addAt + i);
			newPoint.transform.position = Vector3.Lerp(path.transform.Find("wp" + (addAt - 1)).position,
														modded[0].position, (i + 1f) / (numberOfPointsToAdd + 1f));
			newPoint.transform.parent = path.transform;
			newPoint.transform.localScale = path.transform.Find("wp" + i).localScale;
		}
		
		for(int i = 0; i < modded.Count; i++)
		{
			modded[i].name = ("wp" + (addAt + i + numberOfPointsToAdd));
		}
		
		//update path graphic
		path.transform.Find ("PathGraphic(Clone)").gameObject.GetComponent<pathGraphicUpdate>().pathLength = pathLength + numberOfPointsToAdd;
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
		
		if(addAt > pathLength)
		{
			errorString = "\"Add At\" cannot be greater than \"Path Length\"";
			isValid = false;
		}
		else 
		{
			errorString = "";
			isValid = true;
		}
		
		if(addAt == pathLength || addAt <= 0)
		{
			errorString = "\"Add At\" cannot be equal to the path's length or 0";
			isValid = false;
		}
		else 
		{
			errorString = "";
			isValid = true;
		}
	}
}
