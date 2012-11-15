#pragma strict

var speed = 50;

function Start () {

}

function Update () {

	transform.Translate(0,0,speed*Time.deltaTime,Space.World);

}