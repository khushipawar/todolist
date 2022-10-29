window.onload = () => {
  itemslist.addEventListener("click", removeItem);
};
function removeItem(e) {
  e.preventDefault();
  if (e.target.classList.contains("delete")) {
    let li = e.target.parentNode;
    itemslist.removeChild(li);
    document.getElementById("lblsuccess").innerHTML =
      "Text deleted successfully";

    document.getElementById("lblsuccess").style.display = "block";

    setTimeout(function () {
      document.getElementById("lblsuccess").style.display = "none";
    }, 3000);
  }
}

function myFunction() {
  const tasks = document.getElementById("txt").value;

  let li = document.createElement("li");

  li.id = "listt";
  let deleteButton = document.createElement("button");

  deleteButton.className = "delete child";

  deleteButton.appendChild(document.createTextNode("Delete"));

  if (tasks == "") {
    window.alert("write something");
  } else {
    li.textContent = tasks;

    li.appendChild(deleteButton);

    document.getElementById("itemslist").appendChild(li);
  }
  document.getElementById("txt").value = "";
}
