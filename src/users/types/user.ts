export type User = {
    "email": string,
    "formerEmploymentPeriod": string[],
    "name": string,
    "gender": string,
    "languagesSpoken": string,
    "registrationDateAndTime": string,
    "salaryRange": number[],
    "skills": string[],
    "states": string[],
    "isTeacher": boolean,
    "students": {name: string}[],
    "id": number,
}
