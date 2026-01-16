interface Teacher {
    readonly firstName: string; // can only be set during initialization
    readonly lastName: string;
    fullTimeEmployee: boolean;
    yearsOfExperience?: number; // Optional property
    location: string;
    // property(key) must be a string and type of property can be anything
    [key: string]: any;
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

console.log(teacher1);
console.log(teacher2);
