using UnityEngine;
using UnityEditor;
using System.Collections.Generic;

public class generatePath : ScriptableWizard {
	public GameObject path;
	public int pathLength;
	public Color color = new Color(0, 255, 255);
	public float width = 30;
	//public bool makePathUpdatable = false;
	
	private GameObject pathGraphic;
	private List<Vector3> points = new List<Vector3>();
	
	//runs next function when menu item is activated
	[MenuItem("Editor/Generate Path Graphics")]
	static void Generate()
	{
		
		
		ScriptableWizard.DisplayWizard("Generate Path Graphics", typeof(generatePath),
			"Generate & Close","Generate");
	}
	
	// Use this for initialization
	void OnWizardCreate () {
		CreatePath();
	}
	
	 void OnWizardOtherButton () {
		CreatePath();
	}
	
	void CreatePath()
	{
		if(path.transform.Find ("PathGraphic(Clone)") != null)
		{
			GameObject.DestroyImmediate(path.transform.Find ("PathGraphic(Clone)").gameObject);
			Debug.Log ("Path already exists. Replacing");
		}
		
		pathGraphic = (GameObject)Instantiate((GameObject)Resources.Load("PathGraphic"), new Vector3(0,0,0), new Quaternion(0,0,0,0));
		//pathGraphic.name = "Path Graphic";
		pathGraphic.transform.parent = path.transform;
		
		
		pathGraphic.gameObject.GetComponent<pathGraphicUpdate>().pathLength = pathLength;
		pathGraphic.gameObject.GetComponent<pathGraphicUpdate>().color = color;
		pathGraphic.gameObject.GetComponent<pathGraphicUpdate>().width = width;
		pathGraphic.gameObject.GetComponent<pathGraphicUpdate>().points = points;
		//pathGraphic.gameObject.GetComponent<pathGraphicUpdate>().updatable = makePathUpdatable;

			
		
		for(int k = 0; k < pathLength; k++)
		{
			points.Add(path.transform.Find("wp" + k).transform.position);
			Debug.Log(k + ": " + points[k]);
		}
		
		
		
		//pathGraphic.AddComponent<pathGraphicDestroy>((PathGraphicDestroy)Resources.Load("pathGraphicDestroy"));
		LineRenderer lr = (LineRenderer)pathGraphic.GetComponent("LineRenderer");
		
		
			lr.SetVertexCount(pathLength);
			
		for (int i = 0; i <  pathLength; i++)
		{
			
			lr.SetPosition(i, points[i]);
		}
		
		//set colors and width
		lr.SetColors(color,color);
		
		//set width
		lr.SetWidth(width, width);
		
		//reset points
		points = new List<Vector3>();	
	}
	
	void OnWizardUpdate()
	{
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
	}
}
