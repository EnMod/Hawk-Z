#pragma strict

var fly = 5.0;

var brick : Rigidbody;


var clone : Rigidbody;

function Start () {

rigidbody.AddForce(0,fly,0);

clone = Instantiate(brick, transform.position, transform.rotation);

}

function Update () {

if (Input.GetMouseButtonDown(0))
clone = Instantiate(brick, transform.position, transform.rotation);

}