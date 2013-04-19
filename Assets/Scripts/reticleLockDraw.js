#pragma strict	


private var camPos : Vector3;
private var secPos : Vector3;
private var cam : Camera;
private var rs : float;
var reticleSize = 1.0;
var texture : Texture2D;
var dynamicSize = false;

@System.NonSerialized
var target : Transform;

@System.NonSerialized
var drawRect : Rect;

function Start () {
	rs = Screen.width / (10 / reticleSize);
	
	cam = Camera.main;
}

function Update () {
}

private var temp : Vector3;

function OnGUI()
{
	 if(target == null)
	 	return;
	 
	 transform.position = target.position;
	 
	 temp = target.position;
	 
	 temp.y += 10;
	 
	 camPos = cam.WorldToScreenPoint(target.position);
	 secPos = cam.WorldToScreenPoint(temp);
	 
	 GUI.depth = 0;
	 if(dynamicSize)
	 {
	 	rs = Screen.width / (10 / reticleSize);
	 	rs *= 30 / transform.localPosition.z;
	 	GUI.depth = 1;
	 }
	 
	 rs = Mathf.Abs(camPos.y - secPos.y);
	 
	 
	 drawRect = Rect (camPos.x - (rs / 2), -1 * camPos.y + Screen.height - (rs / 2), rs, rs);
	 
	 GUI.Label (drawRect, texture);
}