function execFunc()
{
   setOnClickForButtons();//��������� ���������� �� ������, � onClick �� ��������

   var mainDoc = document.getElementById('fioList');
   for(let i = 0; i < Storage.length; i++)
   {/*������ ���������*/
      if (isUser(Storage.key(i))) //������� ���� �������������
      getData(urlPerson, Storage.key(i), function(xmlDoc)
      {
         var fioRow     = xmlDoc.getElementsByClassName("profile-table-row-value");
         var row        = document.createElement("p");
         row.innerHTML  = '<label><input class = "chb" type=checkbox name ="' + Storage.getItem(Storage.key(i)) +'">' + fioRow[0].innerText + '</label>';
         mainDoc.appendChild(row);
      })
      else //�������� ���������
      {
         var cfg           = Storage.getItem(Storage.key(i));
         var element       = document.getElementById(Storage.key(i));
         element.checked   = (cfg == ON)? true: false;
      }
   }
   if (Storage.length == configArray.length)
   {
      var elem = document.getElementById("delForm");
      elem.parentNode.removeChild(elem);
   }
}

window.onload = execFunc;

