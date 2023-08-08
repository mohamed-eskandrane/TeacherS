const sheetId = '1SRR-wnYTPiuZ5xQC3cjbHafmm5o3ZB_Om7eljPJUmoU';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const Teachers = 'Teachers';
let query = encodeURIComponent('Select *');
let UrlTeachers = `${base}&sheet=${Teachers}&tq=${query}`;
let DataTeachers = [];

document.addEventListener('DOMContentLoaded', init)
function init() {
  ConvertMode();
  LoadTeachers();
  if (typeof(Storage) !== "undefined") {
    if( localStorage.getItem("PassWord")!==null){
      document.getElementById("Teacher_PassWord").value=localStorage.getItem("PassWord");
    }
  }
}
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
      
  })
}

 function ConvertMode(){
  if (localStorage.getItem("TFColor")==1){
    ConvertModeToSun();
  }else{
    ConvertModeToMoon();
  }
 }

function ConvertModeToSun(){
  localStorage.setItem("TFColor", 1);
  document.getElementById("Moon1").style.display="inline-block";
  document.getElementById("Sun1").style.display="none";
  document.querySelector(':root').style.setProperty('--FColor', "wheat"); 
  document.querySelector(':root').style.setProperty('--EColor', "white");
  document.querySelector(':root').style.setProperty('--loginColor', "whitesmoke"); 
  document.querySelector(':root').style.setProperty('--FontColor', "#f2a20b"); 
  document.querySelector(':root').style.setProperty('--Font2Color', "#a53333"); 
  document.querySelector(':root').style.setProperty('--Font3Color', "#a53333"); 
} 
function ConvertModeToMoon(){
  localStorage.setItem("TFColor", 2);
  document.getElementById("Sun1").style.display="inline-block";
  document.getElementById("Moon1").style.display="none";
  document.querySelector(':root').style.setProperty('--FColor', "#141e30"); 
  document.querySelector(':root').style.setProperty('--EColor', "#243b55");
  document.querySelector(':root').style.setProperty('--loginColor', "#00000080"); 
  document.querySelector(':root').style.setProperty('--FontColor', "white"); 
  document.querySelector(':root').style.setProperty('--Font2Color', "#d3f6f8"); 
  document.querySelector(':root').style.setProperty('--Font3Color', "black"); 
}  


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
    window.location.assign("https://maininteachers.blogspot.com/");
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

