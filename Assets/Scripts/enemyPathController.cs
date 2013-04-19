using UnityEngine;
using System.Collections.Generic;


[ExecuteInEditMode]
public class enemyPathController : MonoBehaviour {
	
	private List<Vector3> points = new List<Vector3>();
	
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		//points is a list of each child of the path's position in world space
		foreach (Transform child in transform.parent)
		{
			points.Add(child.position);
		}
		
		//reset parent to local position 0
		transform.parent.localPosition = new Vector3(0,0,0);
		transform.parent.localRotation = new Quaternion(0,0,0,0);
		transform.parent.localScale = new Vector3(1,1,1);
		
		//return points to the original world position
		int i = 0;
		foreach (Transform child in transform.parent)
		{
			child.position = points[i];
			//child.localScale = new Vector3(2,2,2);
			i++;
		}
		
		//reset points
		points = new List<Vector3>();
	}
		
}
