import { Course } from './course.js';

import { Student } from './student';

import { dataCourses } from './dataCourses.js';

import { dataStudent } from './dataStudent.js';


let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentTbody: HTMLElement = document.getElementById('student')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;

                                  
const btnCredits: HTMLElement = document.getElementById("button-creditRange")!;
const inputRange1: HTMLInputElement = <HTMLInputElement> document.getElementById("range1")!;
const inputRange2: HTMLInputElement = <HTMLInputElement> document.getElementById("range2")!;


btnfilterByName.onclick = () => applyFilterByName();
btnCredits.onclick = () => applyFilterByCredit();

renderCoursesInTable(dataCourses);
renderStudentDataInTable(dataStudent);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function renderStudentDataInTable(infoEstudiante: Student[]): void {
    console.log('Desplegando datos del estudiante');
    
    infoEstudiante.forEach((infoEstudiante) => {
        let tableElement = document.createElement("table");
        tableElement.innerHTML = `
                        <tr>
                            <th>Código</th>
                            <td>${infoEstudiante.IdStudent}</td>
                        </tr>
                        <tr>
                            <th>Cédula</th>
                            <td>${infoEstudiante.cedulaStudent}</td>
                        </tr>
                        <tr>
                            <th>Dirección</th>
                            <td>${infoEstudiante.dirStudent}</td>
                        </tr>
                        <tr>
                            <th>Edad</th>
                            <td>${infoEstudiante.edadStudent}</td>
                        </tr>
                        <tr>
                            <th>Teléfono</th>
                            <td>${infoEstudiante.telStudent}</td>
                        </tr>`;
        studentTbody.appendChild(tableElement);
      });
    
  }
 

 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function applyFilterByCredit() { 
    let infe= (inputRange1.value==null) ? -1: parseInt(inputRange1.value); 
    let supe =(inputRange2.value==null) ? -1: parseInt(inputRange2.value); 
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByRange(infe,supe, dataCourses);
    renderCoursesInTable(coursesFiltered);
  }

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function searchCourseByRange(infe: number,supe:number, courses: Course[]) {
    return (infe==-1 || supe==-1) ? dataCourses : courses.filter( c => 
      c.credits>=infe && c.credits<=supe);
  }



function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}