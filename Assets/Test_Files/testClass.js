#pragma strict
class SomeStruct extends System.ValueType{
  var i : int;
  var f : float;

  public function SomeStruct(i:int,f:float){
     this.i = i;
     this.f = f;
  }
}

var thatthing : SomeStruct;
var food : int;

function Start () {
	
}

function Update () {

	thatthing = SomeStruct(1, 2.0);
	
	food = thatthing.i;

}