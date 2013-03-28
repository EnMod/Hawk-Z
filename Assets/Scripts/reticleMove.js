#pragma strict	

var lookAdjustmentX = .8;		//adjusts max x value of reticle
var lookAdjustmentY = .8;		//adjusts max y value of reticle

private var location : Vector3;		//location vector of reticle
private var camPos : Vector3;
private var pos : Vector3;

function Start () {
	lookAdjustmentX *= Screen.width / 2;
	lookAdjustmentY *= Screen.height / 2;
	
}

function Update () {

	camPos = Camera.main.WorldToScreenPoint(transform.position);
 
 	pos = Input.mousePosition;
 	
 	//keep within bounds
 	if(pos.x > Screen.width / 2 + lookAdjustmentX)
 	{
 		pos.x = Screen.width / 2 + lookAdjustmentX;
 	}
 	if(pos.x < Screen.width / 2 - lookAdjustmentX)
 	{
 		pos.x = Screen.width / 2 - lookAdjustmentX;
 	}
 	if(pos.y > Screen.height / 2 + lookAdjustmentY)
 	{
 		pos.y = Screen.height / 2 + lookAdjustmentY;
 	}
 	if(pos.y < Screen.height / 2 - lookAdjustmentY)
 	{
 		pos.y = Screen.height / 2 - lookAdjustmentY;
 	}
 
 	transform.position = Camera.main.ViewportToWorldPoint(Vector3(pos.x / Screen.width, pos.y / Screen.height, 65));
 	
 	transform.localPosition.z = 40;
}