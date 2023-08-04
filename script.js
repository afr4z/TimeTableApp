
let batch = 1;
let inEdit = false;
let sem = 1;
function validateForm() {
  let courseName = document.getElementById("course" + batch).value;
  let slot = document.getElementById("slot" + batch).value;
  if (slot == "F" || slot == "G" || slot == "H")
    slot += batch;
  let checked = document.getElementById("Plus" + batch);
  let slots = document.getElementsByClassName(slot);

  let slotsPlus = document.getElementsByClassName(slot + "+");
  for (var i = 0; i < slots.length; i++)
    slots[i].innerHTML = courseName;
  if (checked.checked)
    for (var i = 0; i < slotsPlus.length; i++)
      slotsPlus[i].innerHTML = courseName + "(+)";
  document.getElementById("course" + batch).value = "";
  document.getElementById("slot" + batch).value = "A" + batch;
  checked.checked = false;
}

//function for editing each cell induvidually
function addText() {
  if (this.classList[0] == "lunch" || this.classList[0] == "top" || this.classList[0] == "side" || inEdit)
    return;
  inEdit = true;
  var input = document.createElement("input");
  input.value = this.innerHTML;
  input.size = 8;
  this.innerHTML = "";
  this.appendChild(input);
  input.focus();
  input.addEventListener("focusout", () => {
    input.parentElement.innerHTML = input.value;
    input.remove();
    inEdit = false;
  });
  input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      input.parentElement.innerHTML = input.value;
      input.remove();
      inEdit = false;
    }
  });
}


function exportpdf() {
  var source = '#table1';
  if (batch == 2) {
    source = '#table2';
  }

  var doc = new jsPDF('l', 'pt', 'a4');
  var htmlstring = '';
  var tempVarToCheckPageHeight = 0;
  var pageHeight = 0;
  pageHeight = doc.internal.pageSize.height;
  specialElementHandlers = {
    // element with id of "bypass" - jQuery style selector  
    '#bypassme': function(element, renderer) {
      // true = "handled elsewhere, bypass text extraction"  
      return true
    }
  };
  margins = {
    top: 150,
    bottom: 60,
    left: 20,
    right: 20,
    width: 600
  };
  var y = 20;
  doc.setLineWidth(2);
  doc.autoTable({
    html: source,  //sets the id of the table to be downloaded
    startY: 70,
    theme: 'grid',
    columnStyles: {
      0: {
        cellWidth: 75,
      },
      1: {
        cellWidth: 70,
      },
      2: {
        cellWidth: 70,
      },
      3: {
        cellWidth: 70,
      },
      4: {
        cellWidth: 70,
      },
      5: {
        cellWidth: 70,
      },
      6: {
        cellWidth: 70,
        halign: "center",
        valign: 'middle'
      },
      7: {
        cellWidth: 70,
      },
      8: {
        cellWidth: 70,
      },
      9: {
        cellWidth: 70,
      },
      10: {
        cellWidth: 70,
      },
      11: {
        cellWidth: 70,
      }
    },
    styles: {
      minCellHeight: 40
    }
  })
  doc.save('output.pdf');
}

document.querySelectorAll("td").forEach(e => e.addEventListener("click", addText));


//event handler for submit button
var btn = document.getElementById("submitbtn1");
btn.addEventListener("click", validateForm);
document.getElementById("submitbtn2").addEventListener("click", validateForm);

//event handler for pdf download button
var pdfbtn = document.getElementById("pdfdownload");
pdfbtn.addEventListener("click", exportpdf);

//event handler for switching between batches
document.getElementById("batchChange").addEventListener("click", () => {
  document.getElementById("batch" + batch).style.display = "none";
  batch == 1 ? batch = 2 : batch = 1;
  document.getElementById("batch" + batch).style.display = "flex";
});

document.getElementById("semChange").addEventListener("click", () => {
  if (sem === 1) {
    document.getElementById("sem1").style.display = "none";
    document.getElementById("sem2").style.display = "flex";
  } else if (sem === 2) {
    document.getElementById("sem2").style.display = "none";
    document.getElementById("sem1").style.display = "flex";
  }

  document.getElementById("sem" + sem).style.display = "none";
  sem == 1 ? sem = 2 : sem = 1;
  document.getElementById("sem" + sem).style.display = "flex";
});

