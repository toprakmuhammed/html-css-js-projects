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
      <td>${lec.students}</td>
      <td>${lec.gpa}</td>
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
