#pragma strict

var MaxHealth = 150.0;
var CurrHealth = 150.0;
var HealthBar : float;
var ChangedHealth : float;
function Start () {
	HealthBar = Screen.width /2 ;
}

function Update () {
	if(CurrHealth > 0)
	{
		ChangeCurrentHealth(.0095);
	}
}

function OnGUI() {
	if(CurrHealth != 0)
	{
		GUI.Box(new Rect(10,10,HealthBar-10, 20),parseInt(CurrHealth)+ "/" + MaxHealth);
	}	
		if(CurrHealth == 0)
	{
		GUI.Box(new Rect(0,0,Screen.width, Screen.height), "Game Over ");
					gameObject.active=false;

	}	
}

function ChangeCurrentHealth( Change : float){

	CurrHealth+= Change;
	if(CurrHealth <0 )
	{
		CurrHealth = 0;
	}
	if(CurrHealth > MaxHealth)
	{
		CurrHealth = MaxHealth;
	}
	
	ChangedHealth= CurrHealth/MaxHealth;
	HealthBar= (Screen.width/2)* ChangedHealth;
}
