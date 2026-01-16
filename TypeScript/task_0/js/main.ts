interface Student {
    //it's a model. Definite the structur of an object.
    firstName: string;
    lastName: string;
    age: number;
    location: string;
}

const student1: Student = {
    firstName: "Malik",
    lastName: "Bouanani",
    age: 41,
    location: "Toulouse",
}

const student2: Student = {
    firstName: "John",
    lastName: "Smith",
    age: 25,
    location: "Toulouse",
}

const studentsList: Student[] = [student1, student2];

const table = document.createElement('table'); // Create the table

// Create the header
const header = table.createTHead(); // Create the table header
const headerRow = header.insertRow(0); // Insert a row inside the table header
// Insert the first header cell and set its text content
headerRow.insertCell(0).innerHTML = "Name";
headerRow.insertCell(1).innerHTML = "Location";

// Loop through the array to add a row for each student
for (const student of studentsList) {
    const row = table.insertRow();
    row.insertCell(0).innerHTML = student.firstName;
    row.insertCell(1).innerHTML= student.location;
}

// Append the table to the body of the HTML document so it becomes visible
document.body.appendChild(table);