function generateUUID() { // Public Domain/MIT
  var d = new Date().getTime();//Timestamp
  var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16;//random number between 0 and 16
    if (d > 0) {//Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {//Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}
function getFormattedDate() {
  const date = new Date();
  var s = "";
  s += date.getFullYear();

  if (sem === 1) {
    // If the semester is 1 (January), use the current month value
    if (Math.floor((date.getMonth() + 1) / 10) === 0)
      s += "0";
    s += date.getMonth() + 1;
  } else if (sem === 2) {
    // If the semester is 2 (August), use the value 8 for August
    if (Math.floor(8 / 10) === 0)
      s += "0";
    s += "08"; // Set the month to August (8)
  }

  if (Math.floor(date.getDate() / 10) === 0)
    s += "0";
  s += date.getDate();
  s += "T";
  if (Math.floor(date.getHours() / 10) === 0)
    s += "0";
  s += date.getHours();
  if (Math.floor(date.getMinutes() / 10) === 0)
    s += "0";
  s += date.getMinutes();
  if (Math.floor(date.getSeconds() / 10) === 0)
    s += "0";
  s += date.getSeconds();
  return s;
}


function getStart(t) {
  var s = "";
  if (sem == 1) {
    s += "202301";

    switch (t[2]) {
      case "SU": s += "01";
        break;
      case "MO": s += "02";
        break;
      case "TU": s += "03";
        break;
      case "WE": s += "04";
        break;
      case "TH": s += "05";
        break;
      case "FR": s += "06";
        break;
      case "SA": s += "07";
        break;
    }
    s += "T" + t[0] + "0000";
    return s;
  }
  else {
    s += "202308";

    switch (t[2]) {
      case "SU": s += "06";
        break;
      case "MO": s += "07";
        break;
      case "TU": s += "01";
        break;
      case "WE": s += "02";
        break;
      case "TH": s += "03";
        break;
      case "FR": s += "04";
        break;
      case "SA": s += "05";
        break;
    }
    s += "T" + t[0] + "0000";
    return s;
  }

}

function getEnd(t) {
  var s = "";
  if (sem == 1) {
    s += "202301";
    switch (t[2]) {
      case "SU": s += "01";
        break;
      case "MO": s += "02";
        break;
      case "TU": s += "03";
        break;
      case "WE": s += "04";
        break;
      case "TH": s += "05";
        break;
      case "FR": s += "06";
        break;
      case "SA": s += "07";
        break;
    }
    s += "T" + t[1].split(":")[0] + "5000";
    return s;
  }

  else {
    s += "202308";

    switch (t[2]) {
      case "SU": s += "06";
        break;
      case "MO": s += "07";
        break;
      case "TU": s += "01";
        break;
      case "WE": s += "02";
        break;
      case "TH": s += "03";
        break;
      case "FR": s += "04";
        break;
      case "SA": s += "05";
        break;
    }
    s += "T" + t[1].split(":")[0] + "5000";
    return s;

  }

}

document.getElementById("iCal").addEventListener("click", () => {
  var calText = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:TimeTableApp\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH";
  document.querySelectorAll("td").forEach(e => {
    console.log("HI");
    var text = e.innerHTML.trim();
    var s = getFormattedDate();
    if (e.classList[0] == "lunch" || e.classList[0] == "top" || e.classList[0] == "side" || text == "" || e.offsetParent == null)
      return;
    var t = e.classList[1].split("-");
    calText += "\nBEGIN:VEVENT\nSUMMARY:" + text + "\nUID:" + generateUUID() + "\nDTSTART:" + getStart(t) + "\nDTEND:" + getEnd(t) + "\nDTSTAMP:" + s;

    // Set the RRULE based on the semester
    if (sem === 1) {
      calText += "\nRRULE:FREQ=WEEKLY;BYDAY=" + t[2] + ";UNTIL=20230430;BYSETPOS=1;BYHOUR=" + t[0] + ";BYMINUTE=0";
    }
    else if (sem === 2) {
      calText += "\nRRULE:FREQ=WEEKLY;BYDAY=" + t[2] + ";UNTIL=20231231;BYSETPOS=1;BYHOUR=" + t[0] + ";BYMINUTE=0";
    }

    calText += "\nEND:VEVENT";

  });
  calText += "\nEND:VCALENDAR";

  console.log(calText);

  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/calendar;charset=utf-8,' + encodeURIComponent(calText));
  element.setAttribute('download', 'calendar');
  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
});

