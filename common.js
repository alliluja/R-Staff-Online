/*
 * Плагин R-Style Staff OnLine
 * Автор  Раков Вениамин 
 * Дата   сентябрь 2018
 * e-mail rvs2201@yandex.ru
 */

var   Storage        = window.localStorage;
const userIdPrefix   = "RSuser";
var   configArray    = ["TrafficInspector"];
var   maxNum         = 10240; // Количество MB на месяц
var   urlPerson      = "http://atlant/Staff/Person.aspx?PersonID=";
var   urlInetstat    = "http://inetstat/result.php";
const ON             = 1;
const OFF            = 0;

function isUser(storageKey) {
   return (storageKey.substr(0,6) == userIdPrefix);
}
function setOnClickForButtons()//Добавляем обработчик на кнопки, с onClick не работает
{
   var Button = document.getElementById('addUser');
   Button.addEventListener('click', addUser); 
   Button = document.getElementById('delUser');
   Button.addEventListener('click', delChecked);
   Button = document.getElementById('saveConfig');
   Button.addEventListener('click', saveConfig);   
}

function delChecked()
{
   var list    = document.getElementById("fioList");
   var elems   = list.getElementsByClassName("chb");
   for(let i   = 0; i < elems.length; i++)
   {
      if (elems[i].checked) {
         Storage.removeItem(userIdPrefix + elems[i].name);
      }
   }
}

function addUser()
{
   var IDelem = document.getElementById("id");
   if (IDelem.value > 0 && IDelem.value < 99999) {
      var ID = IDelem.value;
      Storage.setItem(userIdPrefix+ID, ID);
   }
   else
   {
      alert('PersonID: "' + IDelem.value + '" не корректен. Введите число от 1 до 9999')
   }
}

function saveConfig()
{
   var list    = document.getElementById("configs");
   var elems   = list.getElementsByClassName("chb");
   for(let i   = 0; i < elems.length; i++)
   {
      var status = (elems[i].checked)? ON: OFF;
         Storage.setItem(elems[i].id, status);
   }
}

function getData(url, storageKey, resultFunc)
{
   var id   = (storageKey != null)? Storage.getItem(storageKey): "";
   var xhr  = new XMLHttpRequest();
   xhr.open("GET", url + id, true);
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
            resultFunc(xmlDoc);
         }
      }
   }

}