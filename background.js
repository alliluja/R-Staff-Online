OnLine = function(){
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
                data = xhr.responseText;
                parser = new DOMParser();
                xmlDoc = parser.parseFromString(data,"text/html");
                tds = xmlDoc.getElementById("ImPlace");
                if (tds != null) {
                   var elems = tds.getElementsByTagName("img");
                   var img = elems[0];
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
                  chrome.browserAction.setBadgeText({text: "err"});
                }
                
            }
        }
    }
}
OnLine(); //Чтоб сразу статус появлялся, а не через какое-то время
window.onload = function() {//обновляем статус
   window.setInterval(OnLine, 30000);
}