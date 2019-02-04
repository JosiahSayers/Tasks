
var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
    uncompletedItems: [],
    completedItems: []
  };

  InitialRenderTodoList();

document.getElementById("addItem").addEventListener("click", function(){
    var value = document.getElementById("newItem").value;
    if (value)
    {
        data.uncompletedItems.push(value);
        localStorage.setItem('todoList', JSON.stringify(data));
        DisplayItem(value, false);
        document.getElementById("newItem").value = '';
    }
});
document.getElementById("newItem").addEventListener("keydown", function(e){
    var value = this.value;
    if(e.code === "Enter" && value)
    {
        data.uncompletedItems.push(value);
        localStorage.setItem('todoList', JSON.stringify(data));
        DisplayItem(value, false);
        document.getElementById("newItem").value = '';
    }
})


// Functions

function InitialRenderTodoList() {
    if (!data.uncompletedItems.length && !data.completedItems.length) return;
  
    for (var i = 0; i < data.uncompletedItems.length; i++) {
      var value = data.uncompletedItems[i];
      DisplayItem(value, false);
    }
  
    for (var j = 0; j < data.completedItems.length; j++) {
      var value = data.completedItems[j];
      DisplayItem(value, true);
    }
  }

function DisplayItem(item, comp){
    if(!comp){
        // item text
        var list = document.getElementById("uncompleted");
        var li = document.createElement("li");
        var span = document.createElement("span");
        var text = document.createTextNode(item);
        span.appendChild(text);
        li.appendChild(span);


        // icons
        var imgDiv = document.createElement("div");
        var del = document.createElement("svg");
        var check = document.createElement("svg");
        check.innerHTML = '<svg aria-hidden="true" data-prefix="far" data-icon="check-square" class="svg-inline--fa fa-check-square fa-w-14 check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm0 400H48V80h352v352zm-35.864-241.724L191.547 361.48c-4.705 4.667-12.303 4.637-16.97-.068l-90.781-91.516c-4.667-4.705-4.637-12.303.069-16.971l22.719-22.536c4.705-4.667 12.303-4.637 16.97.069l59.792 60.277 141.352-140.216c4.705-4.667 12.303-4.637 16.97.068l22.536 22.718c4.667 4.706 4.637 12.304-.068 16.971z"></path></svg>';

        check.addEventListener("click", checkClicked);

        del.innerHTML = '<svg aria-hidden="true" data-prefix="far" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14 delete" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M192 188v216c0 6.627-5.373 12-12 12h-24c-6.627 0-12-5.373-12-12V188c0-6.627 5.373-12 12-12h24c6.627 0 12 5.373 12 12zm100-12h-24c-6.627 0-12 5.373-12 12v216c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12V188c0-6.627-5.373-12-12-12zm132-96c13.255 0 24 10.745 24 24v12c0 6.627-5.373 12-12 12h-20v336c0 26.51-21.49 48-48 48H80c-26.51 0-48-21.49-48-48V128H12c-6.627 0-12-5.373-12-12v-12c0-13.255 10.745-24 24-24h74.411l34.018-56.696A48 48 0 0 1 173.589 0h100.823a48 48 0 0 1 41.16 23.304L349.589 80H424zm-269.611 0h139.223L276.16 50.913A6 6 0 0 0 271.015 48h-94.028a6 6 0 0 0-5.145 2.913L154.389 80zM368 128H80v330a6 6 0 0 0 6 6h276a6 6 0 0 0 6-6V128z"></path></svg>';
        
        del.addEventListener("click", deleteClicked);

        imgDiv.appendChild(del);
        imgDiv.appendChild(check);



        li.appendChild(imgDiv);

        // Append new li to list
        list.appendChild(li);

    }
    else{
        // item text
        var list = document.getElementById("completed");
        var li = document.createElement("li");
        var span = document.createElement("span");
        var text = document.createTextNode(item);
        span.appendChild(text);
        li.appendChild(span);


        // icons
        var imgDiv = document.createElement("div");
        var del = document.createElement("svg");
        var check = document.createElement("svg");
        check.innerHTML = '<svg aria-hidden="true" data-prefix="far" data-icon="check-square" class="svg-inline--fa fa-check-square fa-w-14 check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm0 400H48V80h352v352zm-35.864-241.724L191.547 361.48c-4.705 4.667-12.303 4.637-16.97-.068l-90.781-91.516c-4.667-4.705-4.637-12.303.069-16.971l22.719-22.536c4.705-4.667 12.303-4.637 16.97.069l59.792 60.277 141.352-140.216c4.705-4.667 12.303-4.637 16.97.068l22.536 22.718c4.667 4.706 4.637 12.304-.068 16.971z"></path></svg>';

        check.addEventListener("click", checkClicked);

        del.innerHTML = '<svg aria-hidden="true" data-prefix="far" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14 delete" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M192 188v216c0 6.627-5.373 12-12 12h-24c-6.627 0-12-5.373-12-12V188c0-6.627 5.373-12 12-12h24c6.627 0 12 5.373 12 12zm100-12h-24c-6.627 0-12 5.373-12 12v216c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12V188c0-6.627-5.373-12-12-12zm132-96c13.255 0 24 10.745 24 24v12c0 6.627-5.373 12-12 12h-20v336c0 26.51-21.49 48-48 48H80c-26.51 0-48-21.49-48-48V128H12c-6.627 0-12-5.373-12-12v-12c0-13.255 10.745-24 24-24h74.411l34.018-56.696A48 48 0 0 1 173.589 0h100.823a48 48 0 0 1 41.16 23.304L349.589 80H424zm-269.611 0h139.223L276.16 50.913A6 6 0 0 0 271.015 48h-94.028a6 6 0 0 0-5.145 2.913L154.389 80zM368 128H80v330a6 6 0 0 0 6 6h276a6 6 0 0 0 6-6V128z"></path></svg>';
        
        del.addEventListener("click", deleteClicked);

        imgDiv.appendChild(del);
        imgDiv.appendChild(check);



        li.appendChild(imgDiv);

        // Append new li to list
        list.appendChild(li);
    }
}

function checkClicked(){
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var value = item.children[0].innerHTML;

    if(parent.id === "uncompleted")
    {
        data.uncompletedItems.splice(data.uncompletedItems.indexOf(value), 1);
        data.completedItems.push(value);
        localStorage.setItem('todoList', JSON.stringify(data));
        DisplayItem(item.children[0].innerHTML, true);
        parent.removeChild(item);
    }
    else
    {
        data.completedItems.splice(data.completedItems.indexOf(value), 1);
        data.uncompletedItems.push(value);
        localStorage.setItem('todoList', JSON.stringify(data));
        DisplayItem(item.children[0].innerHTML, false);
        parent.removeChild(item);
    }
}

function deleteClicked(){
    var item = this.parentNode.parentNode;
    var parent = item.parentNode
    var value = item.children[0].innerHTML;
    parent.removeChild(item);

    if(parent.id === "uncompleted")
    {
        data.uncompletedItems.splice(data.uncompletedItems.indexOf(value), 1);
        localStorage.setItem('todoList', JSON.stringify(data));
    }
    else
    {
        data.completedItems.splice(data.completedItems.indexOf(value), 1);
        localStorage.setItem('todoList', JSON.stringify(data));
    }
}