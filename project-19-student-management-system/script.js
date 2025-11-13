let lectures = [
  { name: "Web Development", students: [] },
  { name: "Database", students: [] },
  { name: "Cyber Security", students: [] },
  { name: "Machine Learning", students: [] },
];

function renderTable() {
  const tbody = document.querySelector("#lectureTable tbody");
  tbody.innerHTML = "";

  lectures.forEach((lec) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${lec.name}</td>
      <td>${lec.students.length}</td>
      <td>${lec.gpa ? lec.gpa : "-"}</td>

    `;
    tbody.appendChild(row);
  });
}

function calculateAverageGPA(students) {
  if (students.length === 0) return 0;
  const sum = students.reduce((acc, s) => acc + s.average, 0);
  return (sum / students.length).toFixed(2);
}

// ========== Add Lecture ==========

function addLecture() {
  const lectureName = prompt("Enter lecture name:");

  if (lectureName && lectureName.trim() !== "") {
    lectures.push({ name: lectureName.trim(), students: [] });
    renderTable();
  } else {
    alert("Lecture name cannot be empty.");
  }
}

// ========== Add Student ==========

function addStudent() {
  const lectureNames = lectures.map((l, i) => `${i + 1}) ${l.name}`).join("\n");
  const lectureIndex = parseInt(prompt(`Select lecture:\n${lectureNames}`)) - 1;

  if (
    isNaN(lectureIndex) ||
    lectureIndex < 0 ||
    lectureIndex >= lectures.length
  ) {
    alert("Invalid lecture selection.");
    return;
  }

  const selectedLecture = lectures[lectureIndex];

  const id = prompt("Enter student ID:");
  const name = prompt("Enter student name:");
  const surname = prompt("Enter student surname:");
  const midterm = parseFloat(prompt("Enter midterm score:"));
  const final = parseFloat(prompt("Enter final score:"));

  if (!id || !name || !surname || isNaN(midterm) || isNaN(final)) {
    alert("All fields are required and scores must be numbers.");
    return;
  }

  const average = midterm * 0.4 + final * 0.6;
  const letter = getLetterGrade(average);

  const student = { id, name, surname, midterm, final, average, letter };
  selectedLecture.students.push(student);
  selectedLecture.gpa = calculateAverageGPA(selectedLecture.students);

  renderTable();
  alert(`Student ${name} ${surname} added to ${selectedLecture.name}.`);
}

function getLetterGrade(average) {
  if (average >= 90) return "A";
  if (average >= 80) return "B";
  if (average >= 70) return "C";
  if (average >= 60) return "D";
  return "F";
}

// ========== Initial Render & Event Listeners ==========

document.getElementById("addLectureBtn").addEventListener("click", addLecture);
document.getElementById("addStudentBtn").addEventListener("click", addStudent);

renderTable();

// ========== Manage Students (View, Update, Delete) ==========

const detailsSection = document.createElement("section");
detailsSection.id = "studentDetails";
detailsSection.style.display = "40px";
document.body.appendChild(detailsSection);

document
  .getElementById("viewDetailsBtn")
  .addEventListener("click", viewLectureDetails);

function viewLectureDetails() {
  const lectureNames = lectures.map((l, i) => `${i + 1}) ${l.name}`).join("\n");
  const lectureIndex =
    parseInt(prompt(`Select lecture to view details:\n${lectureNames}`)) - 1;

  if (
    isNaN(lectureIndex) ||
    lectureIndex < 0 ||
    lectureIndex >= lectures.length
  ) {
    alert("Invalid lecture selection.");
    return;
  }

  const selectedLecture = lectures[lectureIndex];
  renderStudentTable(selectedLecture);
}

function renderStudentTable(lecture) {
  detailsSection.innerHTML = `
  <h2>${lecture.name} - Students Details</h2>
  <table id="studentDetailsTable" border="1" cellpadding="6" cellspacing="0">
  <thead>

        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Midterm</th>
          <th>Final</th>
          <th>Average</th>
          <th>Letter</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table> `;

  const tbody = detailsSection.querySelector("tbody");

  lecture.students.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.surname}</td>
      <td>${student.midterm}</td>
      <td>${student.final}</td>
      <td>${student.average.toFixed(1)}</td>
      <td>${student.letter}</td>
      <td>
        <button class="updateBtn" data-index="${index}">Update</button>
        <button class="deleteBtn" data-index="${index}">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  tbody.querySelectorAll(".updateBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.getAttribute("data-index"));
      updateStudent(lecture, idx);
    });
  });

  tbody.querySelectorAll(".deleteBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.getAttribute("data-index"));
      deleteStudent(lecture, idx);
    });
  });
}

function updateStudent(lecture, index) {
  const student = lecture.students[index];
  const newMidterm = parseFloat(
    prompt(`Enter new midterm for ${student.name}:`, student.midterm)
  );
  const newFinal = parseFloat(
    prompt(`Enter new final for ${student.name}:`, student.final)
  );

  if (isNaN(newMidterm) || isNaN(newFinal)) {
    alert("Invalid score input.");
    return;
  }

  student.midterm = newMidterm;
  student.final = newFinal;
  student.average = 0.4 * newMidterm + 0.6 * newFinal;
  student.letter = getLetterGrade(student.average);

  renderStudentTable(lecture);
  renderTable();
}

function deleteStudent(lecture, index) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this student?"
  );
  if (confirmDelete) {
    lecture.students.splice(index, 1);
    renderStudentTable(lecture);
    renderTable();
  }
}

//==========Search Student Scores==========

document
  .getElementById("searchBtn")
  .addEventListener("click", searchStudentScores);
function searchStudentScores() {
  const query = prompt("Enter student name or surnameto search:");
  if (!query) return;

  let foundRecords = [];

  lectures.forEach((lec) => {
    lec.students.forEach((s) => {
      const fullName = `${s.name} ${s.surname}`.toLowerCase();
      if (fullName.includes(query.toLowerCase())) {
        foundRecords.push({ lecture: lec.name, ...s });
      }
    });
  });

  if (foundRecords.length === 0) {
    alert("No matching students found.");
    detailsSection.innerHTML = `<h3>No results found for "${query}".</h3>`;
    return;
  }

  const totalGPA =
    foundRecords.reduce((acc, s) => acc + s.average, 0) / foundRecords.length;

  detailsSection.innerHTML = `
  <h2>Results for "${query}"</h2>
    <table id="searchResultsTable" border="1" cellspacing="0" cellpadding="6">
      <thead>
        <tr>
          <th>Lecture</th>
          <th>ID</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Midterm</th>
          <th>Final</th>
          <th>Average</th>
          <th>Letter</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
    <p><strong>Overall GPA:</strong> ${totalGPA.toFixed(2)}</p>
  `;

  const tbody = detailsSection.querySelector("tbody");
  foundRecords.forEach((s) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${s.lecture}</td>
      <td>${s.id}</td>
      <td>${s.name}</td>
      <td>${s.surname}</td>
      <td>${s.midterm}</td>
      <td>${s.final}</td>
      <td>${s.average.toFixed(1)}</td>
      <td>${s.letter}</td>
    `;
    tbody.appendChild(row);
  });
}

