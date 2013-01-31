#pragma strict

//note that splines are a bit of a black box at the moment.  Original documentation at whydoidoit.com may be more useful
//this code is largely legacy, and was not originally commented


var q : Quaternion;
var srs : RadicalLibrary.SmoothQuaternion;
var ts : float;
var sl : Vector3[];		//the path the enemy is given

//enemy speed
var speed = 3f;

function Start () {

}

function Update () {
    //transform.localPosition = Spline.MoveOnPath(sl, transform.localPosition, ts, q, speed, 100, EasingType.Sine, true, true);
    //Debug.Log(transform.position);
    /*srs.Value = q;
    transform.localRotation = srs;*/
    
    transform.localPosition = Spline.MoveOnPath(sl, transform.localPosition, ts, speed, 100, EasingType.Sine, true, true);
    ts += Time.deltaTime/20;
    
    //srs.Value = q;
    //transform.rotation = srs;

}