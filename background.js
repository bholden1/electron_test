var xmlDoc;
var data =
{
  "spell" : [],
  "monster" : [],
  "item" : [],
  "class" : [],
  "background" : [],
  "feat" : [],
  "race" : []
};

function loadXMLDoc()
{
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function()
  {
    if (this.readyState == 4 && this.status == 200)
    {
      xmlDoc = this.responseXML;
      loadData();
    }
  };
  xmlhttp.open("GET", "../DnDAppFiles/Compendiums/Full Compendium.xml", true);
  xmlhttp.send();
  //TODO: Load Feats.xml
}

function loadData()
{
  for (var i = 0; i < xmlDoc.children[0].children.length; ++i)
  {
    var childNode = xmlDoc.children[0].children[i];
    if (data.hasOwnProperty(childNode.tagName))
      data[childNode.tagName].push(childNode);
  }
}

function getElementList(name)
{
  var x = xmlDoc.getElementsByTagName(name);
  var eList = [];
  for (var i = 0; i < x.length; i++)
  {
    var e_name = x[i].getElementsByTagName("name")[0].textContent.toString();
    eList.push(e_name);
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

function loadTable(key)
{
  var outerTable = "<table class='basic_table sep_table' border=1>";
  var innerTable = "";
  var tagNames = "";
  var tagNamesArray = [];
  for (var i = 0; i < data[key].length; ++i) {
    innerTable += "<tr>";
    for (var j = 0; j < data[key][i].children.length; ++j) {
      var c = data[key][i].children[j];
      if (c.tagName != "trait" && c.tagName != "text" && c.children.length == 0)
        innerTable += "<td>" + c.textContent + "</td>";
      if (!tagNamesArray.includes(c.tagName))
      {
        tagNamesArray.push(c.tagName);
        tagNames += c.tagName + "\n";
      }
    }
    innerTable += "</tr>";
  }
  innerTable += "</table>";
  var innerTableHeader = "<tr>";
  for (i = 0; i < tagNamesArray.length; ++i)
    innerTableHeader += "<th>" + tagNamesArray[i] + "</th>";
  innerTableHeader += "</tr>";
  document.getElementById("sub_body").innerHTML = outerTable + innerTableHeader + innerTable;
  document.getElementById("debug").innerHTML = tagNames;
}

function selectFromTopHeader(id)
{
  var th = document.getElementById("locked_header_table").getElementsByTagName("th");
  for (var i = 0; i < th.length; ++i)
  {
    var color = "transparent";
    if (id == i)
      color = "rgb(237, 253, 92)";
    th[i].style.backgroundColor = color;
  }
  var div = document.getElementById("main_body").children;
  for (i = 0; i < div.length; ++i)
  {
    var visibility = "none";
    if (id == i)
      visibility = "block";
    div[i].style.display = visibility;
  }
}

function selectFromSubHeader(body_div, id, key)
{
  var th = document.getElementById(body_div).children[0].getElementsByTagName("th");
  for (var i = 0; i < th.length; ++i)
  {
    var color = "transparent";
    if (id == i)
      color = "rgb(255, 121, 80)";
    th[i].style.backgroundColor = color;
  }
  loadTable(key);
}

window.onload = loadXMLDoc;