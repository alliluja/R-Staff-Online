var Storage = window.localStorage;
const userIdPrefix = "RSuser";
const ON  = 1;
const OFF = 0;
var isEmptyForm = true;

function delChecked()
{
   var list = document.getElementById("fioList");
   var elems   = list.getElementsByClassName("chb");
   for(let i = 0; i < elems.length; i++)
   {
      if (elems[i].checked) {
         Storage.removeItem(userIdPrefix + elems[i].name);
      }
   }
}


function addUser()
{
   var IDelem = document.getElementById("id");
   var ID = IDelem.value;
   Storage.setItem(userIdPrefix+ID, ID);
}

function saveConfig()
{
   var list = document.getElementById("configs");
   var elems   = list.getElementsByClassName("chb");
   for(let i = 0; i < elems.length; i++)
   {
      var status = (elems[i].checked)? ON: OFF;
         Storage.setItem(elems[i].id, status);
   }
}


function check(storageKey, funcResult)
{
   if (storageKey.substr(0,6) == userIdPrefix)
   {
      var id = Storage.getItem(storageKey);
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
   else //если не ИД пользователя, а что-то другое
   {
      var cfg = Storage.getItem(storageKey);
      var element = document.getElementById(storageKey);
      element.checked = (cfg == ON)? true: false;
   }
}

function execFunc()
{
   //Добавляем обработчик на кнопки, с onClick не работает
   var Button = document.getElementById('addUser');
   Button.addEventListener('click', addUser); 
   Button = document.getElementById('delUser');
   Button.addEventListener('click', delChecked);
   Button = document.getElementById('saveConfig');
   Button.addEventListener('click', saveConfig);

   var mainDoc = document.getElementById('fioList');
   for(let i = 0; i < Storage.length; i++)
   {
      check(Storage.key(i), function(fio)
      {
         isEmptyForm = false;
         var row = document.createElement("p");
         row.innerHTML = '<label><input class = "chb" type=checkbox name ="' + Storage.getItem(Storage.key(i)) +'">' + fio + '</label>';
         mainDoc.appendChild(row);
      })
      }
   if (isEmptyForm)
   {
      var elem = document.getElementById("delForm");
      elem.parentNode.removeChild(elem);
   }
}

window.onload = execFunc;

