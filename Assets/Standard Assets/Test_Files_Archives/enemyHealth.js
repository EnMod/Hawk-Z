//#pragma strict
//
//var MaxHealth = 100.0;
//var CurrHealth = 100;
//
//function Start () {
//
//}
//
//function Update () {
//	if(CurrHealth >0 )
//		ChangeCurrentHealth(.0025);
//	if(CurrHealth <=0 )	
//	{
//		Destroy(gameObject);
//	}
//}	
//
//
//function ChangeCurrentHealth( Change : int){
//
//	CurrHealth+= Change;
//	if(CurrHealth <0 )
//	{
//		CurrHealth = 0;
//	}
//	if(CurrHealth > MaxHealth)
//	{
//		CurrHealth = MaxHealth;
//	}
//	
//}