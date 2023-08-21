const sheetId = '1SRR-wnYTPiuZ5xQC3cjbHafmm5o3ZB_Om7eljPJUmoU';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
let query = encodeURIComponent('Select *');
let Teachers="Teachers";
let UrlTeachers = `${base}&sheet=${Teachers}&tq=${query}`;
let DataTeachers = [];
let Class="Class";
let UrlClass = `${base}&sheet=${Class}&tq=${query}`;
let DataClass = [];
let Mats="Mats";
let UrlMat = `${base}&sheet=${Mats}&tq=${query}`;
let DataMat = [];
let Contracts="Contracts";
let UrlContract = `${base}&sheet=${Contracts}&tq=${query}`;
let DataContract = [];
let Semester="Semester";
let UrlSemester = `${base}&sheet=${Semester}&tq=${query}`;
let DataSemester = [];
let Student="Student";
let UrlStudent = `${base}&sheet=${Student}&tq=${query}`;
let DataStudent = [];
let Table1="Table";
let UrlTable = `${base}&sheet=${Table1}&tq=${query}`;
let DataTable = [];
let Periods="Periods";
let UrlPeriod = `${base}&sheet=${Periods}&tq=${query}`;
let DataPeriod = [];
document.addEventListener('DOMContentLoaded', init)
function init() {
  ConvertMode();
  LoadTeachers();
  LoadClass();
  LoadMat();
  LoadContract();
  LoadSemester();
  LoadStudent();
  LoadTable();
  LoadPeriod();
  if (typeof(Storage) !== "undefined") {
    if( localStorage.getItem("PassWord")!=null){
      document.getElementById("Teacher_PassWord").value=localStorage.getItem("PassWord");
    }
    if( localStorage.getItem("Teacher_Index")!=null){
      ShowSelectForm(localStorage.getItem("ActiveForm"));
    }
  }
}
function ShowSelectForm(ActiveForm){
  document.getElementById("loginPage").style.display="none";
  document.getElementById("Main").style.display="none";
  document.getElementById("TeacherSBrowser").style.display="none";
  document.getElementById("TeachersWi").style.display="none";
  document.getElementById("ClassSBrowser").style.display="none";
  document.getElementById("ClassWi").style.display="none";
  document.getElementById("MatBrowser").style.display="none";
  document.getElementById("MatWi").style.display="none";
  document.getElementById("ContractBrowser").style.display="none";
  document.getElementById("ContractWi").style.display="none";
  document.getElementById("StudentWi").style.display="none";
  document.getElementById("StudentBrowser").style.display="none";
  document.getElementById("TableWi").style.display="none";
  document.getElementById("TableBrowser").style.display="none";
  document.getElementById("TableEnd").style.display="none";
  document.getElementById(ActiveForm).style.display="flex";
  localStorage.setItem("ActiveForm",ActiveForm)
}
// ********************TeachersWi
function LoadTeachers(){
  DataTeachers=[];
  fetch(UrlTeachers)
  .then(res => res.text())
  .then(rep => {
      const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
      const colzUser = [];
      jsonData.table.cols.forEach((heading) => {
          if (heading.label) {
              let columnUser = heading.label;
              colzUser.push(columnUser);
          }
      })
      jsonData.table.rows.forEach((rowData) => {
          const rowUser = {};
          colzUser.forEach((ele, ind) => {
              rowUser[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
          })
          DataTeachers.push(rowUser);
      })
      LoadOptionTeacherCon();
  })
}
function LoadOptionTeacherCon(){
  let Num,ClassN;
  let optionClass;
  document.getElementById("datalistTeachers").innerHTML="";
  document.getElementById("listtechers").innerHTML="";
  document.getElementById("listtechersEnd").innerHTML="";
  for (let index = 0; index < DataTeachers.length; index++) {
    ClassN=DataTeachers[index].FullName
    Num=DataTeachers[index].Number
    if(Num!=""){
      optionClass=document.createElement("option");
      optionClass.value=ClassN;
      optionClass.textContent=ClassN;
      document.getElementById("datalistTeachers").appendChild(optionClass);
      optionClass=document.createElement("option");
      optionClass.value=ClassN;
      optionClass.textContent=ClassN;
      document.getElementById("listtechers").appendChild(optionClass);
      optionClass=document.createElement("option");
      optionClass.value=ClassN;
      optionClass.textContent=ClassN;
      document.getElementById("listtechersEnd").appendChild(optionClass);
    }
  }
}

function IstrueDataInform(){
  let FirstName=document.getElementById("FirstName");
  let LastName=document.getElementById("LastName");
  let Gender=document.getElementById("Gender");
  let Phone=document.getElementById("Phone");
  let Email=document.getElementById("Email");
  let PassWord=document.getElementById("PassWord");
  if(FirstName.value==""){FirstName.style.border="2px solid #ff0000";return false}else{FirstName.style.border="none";}
  if(LastName.value==""){LastName.style.border="2px solid #ff0000";return false}else{LastName.style.border="none";}
  if(Gender.value==""){Gender.style.border="2px solid #ff0000";return false}else{Gender.style.border="none";}
  if(Phone.value==""){Phone.style.border="2px solid #ff0000";return false}else{Phone.style.border="none";}
  if(Email.value==""){Email.style.border="2px solid #ff0000";return false}else{Email.style.border="none";}
  if(PassWord.value==""){PassWord.style.border="2px solid #ff0000";return false}else{PassWord.style.border="none";}
  return true
}

function onsubmitForm1(){
  if(IstrueDataInform()===true){
    let PassWord=document.getElementById("PassWord");
    if(foundIndex(PassWord.value)==-1){
        document.getElementById("Mode").value="New";
        onsubmitForm();
    }else{
          PassWord.style.border="2px solid #ff0000";
    }
  }
}
function onsubmitForm2(){
  if(IstrueDataInform()===true){
    let PassWord=document.getElementById("PassWord");
    let Index=foundIndex(PassWord.value);
      if(Index==-1){
      document.getElementById("Mode").value="Modified";
      onsubmitForm();
      }else if(Index==document.getElementById("Row").value -2){
      document.getElementById("Mode").value="Modified";
      onsubmitForm();
      }else{
        PassWord.style.border="2px solid #ff0000";
      }
    }
}

function onsubmitForm3(){
  document.getElementById("Mode").value="Deleted"
  onsubmitForm();
}
function onsubmitForm(){
  let MainForm=document.getElementById("MainForm");
  var w = window.open('', 'form_target', 'width=600, height=400');
  MainForm.target = 'form_target';
  MainForm.action='https://script.google.com/macros/s/AKfycbyc5r_U1L4JuGP71bbXhBXMbGhhG7uzL7sOsOJVXYIgoFo5uQGqOIiqQtBxK0l4AX81RQ/exec'
  MainForm.submit();
  if (MainForm.onsubmit()==true){
    const myTimeout = setTimeout(function(){ 
      const myTimeout1 = setTimeout(function(){ 
                w.close();
                clearTimeout(myTimeout)
                clearTimeout(myTimeout1)
                location.reload();
    }, 1000);}, 4000);
  }
} 

function GoToMain(){
  ShowSelectForm("Main");
}

// **********************SignIN*****************
function IsfoundUser(TPassWord){
  let error_User_ID= document.getElementById("error_User_ID");
    for (let index = 0; index < DataTeachers.length; index++) {
      if(TPassWord==DataTeachers[index].PassWord){
        localStorage.setItem("Teacher_Index", index);
        return true;
      }
    }
      error_User_ID.className="fa fa-warning";
      return false ;
  }

  function foundIndex(TPassWord){
      for (let index = 0; index < DataTeachers.length; index++) {
        if(TPassWord==DataTeachers[index].PassWord){
          return index
        }
      }
      return -1
    }
  
function Istrue(TPassWord){
  let error_User_ID= document.getElementById("error_User_ID");
  if(TPassWord===""){ error_User_ID.className="fa fa-warning"; return false;}else{ error_User_ID.className="" }
  if(IsfoundUser(TPassWord)===false){return false}else{error_User_ID.className=""}
  return true;
}

function Sign_In(){
  let Teacher_PassWord= document.getElementById("Teacher_PassWord");
  if (Istrue(Teacher_PassWord.value)===true){
    let Teacher_Index = localStorage.getItem("Teacher_Index");
    localStorage.setItem("Teacher_Name", DataTeachers[Teacher_Index].FullName);
    localStorage.setItem("PassWord",DataTeachers[Teacher_Index].PassWord);
    ShowSelectForm("Main");
  }
}

function ShowPassword(){
  let Teacher_PassWord= document.getElementById("Teacher_PassWord");
  let Eye_Password= document.getElementById("Eye_Password");
  if (Eye_Password.className=="fa fa-eye"){
    Teacher_PassWord.type="text";
    Eye_Password.className="fa fa-eye-slash";
  }else{
    Teacher_PassWord.type="password";
    Eye_Password.className="fa fa-eye";
  }
}

// ***********************Mode*********************
function ConvertMode(){
  if (localStorage.getItem("FColor")==1){
    ConvertModeToSun();
  }else{
    ConvertModeToMoon();
  }
 }

function ConvertModeToSun(){
  localStorage.setItem("FColor", 1);
  document.getElementById("Moon").style.display="inline-block";
  document.getElementById("Sun").style.display="none";
  document.querySelector(':root').style.setProperty('--FColor', "wheat"); 
  document.querySelector(':root').style.setProperty('--EColor', "white");
  document.querySelector(':root').style.setProperty('--loginColor', "whitesmoke"); 
  document.querySelector(':root').style.setProperty('--FontColor', "#f2a20b"); 
  document.querySelector(':root').style.setProperty('--Font2Color', "#a53333"); 
  document.querySelector(':root').style.setProperty('--Font3Color', "#a53333");
  document.querySelector(':root').style.setProperty('--THColor', "wheat");  
  document.querySelector(':root').style.setProperty('--TDColor', "yellow"); 
} 
function ConvertModeToMoon(){
  localStorage.setItem("FColor", 2);
  document.getElementById("Sun").style.display="inline-block";
  document.getElementById("Moon").style.display="none";
  document.querySelector(':root').style.setProperty('--FColor', "#141e30"); 
  document.querySelector(':root').style.setProperty('--EColor', "#243b55");
  document.querySelector(':root').style.setProperty('--loginColor', "#00000080"); 
  document.querySelector(':root').style.setProperty('--FontColor', "white"); 
  document.querySelector(':root').style.setProperty('--Font2Color', "#d3f6f8"); 
  document.querySelector(':root').style.setProperty('--Font3Color', "black"); 
  document.querySelector(':root').style.setProperty('--THColor', "gray");  
  document.querySelector(':root').style.setProperty('--TDColor', "Red"); 
}  
// *************************************Main**************
function ShowTeacherBrowser(){
  let Index=localStorage.getItem("Teacher_Index");
  if (DataTeachers[Index].IsAdmin=="yes"){
    ShowSelectForm("TeacherSBrowser");
    LoadTeachersToTable();
  }
}
function ShowClassBrowser(){
  let Index=localStorage.getItem("Teacher_Index");
  if (DataTeachers[Index].IsAdmin=="yes"){
  ShowSelectForm("ClassSBrowser");
  LoadClassToTable();
}
}
function ShowMatBrowser(){
  let Index=localStorage.getItem("Teacher_Index");
  if (DataTeachers[Index].IsAdmin=="yes"){
  ShowSelectForm("MatBrowser");
  LoadMatToTable();
  }
}
function ShowContractBrowser(){
  let Index=localStorage.getItem("Teacher_Index");
  if (DataTeachers[Index].IsAdmin=="yes"){
  ShowSelectForm("ContractBrowser");
  LoadContractToTable();
  }
}
function ShowStudentBrowser(){
  let Index=localStorage.getItem("Teacher_Index");
  if (DataTeachers[Index].IsAdmin=="yes"){
  ShowSelectForm("StudentBrowser");
  LoadStudentToTable();
  }
}
function ShowTableBrowser(){
  let Index=localStorage.getItem("Teacher_Index");
  if (DataTeachers[Index].IsAdmin=="yes"){
  ShowSelectForm("TableBrowser");
  LoadTableToTable();
  }
}
function ShowTableEnD(){
  ShowSelectForm("TableEnd");
 
  let TableSelect=document.getElementById("TableSelect").value
  if (TableSelect==1){
    LoadEndToTable();
  }else{
    LoadEndToTableSection();
  }
}
function SignOutUser(){
  localStorage.removeItem("Teacher_Index");
  ShowSelectForm("loginPage");
}
// **************************TeacherBrowser***********
function LoadTeachersToTable(){
  let Num;
  document.getElementById("bodydata").innerHTML=""
  for (let index = 0; index < DataTeachers.length; index++) {
    Num=DataTeachers[index].Number
    if(Num!="" && DataTeachers[index].IsTeacher=="yes"){
    AddRow(Num,DataTeachers[index].FullName,DataTeachers[index].Phone,DataTeachers[index].Gender,DataTeachers[index].Email)
    }
  }
}

function AddRow(Num,Fname,Phone,Gender,Email) {
  let bodydata=document.getElementById("bodydata");
  let row = bodydata.insertRow();
  row.id="T" + bodydata.childElementCount;
  let cell = row.insertCell();
  cell.id="T" + bodydata.childElementCount + "Num";
  cell.innerHTML = Num;
  cell = row.insertCell();
  cell.id="T" + bodydata.childElementCount + "Fname";
  cell.innerHTML = Fname;
  cell = row.insertCell();
  cell.id="T" + bodydata.childElementCount + "Phone";
  cell.innerHTML = Phone;
  cell = row.insertCell();
  cell.id="T" + bodydata.childElementCount + "Gender";
  cell.innerHTML = Gender;
  cell = row.insertCell();
  cell.id="T" + bodydata.childElementCount + "Email";
  cell.innerHTML = Email;
  row.appendChild(td=document.createElement('td'));
  var btb = document.createElement('input');
  btb.type = "button";
  btb.id="But" + bodydata.childElementCount;
  btb.value = "تعديل";
  td.appendChild(btb)
  btb.style.cursor="pointer";
  btb.style.color="red";
  btb.onclick=function(){showdatarows()};
  };
  function ShowDetails(){
    ShowSelectForm("TeachersWi");
    document.getElementById("FirstName").value="";
    document.getElementById("LastName").value="";
    document.getElementById("Gender").value="";
    document.getElementById("Phone").value="";
    document.getElementById("Email").value="";
    document.getElementById("PassWord").value="";
    document.getElementById("Note").value="";
    document.getElementById("Row").value="" ;
  }

  function showdatarows() {
    let indextable= document.activeElement.parentElement.parentElement.id;
    let IndexRow =document.getElementById(indextable).children.item(0).textContent -1 ;
    ShowDetails();
    document.getElementById("FirstName").value=DataTeachers[IndexRow].FirstName;
    document.getElementById("LastName").value=DataTeachers[IndexRow].LastName;
    document.getElementById("Gender").value=DataTeachers[IndexRow].Gender;
    document.getElementById("Phone").value=DataTeachers[IndexRow].Phone;
    document.getElementById("Email").value=DataTeachers[IndexRow].Email;
    document.getElementById("PassWord").value=DataTeachers[IndexRow].PassWord;
    document.getElementById("Note").value=DataTeachers[IndexRow].Note;
    document.getElementById("Row").value=IndexRow +2 ;
  };
  // **************ClassWi
  function LoadClass(){
    DataClass=[];
    fetch(UrlClass)
    .then(res => res.text())
    .then(rep => {
        const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
        const colzUser = [];
        jsonData.table.cols.forEach((heading) => {
            if (heading.label) {
                let columnUser = heading.label;
                colzUser.push(columnUser);
            }
        })
        jsonData.table.rows.forEach((rowData) => {
            const rowUser = {};
            colzUser.forEach((ele, ind) => {
                rowUser[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
            })
            DataClass.push(rowUser);
        })
        LoadOptionClassMat();
    })
  }
  function LoadOptionClassMat(){
    let Num,ClassN,SectionN;
    let optionClass,optionContract;
    document.getElementById("MatClass").innerHTML="";
    document.getElementById("ClassCon").innerHTML="";
    document.getElementById("SClass").innerHTML="";
    document.getElementById("ClassT").innerHTML="";
    document.getElementById("TableSection").innerHTML="";
    
    for (let index = 0; index < DataClass.length; index++) {
      ClassN=DataClass[index].ClassName
      SectionN=DataClass[index].Section
      Num=DataClass[index].Number
      if(Num!=""){
        optionClass=document.createElement("option");
        optionClass.value=ClassN;
        optionClass.textContent=ClassN;
        document.getElementById("MatClass").appendChild(optionClass);
        optionContract=document.createElement("option");
        optionContract.value=ClassN;
        optionContract.textContent=ClassN;
        document.getElementById("ClassCon").appendChild(optionContract);
        optionClass=document.createElement("option");
        optionClass.value=ClassN;
        optionClass.textContent=ClassN;
        document.getElementById("SClass").appendChild(optionClass);
        optionClass=document.createElement("option");
        optionClass.value=ClassN;
        optionClass.textContent=ClassN;
        document.getElementById("ClassT").appendChild(optionClass);
        optionClass=document.createElement("option");
        optionClass.value=ClassN + "/" + SectionN;
        optionClass.textContent=ClassN + "/" + SectionN;
        document.getElementById("TableSection").appendChild(optionClass);
      }
    }
  }
  function LoadOptionStudent(){
    let Num,ClassN;
    let optionClass;
    document.getElementById("SSection").innerHTML="";
    for (let index = 0; index < DataClass.length; index++) {
      ClassN=DataClass[index].Section
      Num=DataClass[index].Number
      if(Num!="" &&  DataClass[index].ClassName==document.getElementById("SClass").value ){
        optionClass=document.createElement("option");
        optionClass.value=ClassN;
        optionClass.textContent=ClassN;
        document.getElementById("SSection").appendChild(optionClass);
      }
    }
  }
  function LoadOptionTable(){
    LoadOptionTableMat();
    let Num,ClassN;
    let optionClass;
    document.getElementById("SectionT").innerHTML="";
    for (let index = 0; index < DataClass.length; index++) {
      ClassN=DataClass[index].Section
      Num=DataClass[index].Number
      if(Num!="" &&  DataClass[index].ClassName==document.getElementById("ClassT").value ){
        optionClass=document.createElement("option");
        optionClass.value=ClassN;
        optionClass.textContent=ClassN;
        document.getElementById("SectionT").appendChild(optionClass);
      }
    }
  }
  function IstrueDataInformClass(){
    let ClassName=document.getElementById("ClassName");
    let Section=document.getElementById("Section");
    if(ClassName.value==""){ClassName.style.border="2px solid #ff0000";return false}else{ClassName.style.border="none";}
    if(Section.value==""){Section.style.border="2px solid #ff0000";return false}else{Section.style.border="none";}
      return true
  }
  
  function onsubmitFormClass1(){
    if(IstrueDataInformClass()===true){
          document.getElementById("ModeClass").value="New";
          onsubmitFormClass();
      }
  }
  function onsubmitFormClass2(){
    if(IstrueDataInformClass()===true){
        document.getElementById("ModeClass").value="Modified";
        onsubmitFormClass();
      }
  }
  
  function onsubmitFormClass3(){
    document.getElementById("ModeClass").value="Deleted"
    onsubmitFormClass();
  }

  function onsubmitFormClass(){
    let MainFormClass=document.getElementById("MainFormClass");
    var XX = window.open('', 'form_target', 'width=600, height=400');
    MainFormClass.target = 'form_target';
    MainFormClass.action='https://script.google.com/macros/s/AKfycbzu9E0GFCsgz0_hfYLvpU-awO_xiorFjr1_pEMDcf6Ou_MueYYoVK0nUM5fsOJg5tLR/exec'
    MainFormClass.submit();
    if (MainFormClass.onsubmit()==true){
      const myTimeout = setTimeout(function(){ 
        const myTimeout1 = setTimeout(function(){ 
                  XX.close();
                  clearTimeout(myTimeout)
                  clearTimeout(myTimeout1)
                  location.reload();
      }, 1000);}, 4000);
    }
  } 
  // **************************ClassBrowser***********
function LoadClassToTable(){
  let Num,ClassN;
  document.getElementById("bodydClass").innerHTML="";
  for (let index = 0; index < DataClass.length; index++) {
    ClassN=DataClass[index].ClassName
    Num=DataClass[index].Number
    if(Num!=""){
      AddRowClass(Num,DataClass[index].ClassName,DataClass[index].Section,DataClass[index].Note)
    }
  }
}

function AddRowClass(Num,ClassName,Section,Note) {
  let bodydata=document.getElementById("bodydClass");
  let row = bodydata.insertRow();
  row.id="CL" + bodydata.childElementCount;
  let cell = row.insertCell();
  cell.id="CL" + bodydata.childElementCount + "Num";
  cell.innerHTML = Num;
  cell = row.insertCell();
  cell.id="CL" + bodydata.childElementCount + "ClassName";
  cell.innerHTML = ClassName;
  cell = row.insertCell();
  cell.id="CL" + bodydata.childElementCount + "Section";
  cell.innerHTML = Section;
  cell = row.insertCell();
  cell.id="CL" + bodydata.childElementCount + "NoteClass";
  cell.innerHTML = Note;
  row.appendChild(td=document.createElement('td'));
  var btb = document.createElement('input');
  btb.type = "button";
  btb.id="ButClass" + bodydata.childElementCount;
  btb.value = "تعديل";
  td.appendChild(btb)
  btb.style.cursor="pointer";
  btb.style.color="red";
  btb.onclick=function(){showdatarowsClass()};
  };
  function ShowDetailsClass(){
    ShowSelectForm("ClassWi");
    document.getElementById("ClassName").value="";
    document.getElementById("Section").value="";
    document.getElementById("NoteClass").value="";
  }

  function showdatarowsClass() {
    let indextable= document.activeElement.parentElement.parentElement.id;
    let IndexRow =document.getElementById(indextable).children.item(0).textContent -1 ;
    ShowDetailsClass();
    document.getElementById("ClassName").value=DataClass[IndexRow].ClassName;
    document.getElementById("Section").value=DataClass[IndexRow].Section;
    document.getElementById("NoteClass").value=DataClass[IndexRow].Note;
    document.getElementById("RowClass").value=IndexRow +2 ;
  };
    // **************MatWi
    function LoadMat(){
      DataMat=[];
      fetch(UrlMat)
      .then(res => res.text())
      .then(rep => {
          const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
          const colzUser = [];
          jsonData.table.cols.forEach((heading) => {
              if (heading.label) {
                  let columnUser = heading.label;
                  colzUser.push(columnUser);
              }
          })
          jsonData.table.rows.forEach((rowData) => {
              const rowUser = {};
              colzUser.forEach((ele, ind) => {
                  rowUser[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
              })
              DataMat.push(rowUser);
          })
          LoadOptionContractMat();
          LoadOptionContractCode();
          LoadOptionTableMat();
      })
    }

    function LoadOptionContractMat(){
      let Num,ClassN;
      let optionContract;
      document.getElementById("datalistMat").innerHTML="";
      for (let index = 0; index < DataMat.length; index++) {
        ClassN=DataMat[index].MatName
        Num=DataMat[index].Number
        if(Num!="" && document.getElementById("ClassCon").value==DataMat[index].Class){
          optionContract=document.createElement("option");
          optionContract.value=ClassN;
          optionContract.textContent=ClassN;
          document.getElementById("datalistMat").appendChild(optionContract);
        }
      }
    }
    function LoadOptionTableMat(){
      let Num,ClassN;
      let optionContract;
      document.getElementById("listMats").innerHTML="";
      for (let index = 0; index < DataMat.length; index++) {
        ClassN=DataMat[index].MatName
        Num=DataMat[index].Number
        if(Num!="" && document.getElementById("ClassT").value==DataMat[index].Class){
          optionContract=document.createElement("option");
          optionContract.value=ClassN;
          optionContract.textContent=ClassN;
          document.getElementById("listMats").appendChild(optionContract);
        }
      }
    }
    function LoadOptionContractCode(){
      let Num,ClassN;
      let optionContract;
      document.getElementById("datalistCode").innerHTML="";
      for (let index = 0; index < DataMat.length; index++) {
        ClassN=DataMat[index].MatCode
        Num=DataMat[index].Number
        if(Num!="" && document.getElementById("MatCon").value==DataMat[index].MatName){
          optionContract=document.createElement("option");
          optionContract.value=ClassN;
          optionContract.textContent=ClassN;
          document.getElementById("datalistCode").appendChild(optionContract);
        }
      }
    }

    function foundCodeMat(CodeN){
      for (let index = 0; index < DataMat.length; index++) {
        if(CodeN==DataMat[index].MatCode){
          return index
        }
      }
      return -1
    }

    function IstrueDataInformMat(){
      let MatName=document.getElementById("MatName");
      let MatCode=document.getElementById("MatCode");
      let MatClass=document.getElementById("MatClass");
      if(MatName.value==""){MatName.style.border="2px solid #ff0000";return false}else{MatName.style.border="none";}
      if(MatCode.value==""){MatCode.style.border="2px solid #ff0000";return false}else{MatCode.style.border="none";}
      if(MatClass.value==""){MatClass.style.border="2px solid #ff0000";return false}else{MatClass.style.border="none";}
         return true
    }


function onsubmitFormMat1(){
  if(IstrueDataInformMat()===true){
    let CodeN=document.getElementById("MatCode");
    if(foundCodeMat(CodeN.value)==-1){
      document.getElementById("ModeMat").value="New";
      onsubmitFormMat();
    }else{
      CodeN.style.border="2px solid #ff0000";
    }
  }
}

function onsubmitFormMat2(){
  if(IstrueDataInformMat()===true){
        let CodeN=document.getElementById("MatCode");
        let Index=foundCodeMat(CodeN.value);
          if(Index==-1){
            document.getElementById("ModeMat").value="Modified";
            onsubmitFormMat();
          }else if(Index==document.getElementById("RowMat").value -2){
            document.getElementById("ModeMat").value="Modified";
            onsubmitFormMat();
          }else{
            CodeN.style.border="2px solid #ff0000";
          }
        }
    }

    
    function onsubmitFormMat3(){
      document.getElementById("ModeMat").value="Deleted"
      onsubmitFormMat();
    }
  
    function onsubmitFormMat(){
      let MainFormMat=document.getElementById("MainFormMat");
      var XX = window.open('', 'form_target', 'width=600, height=400');
      MainFormMat.target = 'form_target';
      MainFormMat.action='https://script.google.com/macros/s/AKfycbz_QgWI40lkqqgVmQliEprK_DL2XdgR8JjydgxjgW-bICCqEoyYjBUFIXzAuR9FjpOy/exec'
      MainFormMat.submit();
      if (MainFormMat.onsubmit()==true){
        const myTimeout = setTimeout(function(){ 
          const myTimeout1 = setTimeout(function(){ 
                    XX.close();
                    clearTimeout(myTimeout)
                    clearTimeout(myTimeout1)
                    location.reload();
        }, 1000);}, 4000);
      }
    } 
    // **************************MatBrowser***********
  function LoadMatToTable(){
    let Num;
    document.getElementById("bodydMat").innerHTML=""
    for (let index = 0; index < DataMat.length; index++) {
      Num=DataMat[index].Number
      if(Num!=""){
        AddRowMat(Num,DataMat[index].MatName,DataMat[index].MatCode,DataMat[index].Class,DataMat[index].Note)
      }
    }
  }
  
  function AddRowMat(Num,MatName,MatCode,ClassN,Note) {
    let bodydata=document.getElementById("bodydMat");
    let row = bodydata.insertRow();
    row.id="M" + bodydata.childElementCount;
    let cell = row.insertCell();
    cell.id="M" + bodydata.childElementCount + "Num";
    cell.innerHTML = Num;
    cell = row.insertCell();
    cell.id="M" + bodydata.childElementCount + "MatName";
    cell.innerHTML = MatName;
    cell = row.insertCell();
    cell.id="M" + bodydata.childElementCount + "MatCode";
    cell.innerHTML = MatCode;
    cell = row.insertCell();
    cell.id="M" + bodydata.childElementCount + "ClassN";
    cell.innerHTML = ClassN;
    cell = row.insertCell();
    cell.id="M" + bodydata.childElementCount + "Note";
    cell.innerHTML = Note;
    row.appendChild(td=document.createElement('td'));
    var btb = document.createElement('input');
    btb.type = "button";
    btb.id="ButMat" + bodydata.childElementCount;
    btb.value = "تعديل";
    td.appendChild(btb)
    btb.style.cursor="pointer";
    btb.style.color="red";
    btb.onclick=function(){showdatarowsMat()};
    };
    function ShowDetailsMat(){
      ShowSelectForm("MatWi");
      document.getElementById("MatName").value="";
      document.getElementById("MatCode").value="";
      document.getElementById("MatClass").value="";
      document.getElementById("NoteMat").value="";
    }
  
    function showdatarowsMat() {
      let indextable= document.activeElement.parentElement.parentElement.id;
      let IndexRow =document.getElementById(indextable).children.item(0).textContent -1 ;
      ShowDetailsMat();
      document.getElementById("MatName").value=DataMat[IndexRow].MatName;
      document.getElementById("MatCode").value=DataMat[IndexRow].MatCode;
      document.getElementById("MatClass").value=DataMat[IndexRow].Class;
      document.getElementById("NoteMat").value=DataMat[IndexRow].Note;
      document.getElementById("RowMat").value=IndexRow +2 ;
    };
    // ********************ContractWi
function LoadContract(){
  DataContract=[];
  fetch(UrlContract)
  .then(res => res.text())
  .then(rep => {
      const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
      const colzUser = [];
      jsonData.table.cols.forEach((heading) => {
          if (heading.label) {
              let columnUser = heading.label;
              colzUser.push(columnUser);
          }
      })
      jsonData.table.rows.forEach((rowData) => {
          const rowUser = {};
          colzUser.forEach((ele, ind) => {
              rowUser[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
          })
          DataContract.push(rowUser);
      })
  })
}

function LoadSemester(){
  DataSemester=[];
  fetch(UrlSemester)
  .then(res => res.text())
  .then(rep => {
      const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
      const colzUser = [];
      jsonData.table.cols.forEach((heading) => {
          if (heading.label) {
              let columnUser = heading.label;
              colzUser.push(columnUser);
          }
      })
      jsonData.table.rows.forEach((rowData) => {
          const rowUser = {};
          colzUser.forEach((ele, ind) => {
              rowUser[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
          })
          DataSemester.push(rowUser);
      })
      LoadSemesterContract();
      loadWeaks();
  })
}
  function LoadSemesterContract(){
      let Num,ClassN;
      let optionContract;
      document.getElementById("SemesterCon").innerHTML="";
      document.getElementById("SemesterT").innerHTML="";
      document.getElementById("TableSemster").innerHTML="";
      for (let index = 0; index < DataSemester.length; index++) {
        ClassN=DataSemester[index].SemesterName
        Num=DataSemester[index].Number
        if(Num!="" ){
          optionContract=document.createElement("option");
          optionContract.value=ClassN;
          optionContract.textContent=ClassN;
          document.getElementById("SemesterCon").appendChild(optionContract);
          optionContract=document.createElement("option");
          optionContract.value=ClassN;
          optionContract.textContent=ClassN;
          document.getElementById("SemesterT").appendChild(optionContract);
          optionContract=document.createElement("option");
          optionContract.value=ClassN;
          optionContract.textContent=ClassN;
          document.getElementById("TableSemster").appendChild(optionContract);
        }
      }
    }
function loadWeaks(){
  let Num,ClassN,WeakN;
  let optionContract;
  document.getElementById("TableWeaks").innerHTML="";
  for (let index = 0; index < DataSemester.length; index++) {
    ClassN=DataSemester[index].SemesterName
    Num=DataSemester[index].Number
    WeakN=DataSemester[index].Duration
    if(Num!="" && ClassN==document.getElementById("TableSemster").value){
      document.getElementById("SDateT").value=GetDateFromString(DataSemester[index].StartS);
      for (let indexD = WeakN; indexD > 0; indexD--) {
      optionContract=document.createElement("option");
      optionContract.value=WeakN-indexD+1;
      optionContract.textContent=WeakN-indexD+1;
      document.getElementById("TableWeaks").appendChild(optionContract);
      }
      loadDateSWeak()
    }
  }
}
function loadDateSWeak(){
  let Num,ClassN,WeakN;
  let TableWeaks= document.getElementById("TableWeaks").value
  for (let index = 0; index < DataSemester.length; index++) {
    ClassN=DataSemester[index].SemesterName
    Num=DataSemester[index].Number
    WeakN=DataSemester[index].Duration
    if(Num!="" && ClassN==document.getElementById("TableSemster").value){
      document.getElementById("SDateT").value=GetDateFromStringPlas(DataSemester[index].StartS,TableWeaks * 7-7 );
      document.getElementById("EDateT").value=GetDateFromStringPlas(DataSemester[index].StartS, TableWeaks * 7+7 -7)
      }
  }
}
function GetDateFromStringPlas(Str,Val){
  let MM,DD,Dat;
  let ZZ=[];
  let SS=String(Str).substring(5,String(Str).length-1);
  ZZ=SS.split(",");
  if (ZZ[1]<9){ MM=0 + String(parseInt(ZZ[1]) + 1)}else{ MM=(parseInt(ZZ[1]) + 1)}
  if (ZZ[2]<9){ DD=0 + ZZ[2]}else{ DD=ZZ[2]}
  Dat=  new Date( ZZ[0] + "-" + MM + "-" + DD) 
  Dat.setDate(Dat.getDate() + Val)
  return  Dat.toISOString().slice(0, 10);
}
function IsfoundTeacherCon(Tteacher){
    for (let index = 0; index < DataTeachers.length; index++) {
      if(Tteacher==DataTeachers[index].FullName){
        return true;
      }
    }
      return false ;
  }
  function IsfoundMatCon(TMat){
    for (let index = 0; index < DataMat.length; index++) {
      if(TMat==DataMat[index].MatName && document.getElementById("ClassCon").value==DataMat[index].Class){
        return true;
      }
    }
      return false ;
  }
  function IsfoundMatCode(TCode){
    for (let index = 0; index < DataMat.length; index++) {
      if(TCode==DataMat[index].MatCode && document.getElementById("MatCon").value==DataMat[index].MatName){
        return true;
      }
    }
      return false ;
  }
function IstrueDataInformContract(){
  let NumCon=document.getElementById("NumCon");
  let DateCon=document.getElementById("DateCon");
  let TeacherCon=document.getElementById("TeacherCon");
  let ClassCon=document.getElementById("ClassCon");
  let MatCon=document.getElementById("MatCon");
  let CodeCon=document.getElementById("CodeCon");
  let CountStudents=document.getElementById("CountStudents");
  let SemesterCon=document.getElementById("SemesterCon");
  if(NumCon.value==""){NumCon.style.border="2px solid #ff0000";return false}else{NumCon.style.border="none";}
  if(DateCon.value==""){DateCon.style.border="2px solid #ff0000";return false}else{DateCon.style.border="none";}
  if(TeacherCon.value==""){TeacherCon.style.border="2px solid #ff0000";return false}else{TeacherCon.style.border="none";}
  if(IsfoundTeacherCon(TeacherCon.value)==false){TeacherCon.style.border="2px solid #ff0000";return false}else{TeacherCon.style.border="none";}
  if(ClassCon.value==""){ClassCon.style.border="2px solid #ff0000";return false}else{ClassCon.style.border="none";}
  if(MatCon.value==""){MatCon.style.border="2px solid #ff0000";return false}else{MatCon.style.border="none";}
  if(IsfoundMatCon(MatCon.value)==false){MatCon.style.border="2px solid #ff0000";return false}else{MatCon.style.border="none";}
  if(CodeCon.value==""){CodeCon.style.border="2px solid #ff0000";return false}else{CodeCon.style.border="none";}
  if(IsfoundMatCode(CodeCon.value)==false){CodeCon.style.border="2px solid #ff0000";return false}else{CodeCon.style.border="none";}
  if(CountStudents.value==""){CountStudents.style.border="2px solid #ff0000";return false}else{CountStudents.style.border="none";}
  if(SemesterCon.value==""){SemesterCon.style.border="2px solid #ff0000";return false}else{SemesterCon.style.border="none";}
  return true
}

function onsubmitFormContract1(){
  if(IstrueDataInformContract()===true){
        document.getElementById("ModeCon").value="New";
        onsubmitFormContract();
  }
}
function onsubmitFormContract2(){
  if(IstrueDataInformContract()===true){
      document.getElementById("ModeCon").value="Modified";
      onsubmitFormContract();
    }
}

function onsubmitFormContract3(){
  document.getElementById("ModeCon").value="Deleted"
  onsubmitFormContract();
}
function onsubmitFormContract(){
  let MainFormContract=document.getElementById("MainFormContract");
  var w = window.open('', 'form_target', 'width=600, height=400');
  MainFormContract.target = 'form_target';
  MainFormContract.action='https://script.google.com/macros/s/AKfycbzJo5dMZpcCVZ8UZBTEKyvmE7NhUsIFfHq8q5ZihmOnCA6zKXlcxrb2xVZ-TJc7aEt4/exec'
  MainFormContract.submit();
  if (MainFormContract.onsubmit()==true){
    const myTimeout = setTimeout(function(){ 
      const myTimeout1 = setTimeout(function(){ 
                w.close();
                clearTimeout(myTimeout)
                clearTimeout(myTimeout1)
                location.reload();
    }, 1000);}, 4000);
  }
} 
    // **************************ContractBrowser***********
    function LoadContractToTable(){
      let Num;
      document.getElementById("bodyContract").innerHTML=""
      for (let index = 0; index < DataContract.length; index++) {
        Num=DataContract[index].Number
        if(Num!=""){
          AddRowContract(Num,DataContract[index].NumCon,DataContract[index].DateCon,DataContract[index].TeacherCon,DataContract[index].ClassCon,DataContract[index].MatName)
        }
      }
    }
    
    function AddRowContract(Num,NumCon,DateCon,TeacherCon,ClassCon,MatName) {
      let bodydata=document.getElementById("bodyContract");
      let row = bodydata.insertRow();
      row.id="C" + bodydata.childElementCount;
      let cell = row.insertCell();
      cell.id="C" + bodydata.childElementCount + "Num";
      cell.innerHTML = Num;
      cell = row.insertCell();
      cell.id="C" + bodydata.childElementCount + "NumCon";
      cell.innerHTML = NumCon;
      cell = row.insertCell();
      cell.id="C" + bodydata.childElementCount + "DateCon";
      cell.innerHTML =GetDateFromString(DateCon)
      cell = row.insertCell();
      cell.id="C" + bodydata.childElementCount + "TeacherCon";
      cell.innerHTML = TeacherCon;
      cell = row.insertCell();
      cell.id="C" + bodydata.childElementCount + "ClassCon";
      cell.innerHTML = ClassCon
      cell = row.insertCell();
      cell.id="C" + bodydata.childElementCount + "MatName";
      cell.innerHTML = MatName;
      row.appendChild(td=document.createElement('td'));
      var btb = document.createElement('input');
      btb.type = "button";
      btb.id="ButCon" + bodydata.childElementCount;
      btb.value = "تعديل";
      td.appendChild(btb)
      btb.style.cursor="pointer";
      btb.style.color="red";
      btb.onclick=function(){showdatarowsCon()};
      };
      function ShowDetailsCon(){
        ShowSelectForm("ContractWi");
        document.getElementById("DateCon").value="";
        document.getElementById("ClassCon").value="";
        document.getElementById("CodeCon").value="";
        document.getElementById("NoteCon").value="";
        document.getElementById("NumCon").value="";
        document.getElementById("TeacherCon").value="";
        document.getElementById("MatCon").value="";
        document.getElementById("CountStudents").value="";
        document.getElementById("SemesterCon").value="";
      }
      function GetDateFromString(Str){
        let MM,DD;
        let ZZ=[];
        let SS=String(Str).substring(5,String(Str).length-1);
        ZZ=SS.split(",");
        if (Number(ZZ[1])<9 && Number(ZZ[1]).length!= 2){ MM=0 + String(parseInt(ZZ[1]) + 1)}else{ MM=(parseInt(ZZ[1]) + 1)}
        if (Number(ZZ[2])<=9 && Number(ZZ[1]).length!= 2){ DD=0 + ZZ[2]}else{ DD=ZZ[2]}
        return ZZ[0] + "-" + MM + "-" + DD
      }
      function showdatarowsCon() {
        let indextable= document.activeElement.parentElement.parentElement.id;
        let IndexRow =document.getElementById(indextable).children.item(0).textContent -1 ;
        ShowDetailsCon();
        document.getElementById("NumCon").value=DataContract[IndexRow].NumCon;
        document.getElementById("DateCon").value=GetDateFromString(DataContract[IndexRow].DateCon);
        document.getElementById("TeacherCon").value=DataContract[IndexRow].TeacherCon;
        document.getElementById("ClassCon").value=DataContract[IndexRow].ClassCon;
        document.getElementById("MatCon").value=DataContract[IndexRow].MatName;
        document.getElementById("CodeCon").value=DataContract[IndexRow].CodeCon;
        document.getElementById("CountStudents").value=DataContract[IndexRow].CountStudents;
        document.getElementById("SemesterCon").value=DataContract[IndexRow].SemesterCon;
        document.getElementById("NoteCon").value=DataContract[IndexRow].Note;
        document.getElementById("RowCon").value=IndexRow +2 ;
      };
          // ********************StudentWi
function LoadStudent(){
  DataStudent=[];
  fetch(UrlStudent)
  .then(res => res.text())
  .then(rep => {
      const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
      const colzUser = [];
      jsonData.table.cols.forEach((heading) => {
          if (heading.label) {
              let columnUser = heading.label;
              colzUser.push(columnUser);
          }
      })
      jsonData.table.rows.forEach((rowData) => {
          const rowUser = {};
          colzUser.forEach((ele, ind) => {
              rowUser[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
          })
          DataStudent.push(rowUser);
      })
  })
}

function IstrueDataInformStudent(){
  let StudentName=document.getElementById("StudentName");
  let FatherName=document.getElementById("FatherName");
  let BornDate=document.getElementById("BornDate");
  let SGender=document.getElementById("SGender");
  let PhoneParents=document.getElementById("PhoneParents");
  let EmailParents=document.getElementById("EmailParents");
  let SClass=document.getElementById("SClass");
  let SSection=document.getElementById("SSection");
  if(StudentName.value==""){StudentName.style.border="2px solid #ff0000";return false}else{StudentName.style.border="none";}
  if(FatherName.value==""){FatherName.style.border="2px solid #ff0000";return false}else{FatherName.style.border="none";}
  if(BornDate.value==""){BornDate.style.border="2px solid #ff0000";return false}else{BornDate.style.border="none";}
  if(SGender.value==""){SGender.style.border="2px solid #ff0000";return false}else{SGender.style.border="none";}
  if(PhoneParents.value==""){PhoneParents.style.border="2px solid #ff0000";return false}else{PhoneParents.style.border="none";}  // if(IsfoundMatCon(MatCon.value)==false){MatCon.style.border="2px solid #ff0000";return false}else{MatCon.style.border="none";}
  if(EmailParents.value==""){EmailParents.style.border="2px solid #ff0000";return false}else{EmailParents.style.border="none";}  // if(IsfoundMatCode(CodeCon.value)==false){CodeCon.style.border="2px solid #ff0000";return false}else{CodeCon.style.border="none";}
  if(SClass.value==""){SClass.style.border="2px solid #ff0000";return false}else{SClass.style.border="none";}
  if(SSection.value==""){SSection.style.border="2px solid #ff0000";return false}else{SSection.style.border="none";}
  return true
}

function onsubmitFormStudent1(){
  if(IstrueDataInformStudent()===true){
        document.getElementById("ModeStudent").value="New";
        onsubmitFormStudent();
  }
}
function onsubmitFormStudent2(){
  if(IstrueDataInformStudent()===true){
      document.getElementById("ModeStudent").value="Modified";
      onsubmitFormStudent();
    }
}

function onsubmitFormStudent3(){
  document.getElementById("ModeStudent").value="Deleted"
  onsubmitFormStudent();
}
function onsubmitFormStudent(){
  let MainFormStudent=document.getElementById("MainFormStudent");
  var w = window.open('', 'form_target', 'width=600, height=400');
  MainFormStudent.target = 'form_target';
  MainFormStudent.action='https://script.google.com/macros/s/AKfycbwSP9sXHtivgqgNVBnsSS6sXEnewelu39QA_Keb0nVsFOkqmbSkTWxIRloKO1nSGs-c/exec'
  MainFormStudent.submit();
  if (MainFormStudent.onsubmit()==true){
    const myTimeout = setTimeout(function(){ 
      const myTimeout1 = setTimeout(function(){ 
                w.close();
                clearTimeout(myTimeout)
                clearTimeout(myTimeout1)
                location.reload();
    }, 1000);}, 4000);
  }
} 
// **************************StudentBrowser***********
function LoadStudentToTable(){
let Num;
document.getElementById("bodyStudent").innerHTML=""
for (let index = 0; index < DataStudent.length; index++) {
Num=DataStudent[index].Number
if(Num!=""){
AddRowStudent(Num,DataStudent[index].StudentName,DataStudent[index].FatherName,DataStudent[index].PhoneParents,DataStudent[index].SClass,DataStudent[index].SSection)
}
}
}

function AddRowStudent(Num,StudentName,FatherName,PhoneParents,SClass,SSection) {
let bodydata=document.getElementById("bodyStudent");
let row = bodydata.insertRow();
row.id="ST" + bodydata.childElementCount;
let cell = row.insertCell();
cell.id="ST" + bodydata.childElementCount + "Num";
cell.innerHTML = Num;
cell = row.insertCell();
cell.id="ST" + bodydata.childElementCount + "StudentName";
cell.innerHTML = StudentName;
cell = row.insertCell();
cell.id="ST" + bodydata.childElementCount + "FatherName";
cell.innerHTML =FatherName
cell = row.insertCell();
cell.id="ST" + bodydata.childElementCount + "PhoneParents";
cell.innerHTML = PhoneParents;
cell = row.insertCell();
cell.id="ST" + bodydata.childElementCount + "SClass";
cell.innerHTML = SClass
cell = row.insertCell();
cell.id="ST" + bodydata.childElementCount + "SSection";
cell.innerHTML = SSection;
row.appendChild(td=document.createElement('td'));
var btb = document.createElement('input');
btb.type = "button";
btb.id="ButStudent" + bodydata.childElementCount;
btb.value = "تعديل";
td.appendChild(btb)
btb.style.cursor="pointer";
btb.style.color="red";
btb.onclick=function(){showdatarowsStu()};
};
function ShowDetailsStudent(){
ShowSelectForm("StudentWi");
document.getElementById("StudentName").value="";
document.getElementById("BornDate").value="";
document.getElementById("PhoneParents").value="";
document.getElementById("SClass").value="";
document.getElementById("NoteStudent").value="";
document.getElementById("FatherName").value="";
document.getElementById("SGender").value="";
document.getElementById("EmailParents").value="";
document.getElementById("SSection").value="";
}


function showdatarowsStu() {
let indextable= document.activeElement.parentElement.parentElement.id;
let IndexRow =document.getElementById(indextable).children.item(0).textContent -1 ;
ShowDetailsStudent();
document.getElementById("StudentName").value=DataStudent[IndexRow].StudentName;
document.getElementById("BornDate").value=GetDateFromString(DataStudent[IndexRow].BornDate);
document.getElementById("PhoneParents").value=DataStudent[IndexRow].PhoneParents;
document.getElementById("NoteStudent").value=DataStudent[IndexRow].Note;
document.getElementById("FatherName").value=DataStudent[IndexRow].FatherName;
document.getElementById("SGender").value=DataStudent[IndexRow].SGender;
document.getElementById("EmailParents").value=DataStudent[IndexRow].EmailParents;
document.getElementById("SClass").value=DataStudent[IndexRow].SClass;
LoadOptionStudent()
document.getElementById("SSection").value=DataStudent[IndexRow].SSection;
document.getElementById("RowStudent").value=IndexRow +2 ;
};
// ********************TableWi
function LoadTable(){
DataTable=[];
fetch(UrlTable)
.then(res => res.text())
.then(rep => {
const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
const colzUser = [];
jsonData.table.cols.forEach((heading) => {
    if (heading.label) {
        let columnUser = heading.label;
        colzUser.push(columnUser);
    }
})
jsonData.table.rows.forEach((rowData) => {
    const rowUser = {};
    colzUser.forEach((ele, ind) => {
        rowUser[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
    })
    DataTable.push(rowUser);
})
})
}
function LoadPeriod(){
  DataPeriod=[];
  fetch(UrlPeriod)
  .then(res => res.text())
  .then(rep => {
  const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
  const colzUser = [];
  jsonData.table.cols.forEach((heading) => {
      if (heading.label) {
          let columnUser = heading.label;
          colzUser.push(columnUser);
      }
  })
  jsonData.table.rows.forEach((rowData) => {
      const rowUser = {};
      colzUser.forEach((ele, ind) => {
          rowUser[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
      })
      DataPeriod.push(rowUser);
  })
  LoadPeriodToPeriod();
  })
  }
  function LoadPeriodToPeriod(){
    let Num,ClassN;
    let optionContract;
    document.getElementById("Period").innerHTML="";
    document.getElementById("HeadEnd").innerHTML="";
    optionContract=document.createElement("th");
    optionContract.value="اليوم/الحصة";
    optionContract.textContent="اليوم/الحصة";
    document.getElementById("HeadEnd").appendChild(optionContract);
    optionContract=document.createElement("th");
    optionContract.value="التاريخ";
    optionContract.textContent="التاريخ";
    document.getElementById("HeadEnd").appendChild(optionContract);
    for (let index = 0; index < DataPeriod.length; index++) {
      ClassN=DataPeriod[index].PeriodName
      Num=DataPeriod[index].Number
      if(Num!="" ){
        optionContract=document.createElement("option");
        optionContract.value=ClassN;
        optionContract.textContent=ClassN;
        document.getElementById("Period").appendChild(optionContract);
        optionContract=document.createElement("th");
        optionContract.value=ClassN;
        optionContract.textContent=ClassN;
        document.getElementById("HeadEnd").appendChild(optionContract);
      }
    }
  }
  
function IsfoundTeacherTab(Tteacher){
    for (let index = 0; index < DataTeachers.length; index++) {
      if(Tteacher==DataTeachers[index].FullName){
        return true;
      }
    }
      return false ;
  }
  function IsfoundMatTab(TMat){
    for (let index = 0; index < DataMat.length; index++) {
      if(TMat==DataMat[index].MatName && document.getElementById("ClassCon").value==DataMat[index].Class){
        return true;
      }
    }
      return false ;
  }

function IstrueDataInformTable(){
let SemesterT=document.getElementById("SemesterT");
let DayT=document.getElementById("DayT");
let DateT=document.getElementById("DateT");
let Period=document.getElementById("Period");
let MatT=document.getElementById("MatT");
let ClassT=document.getElementById("ClassT");
let TeacherT=document.getElementById("TeacherT");
let SectionT=document.getElementById("SectionT");
if(SemesterT.value==""){SemesterT.style.border="2px solid #ff0000";return false}else{SemesterT.style.border="none";}
if(DayT.value==""){DayT.style.border="2px solid #ff0000";return false}else{DayT.style.border="none";}
if(DateT.value==""){DateT.style.border="2px solid #ff0000";return false}else{DateT.style.border="none";}
if(Period.value==""){Period.style.border="2px solid #ff0000";return false}else{Period.style.border="none";}
if(MatT.value==""){MatT.style.border="2px solid #ff0000";return false}else{MatT.style.border="none";}  
if(IsfoundMatTab(MatT.value)==false){MatT.style.border="2px solid #ff0000";return false}else{MatT.style.border="none";}  
if(ClassT.value==""){ClassT.style.border="2px solid #ff0000";return false}else{ClassT.style.border="none";} 
if(TeacherT.value==""){TeacherT.style.border="2px solid #ff0000";return false}else{TeacherT.style.border="none";}
if(IsfoundTeacherTab(TeacherT.value)==false){TeacherT.style.border="2px solid #ff0000";return false}else{TeacherT.style.border="none";}
if(SectionT.value==""){SectionT.style.border="2px solid #ff0000";return false}else{SectionT.style.border="none";}
return true
}

function onsubmitFormTable1(){
if(IstrueDataInformTable()===true){
  document.getElementById("ModeTable").value="New";
  onsubmitFormTable();
}
}
function onsubmitFormTable2(){
if(IstrueDataInformTable()===true){
document.getElementById("ModeTable").value="Modified";
onsubmitFormTable();
}
}

function onsubmitFormTable3(){
document.getElementById("ModeTable").value="Deleted"
onsubmitFormTable();
}
function onsubmitFormTable(){
let MainFormTable=document.getElementById("MainFormTable");
var w = window.open('', 'form_target', 'width=600, height=400');
MainFormTable.target = 'form_target';
MainFormTable.action='https://script.google.com/macros/s/AKfycbz9OhIvYjKoIXtuCahUnHTl_uWTGpYDIj-bPHfB91QUrW4ajbpjW98AR4dtyJDdQeD8uA/exec'
MainFormTable.submit();
if (MainFormTable.onsubmit()==true){
const myTimeout = setTimeout(function(){ 
const myTimeout1 = setTimeout(function(){ 
          w.close();
          clearTimeout(myTimeout)
          clearTimeout(myTimeout1)
          location.reload();
}, 2000);}, 4000);
}
} 
function SelectDay(){
  let Dat=new Date( document.getElementById("DateT").value)
  document.getElementById("DayT").value=GetDayName(Dat.getUTCDay())
}
function GetDayName(Dat){
  switch (Dat) {
    case 0:
    return "الاحد";
    case 1:
    return "الاثنين";
    case 2:
    return "الثلاثاء";
    case 3:
    return "الاربعاء";
    case 4:
    return "الخميس";
    case 5:
    return "الجمعة";
    case 6:
      return "السبت";
    }
}
// **************************TableBrowser***********
function LoadTableToTable(){
let Num ,KeyS,ValueS;
ValueS=document.getElementById("TableSearch").value
document.getElementById("bodyTable").innerHTML=""
for (let index = 0; index < DataTable.length; index++) {
  Num=DataTable[index].Number
  switch (document.getElementById("TableSearT").value) {
    case "اليوم":
      KeyS=DataTable[index].DayT
    break;
    case "الفصل":
      KeyS=DataTable[index].SemesterT
    break;
    case "التاريخ":
      KeyS=DataTable[index].DateT
    break; 
    case "المعلم":
      KeyS=DataTable[index].TeacherT
    break; 
    case "المادة":
      KeyS=DataTable[index].MatT
    break; 
    case "الصف":
      KeyS=DataTable[index].ClassT
    break;
    case "الشعبة":
      KeyS=DataTable[index].SectionT
    break;
}
if (ValueS!=""){
  if(Num!="" && KeyS==ValueS){
    AddRowTable(Num,DataTable[index].SemesterT, DataTable[index].DayT,DataTable[index].DateT,DataTable[index].TeacherT,DataTable[index].MatT,DataTable[index].ClassT,DataTable[index].SectionT)
  }
}else{
  if(Num!=""){
    AddRowTable(Num,DataTable[index].SemesterT, DataTable[index].DayT,DataTable[index].DateT,DataTable[index].TeacherT,DataTable[index].MatT,DataTable[index].ClassT,DataTable[index].SectionT)
  }
}
}}
function AddRowTable(Num,SemesterT,DayT,DateT,TeacherT,MatT,ClassT,SectionT) {
let bodydata=document.getElementById("bodyTable");
let row = bodydata.insertRow();
row.id="Tab" + bodydata.childElementCount;
let cell = row.insertCell();
cell.id="Tab" + bodydata.childElementCount + "Num";
cell.innerHTML = Num;
cell = row.insertCell();
cell.id="Tab" + bodydata.childElementCount + "SemesterT";
cell.innerHTML = SemesterT;
cell = row.insertCell();
cell.id="Tab" + bodydata.childElementCount + "DayT";
cell.innerHTML =DayT
cell = row.insertCell();
cell.id="Tab" + bodydata.childElementCount + "DateT";
cell.innerHTML = GetDateFromString(DateT);
cell = row.insertCell();
cell.id="Tab" + bodydata.childElementCount + "TeacherT";
cell.innerHTML = TeacherT
cell = row.insertCell();
cell.id="Tab" + bodydata.childElementCount + "MatT";
cell.innerHTML = MatT;
cell = row.insertCell();
cell.id="Tab" + bodydata.childElementCount + "ClassT";
cell.innerHTML = ClassT;
cell = row.insertCell();
cell.id="Tab" + bodydata.childElementCount + "SectionT";
cell.innerHTML = SectionT;
row.appendChild(td=document.createElement('td'));
var btb = document.createElement('input');
btb.type = "button";
btb.id="ButTab" + bodydata.childElementCount;
btb.value = "تعديل";
td.appendChild(btb)
btb.style.cursor="pointer";
btb.style.color="red";
btb.onclick=function(){showdatarowsTable()};
};
function ShowDetailsTable(){
  ShowSelectForm("TableWi");
  document.getElementById("SemesterT").value="";
  document.getElementById("DayT").value="";
  document.getElementById("DateT").value="";
  document.getElementById("Period").value="";
  document.getElementById("MatT").value="";
  document.getElementById("ClassT").value="";
  document.getElementById("TeacherT").value="";
  document.getElementById("SectionT").value="";
  document.getElementById("NoteTable").value="";
}

function showdatarowsTable() {
  let indextable= document.activeElement.parentElement.parentElement.id;
  let IndexRow =document.getElementById(indextable).children.item(0).textContent -1 ;
  ShowDetailsTable();
  document.getElementById("SemesterT").value=DataTable[IndexRow].SemesterT;
  document.getElementById("DayT").value=DataTable[IndexRow].DayT;
  document.getElementById("DateT").value=GetDateFromString(DataTable[IndexRow].DateT);
  document.getElementById("Period").value=DataTable[IndexRow].Period;
  document.getElementById("MatT").value=DataTable[IndexRow].MatT;
  document.getElementById("ClassT").value=DataTable[IndexRow].ClassT;
  LoadOptionTable();
  document.getElementById("TeacherT").value=DataTable[IndexRow].TeacherT;
  document.getElementById("SectionT").value=DataTable[IndexRow].SectionT;
  document.getElementById("NoteTable").value=DataTable[IndexRow].Note;
  document.getElementById("RowTable").value=IndexRow +2 ;
};
// **************************TableEnd***********
function LoadEndToTable(){
let bodydata=document.getElementById("bodyEnd");
bodydata.innerHTML=""
let TableTeacher=document.getElementById("TableTeacher").value;
let TableSemster=document.getElementById("TableSemster").value;
let SDateT=document.getElementById("SDateT").value;
let EDateT=document.getElementById("EDateT").value;
let Num ,SemesterT,TeacherT,DateT,MatT,ClassT,SectionT;
let Start=new Date(SDateT)
let EndS=new Date(EDateT)
const diffTime = Math.abs(EndS - Start);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
for (let indexZ = 0; indexZ <= diffDays; indexZ++) {
if(indexZ == 0){Start=Math.abs( Start.valueOf()) }else{    Start=Math.abs( Start.valueOf() +  1000 *60 *60 *24)}
var Start1=new Date(Start)
var Start2=Start1.toISOString().slice(0, 10);
let row = bodydata.insertRow();
row.id="Row" + bodydata.childElementCount;
let cell = row.insertCell();
cell.id="Cell" + bodydata.childElementCount + "DayT";
cell.innerHTML = GetDayName(Start1.getUTCDay());
cell = row.insertCell();
cell.id="Cell" + bodydata.childElementCount + "DateT";
cell.innerHTML = Start2;
for (let indexP1 = 0; indexP1 < DataPeriod.length; indexP1++) {
cell = row.insertCell();
cell.id="R" + bodydata.childElementCount + "C" +indexP1;
}
for (let index = 0; index < DataTable.length; index++) {
SemesterT=DataTable[index].SemesterT;
TeacherT=DataTable[index].TeacherT;
MatT=DataTable[index].MatT;
ClassT=DataTable[index].ClassT;
SectionT=DataTable[index].SectionT;
DateT=GetDateFromString( DataTable[index].DateT);
if(TableSemster==SemesterT && TableTeacher==TeacherT && DateT==Start2 ){
for (let indexP = 0; indexP < DataPeriod.length; indexP++) {
if(DataPeriod[indexP].PeriodName==DataTable[index].Period){
var CellT=document.getElementById("R" + bodydata.childElementCount + "C" +indexP)
CellT.innerHTML = "مادة "+MatT + " صف "+ClassT + " شعبة "+SectionT;
CellT.className="CellRow"
}}}}}
}

function LoadEndToTableSection(){
  let bodydata=document.getElementById("bodyEnd");
  bodydata.innerHTML=""
  let TableSection=document.getElementById("TableSection").value;
  let TableSectionA=[];
   TableSectionA=TableSection.split("/")
   let  TableSectionC=TableSectionA[0];
   let  TableSectionS=TableSectionA[1];
  let TableSemster=document.getElementById("TableSemster").value;
  let SDateT=document.getElementById("SDateT").value;
  let EDateT=document.getElementById("EDateT").value;
  let Num ,SemesterT,TeacherT,DateT,MatT,ClassT,SectionT;
  let Start=new Date(SDateT)
  let EndS=new Date(EDateT)
const diffTime = Math.abs(EndS - Start);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  for (let indexZ = 0; indexZ <= diffDays; indexZ++) {
    if(indexZ == 0){Start=Math.abs( Start.valueOf()) }else{    Start=Math.abs( Start.valueOf() +  1000 *60 *60 *24)}
    var Start1=new Date(Start)
    var Start2=Start1.toISOString().slice(0, 10);
    let row = bodydata.insertRow();
    row.id="Row" + bodydata.childElementCount;
    let cell = row.insertCell();
    cell.id="Cell" + bodydata.childElementCount + "DayT";
    cell.innerHTML = GetDayName(Start1.getUTCDay());
      cell = row.insertCell();
    cell.id="Cell" + bodydata.childElementCount + "DateT";
    cell.innerHTML = Start2;
    for (let indexP1 = 0; indexP1 < DataPeriod.length; indexP1++) {
      cell = row.insertCell();
      cell.id="R" + bodydata.childElementCount + "C" +indexP1;
    }
  for (let index = 0; index < DataTable.length; index++) {
    SemesterT=DataTable[index].SemesterT;
    TeacherT=DataTable[index].TeacherT;
    MatT=DataTable[index].MatT;
    ClassT=DataTable[index].ClassT;
    SectionT=DataTable[index].SectionT;
    DateT=GetDateFromString( DataTable[index].DateT);
    if(TableSemster==SemesterT && TableSectionC==ClassT  && TableSectionS==SectionT && DateT==Start2 ){
      for (let indexP = 0; indexP < DataPeriod.length; indexP++) {
      if(DataPeriod[indexP].PeriodName==DataTable[index].Period){
        var CellT=document.getElementById("R" + bodydata.childElementCount + "C" +indexP)
        CellT.innerHTML = "مادة "+MatT + " المعلم "+TeacherT ;
        CellT.className="CellRow"
      }
      }
    }
  }
  }
}

function ChangeMode(){
  let TableSelect=document.getElementById("TableSelect").value
  let TableTeacher=document.getElementById("TableTeacher")
  let TableSection=document.getElementById("TableSection")
  if (TableSelect==1){
    TableTeacher.style.display="block"
    TableSection.style.display="none"
  }else{
    TableTeacher.style.display="none"
    TableSection.style.display="block"
  }
}
