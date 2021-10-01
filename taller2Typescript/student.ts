export class Student {
    IdStudent: number;
    cedulaStudent: number;
    edadStudent: string;
    dirStudent: string;
    telStudent: number;

    constructor(IdStudent: number, cedulaStudent: number, edadStudent: string, dirStudent: string, telStudent: number) {
        this.IdStudent = IdStudent;
        this.cedulaStudent = cedulaStudent;
        this.edadStudent = edadStudent;
        this.dirStudent = dirStudent;
        this.telStudent = telStudent;
    }
}