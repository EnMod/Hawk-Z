#pragma strict

var mainP : Transform;
var lastPos = Vector3 (0,0,0);
var timer = 0.0;
var flyDown = false;

function Start () {
	animation["BarrelRoll"].speed = 1.451;

}

function Update () {
	if(Input.GetKey ("space"))// && !animation.isPlaying)
		animation.CrossFade("BarrelRoll",.2);
		
	else if(mainP.transform.localPosition.y > lastPos.y && ! animation.isPlaying && timer == 0)
	{
		animation.CrossFade("FadeInFly",.2);
		timer = 0;
		flyDown = false;
	}
	
	if(animation.IsPlaying("FadeInFly") && timer >= .4)
	{
		animation.CrossFade("FlyUp",0.2);
	}
	
	if(mainP.transform.localPosition.y < lastPos.y )
		flyDown = true;
	
	if(flyDown)
	{
		animation.CrossFade("FadeOutFly",0.2);
		flyDown = false;
	}
	
	else if(!animation.isPlaying)
	animation.CrossFade("Idol",1);
	
	lastPos = mainP.transform.localPosition;
	
	
	timer += Time.deltaTime;
}