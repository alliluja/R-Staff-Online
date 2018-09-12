function execFunc()
{
   if (Storage.getItem(configArray[0]) == ON)
   {
      getData(urlInetstat, null, function(xmlDoc) {
         var numArr  = xmlDoc.getElementsByTagName('h3');
         var numStr  = numArr[numArr.length - 1].innerHTML;
         var Mb = Math.round(parseFloat(numStr.substr(8)));
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
      var storageKey = Storage.key(i);
      if (isUser(storageKey))
      getData(urlPerson, storageKey, function(xmlDoc)
      {
         var noDataDIV  = document.getElementById("noDataDIV");
         if (noDataDIV != null) noDataDIV.parentNode.removeChild(noDataDIV);
         tds            = xmlDoc.getElementById("ImPlace");
         var elems      = tds.getElementsByTagName("img");
         var img        = elems[0];
         var lastChars  = img.src.substr(img.src.length-2,2);
         var fioRow     = xmlDoc.getElementsByClassName("profile-table-row-value");
         var url        = urlPerson + Storage.getItem(storageKey);
         var fio        = "<a target=\"_blank\" href=\"" + url + "\">" + fioRow[0].innerText + "</a>";
         var row        = document.createElement("div");
         row.className  = (lastChars == "=1") ? 'green' : (lastChars == "=2")? 'blue':'red';
         row.innerHTML  = fio;
         mainDoc.appendChild(row);
      })
   }
}
   

window.onload = execFunc;