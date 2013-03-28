using UnityEngine;
using UnityEditor;
using System.Collections;
using System.Collections.Generic;

public class createEnemyPath : ScriptableWizard {
	public string newPathName ="";
	public int newPathLength = 0;
	public Color color = Color.white;
	public float width = 1;
	public bool createGenericPathInstead = false;
	
	
	private GameObject path;
	private GameObject pathGraphic;
	private List<Vector3> points = new List<Vector3>();
	
	//runs next function when menu item is activated
	[MenuItem("Editor/Create Enemy Path")]
	static void Generate()
	{
		
		ScriptableWizard.DisplayWizard("Create Enemy Path", typeof(createEnemyPath),
			"Create & Close");
	}
	
	// Use this for initialization
	void OnWizardCreate () 
	{	
		CreatePathObject();
		CreatePath();
	}
	
	void CreatePathObject()
	{
		//create a list of the waypoints
		List<GameObject> wayPoints = new List<GameObject>();
		
		//initialize the path itself
		path = new GameObject();
		path.name = newPathName;
		path.transform.parent = GameObject.Find("Rail").transform;
		
		path.transform.localPosition = new Vector3(0,0,0);
		path.transform.localRotation = new Quaternion(0,0,0,0);
		
		//initialize the waypoints
		for (int i = 0; i < newPathLength; i++)
		{
			wayPoints.Add(GameObject.CreatePrimitive(PrimitiveType.Cube));
			
			wayPoints[i].name = "wp" + i;
			wayPoints[i].transform.parent = path.transform;
			
			wayPoints[i].transform.localPosition = new Vector3(0,0,i * 10);
			wayPoints[i].transform.localScale = new Vector3(2, 2, 2);
			
			points.Add(wayPoints[i].transform.position);
		}
	}
	
	void CreatePath()
	{
		pathGraphic = (GameObject)Instantiate((GameObject)Resources.Load("PathGraphic"), new Vector3(0,0,0), new Quaternion(0,0,0,0));
		//pathGraphic.name = "Path Graphic";
		pathGraphic.transform.parent = path.transform;
		
		//use default name if none given
		if(newPathName == "")
		{	
			int i = 0;
			
			do
			{
				newPathName = "Path" + i;
				
				i++;
			}
			while(GameObject.Find("Rail").transform.Find(newPathName) != null || i == 10000);
		}
		
		if(newPathLength == 0)
		{
			newPathLength = GameObject.Find("Rail").GetComponent<railEnemySpawn>().pointsPerSpline;	
		}
		
		pathGraphic.gameObject.GetComponent<pathGraphicUpdate>().pathLength = newPathLength;
		pathGraphic.gameObject.GetComponent<pathGraphicUpdate>().color = color;
		pathGraphic.gameObject.GetComponent<pathGraphicUpdate>().width = width;
		pathGraphic.gameObject.GetComponent<pathGraphicUpdate>().points = points;
		
		//generate a controller
		if(!createGenericPathInstead)
		{
			GameObject controller = (GameObject)Instantiate((GameObject)Resources.Load("EnemyPathController"), new Vector3(0,0,0), new Quaternion(0,0,0,0));
		
			controller.transform.parent = path.transform;
		}
		

		LineRenderer lr = (LineRenderer)pathGraphic.GetComponent("LineRenderer");
		
		
		lr.SetVertexCount(newPathLength);
			
		for (int i = 0; i <  newPathLength; i++)
		{
			
			lr.SetPosition(i, points[i]);
		}
		
		//set colors and width
		lr.SetColors(color,color);
		
		//set width
		lr.SetWidth(width, width);
	}
	
	void OnWizardUpdate()
	{
		if(newPathName == "")
		{	
			int i = 0;
			
			do
			{
				newPathName = "Path" + i;
				
				i++;
			}
			while(GameObject.Find("Rail").transform.Find(newPathName) != null || i == 10000);
		}
		
		if(newPathLength == 0)
		{
			newPathLength = GameObject.Find("Rail").GetComponent<railEnemySpawn>().pointsPerSpline;	
		}
		
		if(GameObject.Find("Rail").transform.Find(newPathName) != null)
		{
			errorString = "A path with that name already exists!";
			isValid = false;
		}
		else
		{
			errorString = "";
			isValid = true;
		}
	}
}