using UnityEngine;
using System.Collections;

public class pathGraphicDestroy : MonoBehaviour {

	// Use this for initialization
	void Start () {
		//deactivate children
		foreach(Transform child in transform.parent)
		{
			child.gameObject.active = false;
		}
		GameObject.Destroy(gameObject);
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
