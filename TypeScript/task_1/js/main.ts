interface Teacher {
    readonly firstName: string; // can only be set during initialization
    readonly lastName: string;
    fullTimeEmployee: boolean;
    yearsOfExperience?: number; // Optional property
    location: string;
    // property(key) must be a string and type of property can be anything
    [key: string]: any;
}

interface Directors extends Teacher {
    numberOfReports: number;
}

const teacher1: Teacher = {
    firstName: "Hugo",
    lastName: "Chilemme",
    fullTimeEmployee: true,
    location: "Toulouse",
    yearsOfExperience: 10,
    level: "expert",
    contrat: "CDI",
}

const teacher2: Teacher = {
    firstName: "Fabien",
    lastName: "Chavonet",
    fullTimeEmployee: true,
    location: "Toulouse",
}

const director1: Directors = {
  firstName: 'John',
  lastName: 'Doe',
  location: 'London',
  fullTimeEmployee: true,
  numberOfReports: 17,
};

console.log(teacher1);
console.log(teacher2);
console.log(director1);

interface printTeacherFunction {
    (firstName: string, lastName: string): string;
}

const printTeacher: printTeacherFunction = (firstName, lastName) => {
    return `${firstName[0]}. ${lastName}`;
}

console.log(printTeacher(teacher1.firstName, teacher1.lastName));
console.log(printTeacher(teacher2.firstName, teacher2.lastName));
