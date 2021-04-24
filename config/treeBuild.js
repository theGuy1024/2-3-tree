// GLOBAL VARIABLES
//global array - used to hold the array of the values to be used
var listValues = [];
var treeNodeArrayTracker = 0;
var treeNodesArray = [];


// BUILDS THE TREE
function buildTree(){
    var userInput = document.getElementById("userInput");
    
    // --VERIFIES THE INPUT IS VALID--
    if(verifyInput(userInput)){
        // --STORES THE INPUT INTO AN ARRAY--
        // --1. flushes/empties the array--
        listValues = [];

        // --2. calls function to populate the array--
        extractToArray(userInput);

        // --3. creates a new object (root) in case that the array is empty and increases the array tracker
        if(treeNodesArray.length == 0)
        {treeNodesArray[treeNodeArrayTracker] = new TreeLeaf(0, 0, 0, 0, 0, 0);}
        treeNodeArrayTracker++;
        /* -------------------TEST GROUNDS!!!------------------- */
        
        //4. inserts all values from the array (extracted from input) into the tree
        for(i in listValues){
            searchLeaf(listValues[i]);
        }
        
        /*for(var i = 0; i < 2; i++)
        {
            searchLeaf(listValues[i]);
        }*/
        for(i in treeNodesArray){
            console.log("***** node: " + i + '*****');
            console.log('parent node: '+treeNodesArray[i].NodeParent());
            console.log('val 1: '+treeNodesArray[i].NodeVal1());
            console.log('val 2: '+treeNodesArray[i].NodeVal2());
            console.log('val 3: '+treeNodesArray[i].NodeTempVal());
            console.log('space: '+treeNodesArray[i].NodeSpacesUsed());
            console.log('children: '+treeNodesArray[i].NodeChildAmt());
        }
        /* -------------------END OF TEST GROUNDS------------------- */

        //5. --draw the final tree
        drawTree();
    }
}

// CONSTRUCTOR FUNCTION FOR LEAVES OBJECTS
var TreeLeaf = function(parentNod, val1, val2, tempVal, amntOfNodes, amtOfChild) {
    this.parentNode = parentNod;    //used to draw the tree
    this.value1 = val1;             //any number value
    this.value2 = val2;             //any number value
    this.tempValue = tempVal;       //any number value
    this.amountOfNodes = amntOfNodes;  //counter - knows how many values are stored in the node
    this.amountOfChildren = amtOfChild;//keeps track of how many children the node has
};

//RETURNS THE VALUES OF A NODE STORED:
//parent node of the current node 
TreeLeaf.prototype.NodeParent = function() {
    return this.parentNode;
};

//first value of the current node
TreeLeaf.prototype.NodeVal1 = function() {
    return this.value1;
};

//second value of the current node
TreeLeaf.prototype.NodeVal2 = function() {
    return this.value2;
};

//temporary value (3rd) of the current node
TreeLeaf.prototype.NodeTempVal = function() {
    return this.tempValue;
};

//the amount of values the node has stored
TreeLeaf.prototype.NodeSpacesUsed = function() {
    return this.amountOfNodes;
};

//the amount of children the node has
TreeLeaf.prototype.NodeChildAmt = function() {
    return this.amountOfChildren;
};

// CHECKS TO SEE IF THE INPUT IS VALID
function verifyInput(passedValue){
    if(passedValue.value == ""){
        alert("invalid input: no input");
        return 0;
    }
    else
        return 1;
}

// EXTRACTS THE VALUES FROM THE INPUT, PLACES IT INTO AN ARRAY
function extractToArray(passedValue){
    var userString = passedValue.value;
    
    //separates the list by "," values and stores the number into the array
    listValues = userString.split(",");

    //convert the array values into numbers - base 10
    for(i in listValues){
        listValues[i] = parseInt(listValues[i], 10);
    }
}

// INSERTING A VALUE INTO THE TREE
// 1. TRAVERSES THE TREE IN SEARCHES OF A LEAF - value to be added
function searchLeaf(nodeValue){                                         //MUST UPDATE THE PARENT NODE!!!!!!!
     // 1. keeps track how far away we are from the root
     var fromRoot = 0;
     // 2. keep track of who is the parent of the current node
     var parentNode = fromRoot;
     // 3. get the amount of children the root has
     var parentChildrenAmount = 0;//treeNodesArray[fromRoot].NodeChildAmt();
     // 5. will loop until a node with no children (a leaf) is found
    while(treeNodesArray[fromRoot].NodeChildAmt() != 0){
        // 4. get the node's first value
        var parentFirstValue = treeNodesArray[fromRoot].NodeVal1();
        // 4b. get the node's second value
        var parentSecondValue = treeNodesArray[fromRoot].NodeVal2();
        // 5. compare the value passed with the node's first value
        if(nodeValue < parentFirstValue)
            fromRoot++;
        else if(parentSecondValue != 0)
        {
            if(nodeValue < parentSecondValue)
                fromRoot += 2; 
            else
                fromRoot += 3;
        }
        else{
            fromRoot += 2;
        }
    }
    insertValue(treeNodesArray[fromRoot], nodeValue, parentNode, fromRoot);
}

