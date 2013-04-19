#pragma strict

var mainP : Transform;
var lastPos = Vector3 (0,0,0);
var goingUp = false;
var pressed = false;
var gameTime = 0;

var anim : AnimationState;

function Start () {
	animation["BarrelRoll"].speed = 1.451;
	animation["FadeIn"].speed = 1.451;
	animation["FadeOut"].speed = 1.451;
	
	
}

function Update () {
	gameTime ++;
	
	if (mainP.transform.localPosition.y - lastPos.y >= .1)
		{
			goingUp = true;
		}
	else 
		goingUp = false;
		
	
	
	if(Input.GetKey ("space"))// && !animation.isPlaying)
	{
		animation.CrossFade("BarrelRoll",.1);
		pressed = false;
	}
		
		
	else if (goingUp && ! animation.isPlaying && !pressed)
	{
		animation.Play("FadeIn");
		animation.CrossFadeQueued("FlyUp",.1,QueueMode.CompleteOthers);
		
		pressed = true;
	}
	else if(goingUp && pressed && ! animation.IsPlaying("FadeIn") && gameTime % 15 == 0)
	{
		animation.CrossFadeQueued("FlyUp",.1,QueueMode.CompleteOthers);
	}
	else if(pressed && !goingUp && !animation.IsPlaying("FadeIn"))// && !animation.IsPlaying("BarrelRoll"))
	{
		animation.CrossFadeQueued("FadeOut",.1,QueueMode.CompleteOthers);
		pressed = false;
	}
	
	lastPos = mainP.transform.localPosition;
	
	
	
}