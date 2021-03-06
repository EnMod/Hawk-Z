using UnityEngine;
using System.Collections;
using System.Collections.Generic;

[ExecuteInEditMode]

public class pathGraphicUpdate : MonoBehaviour {
	
	//public bool updatable;
	public float width = 1;
	public Color color = Color.white;
	
	
	//[System.NonSerialized]
	public int pathLength;
	public List<Vector3> points = new List<Vector3>();
	
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		//if (updatable)
		//{
		
		for(int k = 0; k < pathLength; k++)
		{
			points.Add(transform.parent.Find("wp" + k).transform.position);
			//Debug.Log(k + ": " + points[k]);
		}
		
		
		//pathGraphic.AddComponent<pathGraphicDestroy>((PathGraphicDestroy)Resources.Load("pathGraphicDestroy"));
		LineRenderer lr = (LineRenderer)gameObject.GetComponent("LineRenderer");
		
		lr.SetVertexCount(pathLength * 3);
		//lr.SetVertexCount(pathLength);
			
		for (int i = 0; i <  pathLength * 3; i++)
		{
			//Debug.LogWarning((i / ((float)pathLength * 3)) + "     i = " + i);
			lr.SetPosition(i, iTween.PointOnPath(points.ToArray(), (i / ((float)pathLength * 3))));
		}
		
		//set colors and width
		lr.SetColors(color,color);
		
		//set width
		lr.SetWidth(width, width);
		
		//reset points
		points = new List<Vector3>();
		//}
	}
}