// 2. INSERTS A VALUE INTO A LEAF - node object, the value to insert, THIS node's parent position, node's position
function insertValue(nodeObj, nodeValue, parentPos, nodePos){
    //4a. check if leaf is full
    if(nodeObj.NodeSpacesUsed() < 3)
    {
        //4b. checks if the first node is empty
        if(nodeObj.NodeVal1() == 0){
            //if it is - stores the value there and increases the amount of values stored
            nodeObj.value1 = nodeValue;
            nodeObj.amountOfNodes++;
        }
        //4b. checks if the second node is empty
        else if(nodeObj.NodeVal2() == 0){
            //checks if the value is smaller than the object's first value
            if(nodeValue < nodeObj.NodeVal1())
            {
                //places the new value in the first place, and the
                // what was the first - into the second place
                var tempVal = nodeObj.NodeVal1();
                nodeObj.value1 = nodeValue;
                nodeObj.value2 = tempVal;
                nodeObj.amountOfNodes++;
            }
            else{
                //places the value into the second place
                nodeObj.value2 = nodeValue;
                nodeObj.amountOfNodes++; 
            }
        }
        //4b. else the element is placed into the last place
        else{
            //checks if the value is smaller than the object's first value
            if(nodeValue < nodeObj.NodeVal1())
            {
                //places the new value in the first place, and the
                // what was the first - into a temporary storage
                var tempVal = nodeObj.NodeVal1();
                nodeObj.value1 = nodeValue;
                nodeValue = tempVal;
            }
            //checks if the value is smaller than the object's second value
            if(nodeValue < nodeObj.NodeVal2())
            {
                //places the new value in the second place, and the
                // what was the second - into a temporary storage
                var tempVal = nodeObj.NodeVal2();
                nodeObj.value2 = nodeValue;
                nodeObj.tempValue = tempVal;
                nodeObj.amountOfNodes++; 
            }
            else{
                //places the value in the temp value
                nodeObj.tempValue = nodeValue;
                nodeObj.amountOfNodes++;
            }
            //alert('parent pso: '+parentPos+'node pos: '+ nodePos);
            //1. {parent node: 1,val 1: 7, val 2: 8, val 3: 9, space:3, children: 0}, parent pos: 0, node pos: 2
            //2. {parent node: 0,val 1: 5, val 2: 8, val 3: 25, space:3, children: 3}, parent pos: 0, node pos: 2
            splitNode(nodeObj, parentPos, nodePos);
        }
    }
}

