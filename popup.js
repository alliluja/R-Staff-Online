var Storage = window.localStorage;
var maxNum   = 10240; // ���������� MB �� �����
const userIdPrefix = "RSuser";
var isEmptyForm = true;
const ON  = 1;
const OFF = 0;

function check(storageKey, funcResult)
{
   if (storageKey.substr(0,6) == userIdPrefix) 
   {
      var id = Storage.getItem(storageKey)
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
               var fio        = "<a target=\"_blank\" href=\"" + url + "\">" + fioRow[0].innerText + "</a>";
               var lastChars  = img.src.substr(img.src.length-2,2);
               if ( lastChars == "=1")
               {
                  funcResult(true, fio);
               }
               else
               {
                  funcResult(false, fio);
               }
            }
         }
      }
   }
}


function checkTraffic(funcResult)
{
   var URL      = 'http://inetstat/result.php';
   var xhr = new XMLHttpRequest();
   xhr.open('GET', URL, true);
   xhr.send(null);
   xhr.onreadystatechange = function(){
       if (this.readyState == 4){
           if (this.responseText){
               var data = this.responseText;
               var parser = new DOMParser();
               var xmlDoc = parser.parseFromString(data, 'text/html');
               var numArr  = xmlDoc.getElementsByTagName('h3');
               var numStr  = numArr[numArr.length - 1].innerHTML;
               funcResult(Math.round(parseFloat(numStr.substr(8))));
            }
         }
      }
      
}


function execFunc()
{
   if (Storage.getItem("TrafficInspector") == ON)
   {
      checkTraffic(function(Mb) {
         var percent = Math.round(100*Mb/maxNum);
         var progressbar = document.getElementById('progress');
         progressbar.value = percent;
         var progressValue = document.getElementById('progress-value');
         progressValue.innerHTML = "�������: " + Mb + "Mb, " + percent + "%";
      });
   }
   var mainDoc = document.getElementById('main');
   for(let i = 0; i < Storage.length; i++)
   {
      check(Storage.key(i), function(result, fio) {
         isEmptyForm = false;
         var row = document.createElement("div");
         row.className = (result) ? 'green' : 'red';
         row.innerHTML = fio;
         mainDoc.appendChild(row);
      })
   }
   if (isEmptyForm)
   {
      mainDoc.innerHTML = "��� ������ ��� �����������,<br> ������� � <b><a href = \"conf.html\">���������</a></b>";
   }
}
   

window.onload = execFunc;