function showFunc(f) {
    if (f == 's') {
        document.getElementById("addStudent").style.display = "flex"
        document.getElementById("complaints").style.display = "none"
        document.getElementById("addInternship").style.display = "none"
    }
    else if (f == 'c') {
        document.getElementById("addStudent").style.display = "none"
        document.getElementById("complaints").style.display = "flex"
        document.getElementById("addInternship").style.display = "none"
    }
    else if (f == 'i') {
        document.getElementById("addStudent").style.display = "none"
        document.getElementById("complaints").style.display = "none"
        document.getElementById("addInternship").style.display = "flex"
    }
    else {
        document.getElementById("addStudent").style.display = "none"
        document.getElementById("complaints").style.display = "none"
        document.getElementById("addStudent").style.display = "none"
    }

}
function resolveTable() {
    // Update the table with the new data
    const complaints = data.complaints;
    let tableHTML = "";
    complaints.forEach(complaint => {
        tableHTML += `
            <tr>
              <td>${complaint.id}</td>
              <td>${complaint.category}</td>
              <td>${complaint.description}</td>
            </tr>
          `
    });
    complaintsTable.innerHTML = tableHTML;
}
