#pragma strict

var MaxHealth = 150.0;
var BarrelCoolDown = 3.0;
var barrelDelay = 2.0;
var MaxLives = 3;
var LifeIcon : Texture; // square icon of hawk
var hpBackGround : Texture; // empty hp bar image
var stamina1 : Texture; // all these are as labled
var stamina2 : Texture;
var stamina3 : Texture;
var stamina4 : Texture; 
var gameOverImg : Texture;

@System.NonSerialized
var CurrHealth :float ;
@System.NonSerialized
var HealthBar : float;
@System.NonSerialized
var ChangedHealth : float;
@System.NonSerialized
var NumLives : int;
@System.NonSerialized 
var BarrelTimer: float ;
@System.NonSerialized



	var i = 0.0;

private var lives : numLives;

private var rm : railMove;

function Start () {
	if(GameObject.Find("lives") != null)
		lives = GameObject.Find("lives").GetComponent("numLives");
	HealthBar = Screen.width /3 ;
	if(numLives != null)
		NumLives= lives.numLives; 
	else
		NumLives = MaxLives;
	CurrHealth= MaxHealth;
	BarrelTimer = BarrelCoolDown;
	rm = GameObject.FindGameObjectWithTag("Rail").GetComponent(railMove);
}

function Update () {
	if(CurrHealth > 0)
	{
		ChangeCurrentHealth(Time.deltaTime);
	}
	
	if(BarrelTimer > 0)
	{
		BarrelTimer = BarrelTimer - (Time.deltaTime / barrelDelay);
		
	}
	
	if(BarrelTimer < 0)
	{
		BarrelTimer = 0;
	}
}

function OnGUI() {
	if(CurrHealth != 0)
	{
		GUI.DrawTexture(new Rect(10,10, Screen.width/3, 45), hpBackGround, ScaleMode.StretchToFill, false, 0f);
		GUI.Box(new Rect(10,10,HealthBar, 45),"");
	}	
	if(CurrHealth == 0)
	{
		if(NumLives >0)
		{
			CurrHealth = MaxHealth;
			NumLives--;
			lives.numLives --;
			if(rm.location >= 60)
				lives.checkPoint = true;
			Application.LoadLevel("Forest Level");
		}
		if(NumLives == 0)
		{	
			FadeToBlack();
			//gameObject.active=false;
		}			

	}	
	// life
	if(NumLives >= 1)
	{
 		GUI.DrawTexture(new Rect(190,60,30, 30), LifeIcon, ScaleMode.ScaleToFit, false, 0f);		
	}
	
	if(NumLives >= 2)
	{
		GUI.DrawTexture(new Rect(235  ,60,30, 30), LifeIcon, ScaleMode.ScaleToFit, false, 0f);	
				
	}
	if(NumLives == 3)
	{
		GUI.DrawTexture(new Rect(280 ,60,30, 30), LifeIcon, ScaleMode.ScaleToFit, false, 0f);	
				
	}
	
	if(NumLives > 0 || CurrHealth )
	{
		if(BarrelTimer >= 0)
		{
			GUI.DrawTexture(new Rect(15 , 54 , 160, 30),stamina4, ScaleMode.ScaleToFit, false, 0f);	 
		}
		
		if(BarrelTimer >= 1.0)
		{
			GUI.DrawTexture(new Rect(15 , 54 , 160, 30),stamina3, ScaleMode.ScaleToFit, false, 0f);	 
		}
		
		if(BarrelTimer >= 2.0)
		{
			GUI.DrawTexture(new Rect(15 , 54 , 160, 30),stamina2, ScaleMode.ScaleToFit, false, 0f);	 
		}
		
		if(BarrelTimer >= 3.0)
		{
			GUI.DrawTexture(new Rect(15, 54 , 160, 30),stamina1, ScaleMode.ScaleToFit, false, 0f);	 
		}
		
	}
	
}

function DoABarrelRoll()
{
	//BarrelTimer = BarrelCoolDown;
	
	BarrelTimer ++;
}

function CanBarrel() : boolean {
	if(BarrelTimer >= 3)
		return false;
	else
		return true;	
}

