
function selectFunction() {
  let f = document.getElementById("dropdown").value;
  // if dropdown value is student redirect to student.ejs
  if (f === "student") {
    document.getElementById("sForm").style.display = "flex";
    document.getElementById("aForm").style.display = "none";
  } else if (f === "admin") {
    document.getElementById("sForm").style.display = "none";
    document.getElementById("aForm").style.display = "flex";
  }
  else {
    document.getElementById("sForm").style.display = "none";
    document.getElementById("aForm").style.display = "none";
  }


}
function alert(status) {
  if (status == 0) {
    document.getElementById("alert").style.display = block;

  }
}
