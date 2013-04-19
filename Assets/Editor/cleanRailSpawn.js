#pragma strict

@CustomEditor(railEnemySpawn)
@CanEditMultipleObjects
// ^ This is the script we are making a custom editor for.
class cleanRailSpawn extends Editor {
    override function OnInspectorGUI () {
    
    
    
    //Called whenever the inspector is drawn for this object.
        DrawDefaultInspector();
        //This draws the default screen.  You don't need this if you want
        //to start from scratch, but I use this when I'm just adding a button or
        //some small addition and don't feel like recreating the whole inspector.
 
        if(GUILayout.Button(new GUIContent("Clean Spawn List", "Sorts the spawn list by player position and deletes any spawns with negative positions.")))
        {
        	Undo.RegisterSceneUndo("Clean Spawn List");
        	GameObject.Find("Rail").GetComponent(railEnemySpawn).Clean();
        }
        
        if(GUILayout.Button(new GUIContent("Clean Rail Move", "Sorts the Speed Variation and Look At lists by player position and deletes any positions with negative value.")))
        {
        	Undo.RegisterSceneUndo("Clean Rail Move");
        	GameObject.Find("Rail").GetComponent(railMove).Clean();
        }
            //add everthing the button would do.
	}	
}