function FadeToBlack() {

	

		i = i + Time.deltaTime;
		if( i> .33)
			GUI.Box(new Rect(0,0,Screen.width, Screen.height), "Game Over ");
			//GUI.DrawTexture(new Rect(Screen.width/2, Screen.height/2 , Screen.width/3, 45), gameOverImg, ScaleMode.StretchToFill, false, 0f);

		if( i> .66)
			GUI.Box(new Rect(0,0,Screen.width, Screen.height), "\nGame Over ");			
		if( i> 1)
			GUI.Box(new Rect(0,0,Screen.width, Screen.height), "\n\nGame Over ");	
		if(i> 1.33)
			GUI.Box(new Rect(0,0,Screen.width, Screen.height), "\n\n\nGame Over ");	
		if( i> 1.66)
			GUI.Box(new Rect(0,0,Screen.width, Screen.height), "\n\n\n\nGame Over ");
			
		if( i> 2)
			GUI.Box(new Rect(0,0,Screen.width, Screen.height), "\n\n\n\n\nGame Over ");	
		if(i > 2.33)
			GUI.Box(new Rect(0,0,Screen.width, Screen.height), "\n\n\n\n\n\nGame Over ");	
		if(i > 2.66)
			GUI.Box(new Rect(0,0,Screen.width, Screen.height), "\n\n\n\n\n\n\nGame Over ");		
		if(i > 3)
			GUI.Box(new Rect(0,0,Screen.width, Screen.height), "\n\n\n\n\n\n\n\nGame Over ");	
		if(i > 3.33)
			GUI.Box(new Rect(0,0,Screen.width, Screen.height), "\n\n\n\n\n\n\n\n\nGame Over ");		
		if(i > 3.66)
			GUI.Box(new Rect(0,0,Screen.width, Screen.height), "\n\n\n\n\n\n\n\n\n\nGame Over ");	
		if(i > 4)
			GUI.Box(new Rect(0,0,Screen.width, Screen.height), "\n\n\n\n\n\n\n\n\n\n\nGame Over ");
		if(i > 4.33)
			GUI.Box(new Rect(0,0,Screen.width, Screen.height), "\n\n\n\n\n\n\n\n\n\n\n\nGame Over ");
		if(i > 4.66)
			GUI.Box(new Rect(0,0,Screen.width, Screen.height), "\n\n\n\n\n\n\n\n\n\n\n\n\nGame Over ");
		if(i > 5)
			GUI.Box(new Rect(0,0,Screen.width, Screen.height), "\n\n\n\n\n\n\n\n\n\n\n\n\n\nGame Over ");	
		if(i > 5.33)
			GUI.Box(new Rect(0,0,Screen.width, Screen.height), "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nGame Over ");		
		if(i > 5.66)
			GUI.Box(new Rect(0,0,Screen.width, Screen.height), "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nGame Over ");	
		if(i > 6)
			GUI.Box(new Rect(0,0,Screen.width, Screen.height), "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nGame Over ");	
			
		if(i > 6.33)
			GUI.Box(new Rect(0,0,Screen.width, Screen.height), "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nGame Over ");		
				
		if(i > 6.66)
			GUI.Box(new Rect(0,0,Screen.width, Screen.height), "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nGame Over ");	
		if(i > 7)
			GUI.Box(new Rect(0,0,Screen.width, Screen.height), "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nGame Over ");	
		if(i > 7.33)
			GUI.Box(new Rect(0,0,Screen.width, Screen.height), "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nGame Over ");	
		if(i > 7.66)
			GUI.Box(new Rect(0,0,Screen.width, Screen.height), "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nGame Over ");	
		if(i > 8)
			GUI.Box(new Rect(0,0,Screen.width, Screen.height), "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nGame Over ");	
			
		// after i>12 load main screen.	
		if(i > 12)
			Application.LoadLevel("load screen");																																																																																																			
}

function ChangeCurrentHealth( Change : float){

	CurrHealth+= Change;
	if(CurrHealth <0.0 )
	{
		CurrHealth = 0;
	}
	if(CurrHealth > MaxHealth)
	{
		CurrHealth = MaxHealth;
	}
	
	ChangedHealth= CurrHealth/MaxHealth;
	HealthBar= (Screen.width/3)* ChangedHealth;
}

