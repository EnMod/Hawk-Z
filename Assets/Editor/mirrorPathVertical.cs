using UnityEngine;
using UnityEditor;
using System.Collections;
using System.Collections.Generic;

public class mirrorPathVertical : ScriptableWizard {
	
	public GameObject path;
	public string newPathName;
	private GameObject pathClone;
	
	[MenuItem("Editor/Mirror Path Vertically")]
	static void Update()
	{
		
		
		ScriptableWizard.DisplayWizard("Mirror Path Vertically", typeof(mirrorPathVertical),
			"Mirror and Close", "Mirror");
	}
	
	void OnWizardCreate () 
	{	
		pathClone = (GameObject)Instantiate(path, path.transform.position, path.transform.rotation);
		
		pathClone.transform.parent = path.transform.parent;
		
		int i = 0;
		
		while(path.transform.Find ("wp" + i) != null)
		{
			pathClone.transform.Find ("wp" + i).localPosition = new Vector3(path.transform.Find ("wp" + i).localPosition.x,
																		-1 * path.transform.Find ("wp" + i).localPosition.y, path.transform.Find ("wp" + i).localPosition.z);
		
			i++;
		}
		
		pathClone.name = newPathName;
	}
	
	void OnWizardOtherButton()
	{
		pathClone = (GameObject)Instantiate(path, path.transform.position, path.transform.rotation);
		
		pathClone.transform.parent = path.transform.parent;
		
		int i = 0;
		
		while(path.transform.Find ("wp" + i) != null)
		{
			pathClone.transform.Find ("wp" + i).localPosition = new Vector3(path.transform.Find ("wp" + i).localPosition.x,
																		-1 * path.transform.Find ("wp" + i).localPosition.y, path.transform.Find ("wp" + i).localPosition.z);
		
			i++;
		}
		
		pathClone.name = newPathName;
		path = null;
	}

}
