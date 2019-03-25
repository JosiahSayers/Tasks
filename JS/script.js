
var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
    uncompletedItems: [],
    completedItems: []
  };

  let nextUncompletedNumber;
  let nextCompletedNumber;

  RenderTodoList();

document.getElementById("addItem").addEventListener("click", function(){
    var value = document.getElementById("newItem").value;
    updateNumberCounters();
    if (value)
    {
        data.uncompletedItems.push({number: nextUncompletedNumber, text: value});
        console.log(data);
        sortArrays();

        localStorage.setItem('todoList', JSON.stringify(data));
        DisplayItem(value, false);
        document.getElementById("newItem").value = '';
    }
});
document.getElementById("newItem").addEventListener("keydown", function(e){
    var value = this.value;
    updateNumberCounters();
    if(e.code === "Enter" && value)
    {
        data.uncompletedItems.push({number: nextUncompletedNumber, text: value});
        sortArrays();
        localStorage.setItem('todoList', JSON.stringify(data));
        DisplayItem(value, false);
        document.getElementById("newItem").value = '';
    }
})


// Functions

function RenderTodoList() {
    if (!data.uncompletedItems.length && !data.completedItems.length) return;

    let uncompletedNode = document.getElementById('uncompleted');
    let completedNode = document.getElementById('completed');

    uncompletedNode.innerHTML = '';
    completedNode.innerHTML = '';
  
    data.uncompletedItems.forEach(value => {
      DisplayItem(value.text, false);
    });
  
    data.completedItems.forEach(value => {
      DisplayItem(value.text, true);
    });

    CheckIfSeperatorIsNeeded();
  }

function DisplayItem(item, comp){
  var listID = !comp ? 'uncompleted' : 'completed';  

    // Creat LI
     // item text
     var list = document.getElementById(listID);
     var li = document.createElement("li");
     var span = document.createElement("span");
     li.addEventListener("click", function(){
         if (this.className == "expanded")
         {
             this.className = "";
             this.addEventListener("transitionend", function(){
                this.children[0].className = "";
             });
         }
         else{
         this.className = "expanded";
         this.addEventListener("transitionend", function(){
            this.children[0].className = "expanded";
         });
         }
     });
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

     CheckIfSeperatorIsNeeded();
}

function checkClicked(){
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var value = item.children[0].innerHTML;

    if(parent.id === "uncompleted")
    {
        data.completedItems.push({number: data.uncompletedItems[findItem(value, false)].number, text:value});
        data.uncompletedItems.splice(findItem(value, false), 1);

        sortArrays();
        localStorage.setItem('todoList', JSON.stringify(data));
        DisplayItem(item.children[0].innerHTML, true);
        parent.removeChild(item);
    }
    else
    {
        data.uncompletedItems.push({number: data.completedItems[findItem(value, true)].number, text:value});
        data.completedItems.splice(findItem(value, true), 1);

        sortArrays();
        localStorage.setItem('todoList', JSON.stringify(data));
        DisplayItem(item.children[0].innerHTML, false);
        parent.removeChild(item);
    }

    RenderTodoList();
    updateNumberCounters();
    CheckIfSeperatorIsNeeded();
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

    updateNumberCounters();
    CheckIfSeperatorIsNeeded();
}

function CheckIfSeperatorIsNeeded() {
  if (data.completedItems.length == 0 || data.uncompletedItems.length == 0)
  {
    document.getElementById('seperator').className = 'hidden';
  } else {
    document.getElementById('seperator').className = 'seperator';
  }
}

function sortArrays() {
  data.uncompletedItems.sort((a, b) => a.number - b.number);
  data.completedItems.sort((a, b) => a.number - b.number);
  console.log(data);
}

function findItem(searchText, completed) {
  let resultIndex;

  if(completed) {
    data.completedItems.forEach((item, index) => {
      if (item.text === searchText) {
        resultIndex = index;
      }
    });
  } else {
    data.uncompletedItems.forEach((item, index) => {
      if (item.text === searchText) {
        resultIndex = index;
      }
    });
  }

  return resultIndex;
}

function updateNumberCounters() {
  nextUncompletedNumber = data.uncompletedItems[data.uncompletedItems.length - 1] != null ? data.uncompletedItems[data.uncompletedItems.length - 1].number + 1 : 1;
  nextCompletedNumber = data.completedItems[data.completedItems.length - 1] != null ? data.completedItems[data.completedItems.length - 1].number + 1 : 1;
}