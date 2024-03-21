class shoppingItem{
    constructor(description){
        this.description = description;
        this.done = false;
        this.deleted = false;
    }
    setDescrption(description){
        this.description = description;
    }
    setDone(status) {
        this.done = status;
    }
    setDelete(status) {
        this.deleted = status;
    }
    getdescription() {
        return this.description;
    }
}

var key = document.getElementById("item");

const itemList = [];

key.addEventListener('keydown', function(event){
    if (event.key === 'Enter'){
    var description = document.getElementById("item").value.trim();
    console.log(description);
    document.getElementById("item").value ="";
    document.getElementById("item").placeholder ="Enter item";
    if (description == "") {
        alert("Please enter an item!");}
    else {
        for (var i = 0; i < itemList.length; i++) {
            if (description === itemList[i].description ) {
                alert("Item already exists in the list!");
                return;
            }
        }
        const newItem = new shoppingItem(description);
        itemList.push(newItem);
        console.log(itemList);
        render(newItem);
        }
    }
});

function addItem() { 
    var description = document.getElementById("item").value;
    if (description === "") {
        alert("Please enter an item!");
    }
    else {
        const newItem = new shoppingItem(description);
        itemList.push(newItem);
        console.log(itemList);
        render(newItem);
    }
  }


function render(item) {
    if (!item.deleted) {
        var listItem = document.createElement("li");
        listItem.classList.add("list");  
        var deleteButton = document.createElement("span");
        deleteButton.textContent = "X";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener('click', function() {
            item.setDelete(true); 
            listItem.remove(); 
            count();
        });
        listItem.addEventListener('click', function(){
            let status=item.done;
            item.setDone(!status);
            listItem.classList.toggle("marked");
            count();
        })
        var ulList = document.getElementById("list");
        listItem.textContent = item.getdescription();
        listItem.appendChild(deleteButton);
        ulList.appendChild(listItem);
        console.log(listItem);
        count();
    }
}
function count() {
    let markcount = 0;
    let unmarkcount = 0;
    let list = document.getElementById("list").getElementsByTagName("li");
    for (let index = 0; index < list.length; index++) {
        if(list[index].classList.contains("marked")) {
            markcount++;
        }
        else {
            unmarkcount++;
        }
    }
    console.log(markcount);
    console.log(unmarkcount);
    document.getElementById("mark").innerHTML = markcount;
    document.getElementById("unmark").innerHTML = unmarkcount;
}
var hide = false;
var btn= document.getElementById("btn");
btn.addEventListener('click', function(){
    hide? show_all():hidden();
})

function hidden() {
    let list = document.getElementById("list").getElementsByTagName("li");
    document.getElementById("btn").textContent = "Show All";
    for(let i =0; i<list.length;i++) {
        if(list[i].classList.contains("marked")) {
            list[i].style.display = "none";
        }
        else {
            list[i].style.display = "block";
        }
    }
    hide = true;
}

function show_all() {
    let list = document.getElementById("list").getElementsByTagName("li");
    document.getElementById("btn").textContent = "Hide Marked";
    for(let i =0; i<list.length;i++) {
            list[i].style.display = "block";
        }
    hide = false;
}