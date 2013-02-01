#pragma strict

var speed = 50;
var location : float = 0;

function Start () {

}

function Update () {

	transform.Translate(0,0,speed*Time.deltaTime,Space.World);
	
	location += Time.deltaTime;
}