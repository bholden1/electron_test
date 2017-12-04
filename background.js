var xmlDoc;

function loadXMLDoc()
{
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function()
  {
    if (this.readyState == 4 && this.status == 200)
    {
      xmlDoc = this.responseXML;
      getDropdown("class", "classDropdown");
      getDropdown("race", "raceDropdown");
      getDropdown("background", "backgroundDropdown");
      // parseClassNames(this);
    }
  };
  xmlhttp.open("GET", "../DnDAppFiles/Compendiums/Full Compendium.xml", true);
  xmlhttp.send();
}

function getElementList(name)
{
  console.log(xmlDoc);
  var x = xmlDoc.getElementsByTagName(name);
  var eList = [];
  for (var i = 0; i < x.length; i++)
  {
    var e_name = x[i].getElementsByTagName("name")[0].textContent.toString();
    eList.push(e_name);
    console.log(e_name);
  }
  return eList;
}

function getDropdown(name, dd_id)
{
  var eList = getElementList(name);
  var ddlist = "<option hidden=&quot;true&quot;>Please select a " + name + "</option>";
  for (var i = 0; i < eList.length; i++) {
    ddlist += "<option value=&quot;#" + eList[i] + "&quot;>" + eList[i] + "</option>";
  }
  document.getElementById(dd_id).innerHTML = ddlist;
}

// function parseClassNames(xml)
// {
//   xmlDoc = xml.responseXML;
//   var table="<tr><th>Name</th></tr>";
//   var x = xmlDoc.childNodes[0];
//   var classes = [];
//   for (var i = 0; i < x.children.length; i++)
//   {
//     var c = x.children[i];

//     var name = c.getElementsByTagName("name");

//     table += "<tr><td>" + name[0].textContent.toString() + "</td></tr>";

//     var color, type;
//     for (var j = 0; j < c.children.length; j++)
//     {
//       var e = c.children[j];

//       color = e.getElementsByTagName("color");
//       type = e.getElementsByTagName("type");
//     }

//     var classi =
//     {
//       name : name[0].textContent.toString(),
//       color : color[0].textContent.toString(),
//       type : type[0].textContent.toString()
//     };

//     classes.push(classi);
//   }
//   document.getElementById("demo").innerHTML = table;
//   updateDropdownList();
// }

// function showClassDetails()
// {
//   var classes;
//   var sel = document.getElementById("myDropdown");
//   var table = "<tr><th>Name</th><th>Color</th><th>Type</th></tr>";
//   for (var i = 0; i < classes.length; i++)
//   {
//     if (classes[i].name == sel.options[sel.selectedIndex].text)
//     {
//       table += "<tr><td>" + classes[i].name + "</td><td>" + classes[i].color + "</td><td>" + classes[i].type + "</td></tr>";
//     }
//   }
//   document.getElementById("class_details").innerHTML = table;
// }

window.onload = loadXMLDoc;