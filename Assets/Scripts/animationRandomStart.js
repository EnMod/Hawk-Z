#pragma strict

var animSpeed = 1.0;
private var startDelay;

function Start () {
	animation["Take 001"].speed = animSpeed;

}

function Awake()
{
	startDelay = Random.Range(0, animation["Take 001"].length);
	
	animation["Take 001"].time = startDelay;
}

function Update () {
	
}