//========== View Lecture Statistics & Filters ==========

document
  .getElementById("statisticsBtn")
  .addEventListener("click", showLectureStatistics);

function showLectureStatistics() {
  if (lectures.length === 0) {
    alert("No lectures found.");
    return;
  }

  const lectureNames = lectures.map((l, i) => `${i + 1}) ${l.name}`).join("\n");
  const lectureIndex =
    parseInt(prompt(`Select a lecture to view statistics:\n${lectureNames}`)) -
    1;

  if (
    isNaN(lectureIndex) ||
    lectureIndex < 0 ||
    lectureIndex >= lectures.length
  ) {
    alert("Invalid selection.");
    return;
  }

  const lecture = lectures[lectureIndex];

  const totalStudents = lecture.students.length;
  if (totalStudents === 0) {
    detailsSection.innerHTML = `<h2>${lecture.name}</h2><p>No students found in this lecture.</p>`;
    return;
  }

  const passed = lecture.students.filter((s) => s.average >= 60);
  const failed = lecture.students.filter((s) => s.average < 60);
  const mean = (
    lecture.students.reduce((acc, s) => acc + s.average, 0) / totalStudents
  ).toFixed(1);

  detailsSection.innerHTML = `
    <h2>${lecture.name} - Statistics</h2>
    <p>Total Students: <strong>${totalStudents}</strong></p>
    <p>Passed: <strong>${passed.length}</strong></p>
    <p>Failed: <strong>${failed.length}</strong></p>
    <p>Class Mean Score: <strong>${mean}</strong></p>

    <div class="filter-buttons">
      <button id="showAll">Show All Students</button>
      <button id="showPassed">Show Passed Only</button>
      <button id="showFailed">Show Failed Only</button>
    </div>

    <table id="lectureStatsTable" border="1" cellspacing="0" cellpadding="6">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Midterm</th>
          <th>Final</th>
          <th>Average</th>
          <th>Letter</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;

  const tbody = detailsSection.querySelector("tbody");

  function renderFiltered(list) {
    tbody.innerHTML = "";
    list.forEach((s) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${s.id}</td>
        <td>${s.name}</td>
        <td>${s.surname}</td>
        <td>${s.midterm}</td>
        <td>${s.final}</td>
        <td>${s.average.toFixed(1)}</td>
        <td>${s.letter}</td>
      `;
      tbody.appendChild(row);
    });
  }

  // As a default, show all students
  renderFiltered(lecture.students);

  // Bind filter buttons
  document.getElementById("showAll").addEventListener("click", () => {
    renderFiltered(lecture.students);
  });
  document.getElementById("showPassed").addEventListener("click", () => {
    renderFiltered(passed);
  });
  document.getElementById("showFailed").addEventListener("click", () => {
    renderFiltered(failed);
  });
}
