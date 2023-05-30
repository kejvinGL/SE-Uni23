function showFunc(f) {
    if (f == 'c') {
        document.getElementById("submitComplaint").style.display = "flex"
        document.getElementById("applyInternship").style.display = "none"
    }
    else if (f == 'i') {
        document.getElementById("applyInternship").style.display = "flex"
        document.getElementById("submitComplaint").style.display = "none"
    }
}