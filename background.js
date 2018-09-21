/*
 * Плагин R-Style Staff OnLine
 * Автор  Раков Вениамин 
 * Дата   сентябрь 2018
 * e-mail rvs2201@yandex.ru
 */

var Storage = window.localStorage;
const ON  = 1;
const OFF = 0;

function isConfig() //здесь делать проверки всех настроек, если не существует - создать
{
   if (!Storage.getItem("TrafficInspector"))
   {
      Storage.setItem("TrafficInspector", ON);
   }
}

OnLine = function()
{
    isConfig();
    url = "http://atlant/Staff/Person.aspx";
    xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.withCredentials = true;
    xhr.send(null);
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4)
        {
            if (xhr.responseText)
            {
                data    = xhr.responseText;
                parser  = new DOMParser();
                xmlDoc  = parser.parseFromString(data,"text/html");
                tds     = xmlDoc.getElementById("ImPlace");
                if (tds != null) {
                   var elems     = tds.getElementsByTagName("img");
                   var img       = elems[0];
                   var lastChars = img.src.substr(img.src.length-2,2);
                   if ( lastChars == "=1")
                   {
                       chrome.browserAction.setBadgeBackgroundColor({color:"#00AA00"});
                       chrome.browserAction.setBadgeText({text: "work"});
                   }
                   else
                   {
                       chrome.browserAction.setBadgeBackgroundColor({color:"#AA0000"});
                       chrome.browserAction.setBadgeText({text: "home"});
                   }
                }
                else
                {
                  chrome.browserAction.setBadgeBackgroundColor({color:"#AA0000"});
                  chrome.browserAction.setBadgeText({text: "Err!"});
                }
                
            }
        }
    }
}
OnLine();
window.onload = function() {
   window.setInterval(OnLine, 30000);
}