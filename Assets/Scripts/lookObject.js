#pragma strict

function Start () {

}

function Update () {
	gameObject.transform.position = GameObject.FindWithTag("Rail").transform.position;
}