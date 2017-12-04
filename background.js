var classes = [];
var xmlDoc;

function loadXMLDoc()
{
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function()
  {
    if (this.readyState == 4 && this.status == 200)
    {
      parseClassNames(this);
    }
  };
  xmlhttp.open("GET", "test.xml", true);
  xmlhttp.send();
}
window.onload = loadXMLDoc;

function parseClassNames(xml)
{
  xmlDoc = xml.responseXML;
  var table="<tr><th>Name</th></tr>";
  var x = xmlDoc.childNodes[0];
  classes = [];
  for (var i = 0; i < x.children.length; i++)
  {
    var c = x.children[i]

    var name = c.getElementsByTagName("name");

    table += "<tr><td>" + name[0].textContent.toString() + "</td></tr>";

    var color, type;
    for (var j = 0; j < c.children.length; j++)
    {
      var e = c.children[j]

      color = e.getElementsByTagName("color");
      type = e.getElementsByTagName("type");
    }

    var classi =
    {
      name : name[0].textContent.toString(),
      color : color[0].textContent.toString(),
      type : type[0].textContent.toString()
    }

    classes.push(classi);
  }
  document.getElementById("demo").innerHTML = table;
  updateDropdownList();
}

function updateDropdownList()
{
  ddlist = "<option hidden=&quot;true&quot;>Please select a class</option>";
  for (var i = 0; i < classes.length; i++)
  {
    ddlist += "<option value=&quot;#" + classes[i].name + "&quot;>" + classes[i].name + "</option>";
  }
  document.getElementById("myDropdown").innerHTML = ddlist;
}

function showClassDetails()
{
  var sel = document.getElementById("myDropdown");
  table = "<tr><th>Name</th><th>Color</th><th>Type</th></tr>";
  for (var i = 0; i < classes.length; i++)
  {
    if (classes[i].name == sel.options[sel.selectedIndex].text)
    {
      table += "<tr><td>" + classes[i].name + "</td><td>" + classes[i].color + "</td><td>" + classes[i].type + "</td></tr>";
    }
  }
  document.getElementById("class_details").innerHTML = table;
}