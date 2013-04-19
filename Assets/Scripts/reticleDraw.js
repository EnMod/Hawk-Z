#pragma strict	


private var camPos : Vector3;
private var rs : float;
var reticleSize = 1.0;
var texture : Texture2D;
var dynamicSize = false;

@System.NonSerialized
var drawRect : Rect;

function Start () {
	rs = Screen.width / (10 / reticleSize);
}

function Update () {
}

function OnGUI()
{
	 camPos = Camera.main.WorldToScreenPoint(transform.position);
	 
	 GUI.depth = 0;
	 if(dynamicSize)
	 {
	 	rs = Screen.width / (10 / reticleSize);
	 	rs *= 30 / transform.localPosition.z;
	 	GUI.depth = 1;
	 }
	 
	 
	 drawRect = Rect (camPos.x - (rs / 2), -1 * camPos.y + Screen.height - (rs / 2), rs, rs);
	 
	 GUI.Label (drawRect, texture);
}