var classes = [];

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
function parseClassNames(xml)
{
  var xmlDoc = xml.responseXML;
  var table="<tr><th>Name</th></tr>";
  var x = xmlDoc.childNodes[0];
  classes = [];
  for (var i = 0; i < x.children.length; i++)
  {
    var c = x.children[i]

    var name = c.getElementsByTagName("name");

    table += "<tr><td>" +
    name[0].textContent.toString() +
    "</td></tr>";

    classes.push(name[0].textContent.toString());
    //  +
    // x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue +
    // "</td></tr>";
  }
  document.getElementById("demo").innerHTML = table;
  updateDropdownList();
}

function updateDropdownList()
{
  ddlist = "";
  for (var i = 0; i < classes.length; i++)
  {
    ddlist += "<a href=&quot;#" + classes[i] + "&quot;>" + classes[i] + "</a>"
  }
  document.getElementById("myDropdown").innerHTML = ddlist
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function showDropdownList()
{
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event)
{
  if (!event.target.matches('.dropbtn'))
  {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++)
    {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show'))
      {
        openDropdown.classList.remove('show');
      }
    }
  }
}