var Storage = window.localStorage;


function delChecked()
{
   var list = document.getElementById("fioList");
   var elems   = list.getElementsByClassName("chb");
   for(let i = 0; i < elems.length; i++)
   {
      if (elems[i].checked) {
         Storage.removeItem("RSuser" + elems[i].name);
      }
   }
}


function addUser()
{
   var IDelem = document.getElementById("id");
   var ID = IDelem.value;
   Storage.setItem("RSuser"+ID, ID);
}


function check(id, funcResult)
{
   var url = "http://atlant/Staff/Person.aspx?PersonID=" + id;
   var xhr = new XMLHttpRequest();
   xhr.open("GET", url, true);
   xhr.send(null);
   xhr.onreadystatechange = function()
   {
      if (this.readyState == 4)
      {
         if (this.responseText)
         {
            data           = this.responseText;
            parser         = new DOMParser();
            xmlDoc         = parser.parseFromString(data,"text/html");
            tds            = xmlDoc.getElementById("ImPlace");
            var elems      = tds.getElementsByTagName("img");
            var img        = elems[0];
            var fioRow     = xmlDoc.getElementsByClassName("profile-table-row-value");
            var fio        = fioRow[0].innerText;
            funcResult(fio);
         }
      }
   }
}

function execFunc()
{
   //Добавляем обработчик на кнопки, с onClick не работает
   var addButton = document.getElementById('addUser');
   addButton.addEventListener('click', addUser); 
   var delButton = document.getElementById('delUser');
   delButton.addEventListener('click', delChecked);

   if (Storage.length != 0)
   {
      var mainDoc = document.getElementById('fioList');
         for(let i = 0; i < Storage.length; i++)
         {
            check(Storage.getItem(Storage.key(i)), function(fio)
            {
               var row = document.createElement("p");
               row.innerHTML = '<label><input class = "chb" type=checkbox name ="' + Storage.getItem(Storage.key(i)) +'">' + fio + '</label>';
               mainDoc.appendChild(row);
            })
         }
   }
   else
   {
      var elem = document.getElementById("delForm");
      elem.parentNode.removeChild(elem);
   }
}

window.onload = execFunc;

