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
		foreach (Transform child in transform.parent)
		{
			points.Add(child.position);
		}

		transform.parent.transform.localPosition = new Vector3(0,0,0);
		transform.parent.localRotation = new Quaternion(0,0,0,0);
		
		int i = 0;
		foreach (Transform child in transform.parent)
		{
			child.position = points[i];
			i++;
		}
		
		//reset points
		points = new List<Vector3>();
	}
		
}