// 3. SPLITS THE NODE PASSED INTO 3 NODES (PARENT LEFT AND RIGHT CHILD) - current node object, parent's position, node's position
function splitNode(nodeObj, parentPos, currentPos){
    // CASE A: split node if it's the ONLY node (root)
    if(treeNodesArray.length == 1)
    {
        // 1. create 2 new nodes and add their values
        treeNodesArray[1] = new TreeLeaf(1, nodeObj.NodeVal1(), 0, 0, 1, 0);
        treeNodeArrayTracker++;
        treeNodesArray[2] = new TreeLeaf(1, nodeObj.NodeTempVal(), 0, 0, 1, 0);
        treeNodeArrayTracker++;

        // 2. place the value2 into 1 and clear the rest of spaces
        nodeObj.value1 = nodeObj.NodeVal2();
        nodeObj.value2 = 0;
        nodeObj.tempValue = 0;
        nodeObj.amountOfNodes = 1;
        nodeObj.amountOfChildren = 2;
    }
    else
    {
        //CASE B: ROOT is splitted, since a middle value bubbles up and root is now full
        if(nodeObj.NodeParent() == 0)
        {
            //check the amount of children the parent had before the split - assign the correct amount of children
            // C H E C K - 50,60,70,20,30,10     15
            // 1. keep record of it's first, second and temp values
            var tempVal1 = nodeObj.NodeVal1(), 
                tempVal2 = nodeObj.NodeVal2(), 
                tempTempVal = nodeObj.NodeTempVal();
            // 2. create 2 new node objects
            treeNodesArray[treeNodesArray.length] = new TreeLeaf(0, 0, 0, 0, 1, 0);
            treeNodesArray[treeNodesArray.length] = new TreeLeaf(0, 0, 0, 0, 1, 0);
            // 3. keep track from where to where move back the objects
            var toPos = treeNodesArray.length - 1, fromPos = toPos - 2;
            // 4. push back all nodes - updating who it's parent is
            for(var a = treeNodesArray.length; a > currentPos + 1; a--)
            {
                treeNodesArray[toPos].parentNode = treeNodesArray[fromPos].NodeParent()+2;
                treeNodesArray[toPos].value1 = treeNodesArray[fromPos].NodeVal1();
                treeNodesArray[toPos].value2 = treeNodesArray[fromPos].NodeVal2();
                treeNodesArray[toPos].tempValue = treeNodesArray[fromPos].NodeTempVal();
                treeNodesArray[toPos].amountOfNodes = treeNodesArray[fromPos].NodeSpacesUsed();
                treeNodesArray[toPos].amountOfChildren = treeNodesArray[fromPos].NodeChildAmt();
                toPos--;
                fromPos--;
            }
            // 5. clear the first three node object in the tree array
            for(var i = 0; i < 3; i++)
            {
                treeNodesArray[i].value1 = 0;
                treeNodesArray[i].value2 = 0;
                treeNodesArray[i].tempValue = 0;
                treeNodesArray[i].amountOfNodes = 1;
                treeNodesArray[i].amountOfChildren = 2;
            }
            // 6. populate the first 3 nodes again
            treeNodesArray[0].value1 = tempVal2;
            treeNodesArray[0].amountOfChildren = 1;
            treeNodesArray[1].value1 = tempVal1;
            treeNodesArray[2].value1 = tempTempVal;
            // 7. make the root's - left child's children it's parent(make node 2 be node's 4&5 parent)
            treeNodesArray[3].parentNode = 2;
            treeNodesArray[4].parentNode = 2;
        }
        //CASE C: value bubbles up to parent - separate this node into 2
        else{
            // 1. create a new node object
            treeNodesArray[treeNodesArray.length] = new TreeLeaf(0, 0, 0, 0, 1, 0);
            // 2. keep track from where to where move back the objects
            var fromPos = currentPos + 1, toPos = treeNodesArray.length - 1;
            // 3. push back all nodes in the tree array
            for(var a = treeNodesArray.length - 1; a > currentPos + 1; a--)
            {
                treeNodesArray[toPos].parentNode = treeNodesArray[fromPos].NodeParent();
                treeNodesArray[toPos].value1 = treeNodesArray[fromPos].NodeVal1();
                treeNodesArray[toPos].value2 = treeNodesArray[fromPos].NodeVal2();
                treeNodesArray[toPos].tempValue = treeNodesArray[fromPos].NodeTempVal();
                treeNodesArray[toPos].amountOfNodes = treeNodesArray[fromPos].NodeSpacesUsed();
                treeNodesArray[toPos].amountOfChildren = treeNodesArray[fromPos].NodeChildAmt();
                toPos--;
                fromPos--;
            }
            // 4. pass the temp value and parent to the new node object
            treeNodesArray[currentPos+1].value1 = nodeObj.NodeTempVal();
            treeNodesArray[currentPos+1].parentNode = nodeObj.NodeParent();
            // 5. create a temporary variable to hold the second value of this node
            var tempSecondValue = nodeObj.NodeVal2();
            // 6. clear the current node's second/middle & third/last value and set the amount of values it has
            nodeObj.amountOfNodes = 1;
            nodeObj.value2 = 0;
            nodeObj.tempValue = 0;
            // 7. store the current node's second/middle value (the temp variable) into the parent
            insertValue(treeNodesArray[parentPos], tempSecondValue, parentPos, currentPos);
            // 8. increment the amount of children the parent has
            treeNodesArray[parentPos].amountOfChildren++;
            //create a new object next to the splitted one
            //var parentPosition = parentPos + 1;
        }
        
    }
}

// DRAWS THE TREE DIAGRAM
function drawTree(){
    var config = {
        container: "#2-3Tree",    
        connectors: { type: 'straight' },
        node: { HTMLclass: 'leafLayout' },
        //animateOnInit: true,
        //animateOnInitDelay: 2500
    };

    simple_chart_config = [
        config
    ];

    // 1. draw the first node - root
    //      - has to be alone - since it has no parent
    var treeDrawPos = 2;
    var childPos = 0;
    simple_chart_config[1] = leaf = {text: { name: treeNodesArray[0].NodeVal1()+", "+treeNodesArray[0].NodeVal2()+", "+treeNodesArray[0].NodeTempVal() } };
    for(var a = 0; a < treeNodesArray[0].NodeChildAmt();){
        a++;
        simple_chart_config[treeDrawPos] = leaf = { parent: simple_chart_config[1], text: { name: treeNodesArray[a].NodeVal1() +", "+ treeNodesArray[a].NodeVal2() +", "+ treeNodesArray[a].NodeTempVal()} };
        treeDrawPos++;
    }
    /*var treeDrawPos = 2;
    // loop through tree array
    var arrLen = treeNodesArray.length;
    for(var i = 1; i < arrLen; i++)
    {
        simple_chart_config[treeDrawPos] = leaf = {
                                                    parent: simple_chart_config[1], 
                                                    text: { name: treeNodesArray[i].NodeVal1()
                                                                +", "+
                                                                treeNodesArray[i].NodeVal2()
                                                                +", "+
                                                                treeNodesArray[i].NodeTempVal()}
                                                };
        treeDrawPos++;
    }*/
}