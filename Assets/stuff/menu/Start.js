#pragma strict


// applicated to box colider over button. 
var isStart;
function Start () {

var isStart = true;
}

function Update () {


}

function OnMouseDown(){

	GameObject.Find("lives").GetComponent(numLives).numLives = 3;
	GameObject.Find("lives").GetComponent(numLives).checkPoint = false;
	Application.LoadLevel("Forest Level");
}

		
function OnMouseEnter() { 
	//hover changers
}
function OnMouseExit() {
	// change back to normal.
}
	
	
//	to change scene:
// Application.LoadLevel("");

// to end 
// Application.Quit();

