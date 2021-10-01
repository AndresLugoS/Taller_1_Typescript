import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var studentTbody = document.getElementById('student');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
var btnCredits = document.getElementById("button-creditRange");
var inputRange1 = document.getElementById("range1");
var inputRange2 = document.getElementById("range2");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnCredits.onclick = function () { return applyFilterByCredit(); };
renderCoursesInTable(dataCourses);
renderStudentDataInTable(dataStudent);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentDataInTable(infoEstudiante) {
    console.log('Desplegando datos del estudiante');
    infoEstudiante.forEach(function (infoEstudiante) {
        var tableElement = document.createElement("table");
        tableElement.innerHTML = "\n                        <tr>\n                            <th>C\u00F3digo</th>\n                            <td>" + infoEstudiante.IdStudent + "</td>\n                        </tr>\n                        <tr>\n                            <th>C\u00E9dula</th>\n                            <td>" + infoEstudiante.cedulaStudent + "</td>\n                        </tr>\n                        <tr>\n                            <th>Direcci\u00F3n</th>\n                            <td>" + infoEstudiante.dirStudent + "</td>\n                        </tr>\n                        <tr>\n                            <th>Edad</th>\n                            <td>" + infoEstudiante.edadStudent + "</td>\n                        </tr>\n                        <tr>\n                            <th>Tel\u00E9fono</th>\n                            <td>" + infoEstudiante.telStudent + "</td>\n                        </tr>";
        studentTbody.appendChild(tableElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByCredit() {
    var infe = (inputRange1.value == null) ? -1 : parseInt(inputRange1.value);
    var supe = (inputRange2.value == null) ? -1 : parseInt(inputRange2.value);
    clearCoursesInTable();
    var coursesFiltered = searchCourseByRange(infe, supe, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCourseByRange(infe, supe, courses) {
    return (infe == -1 || supe == -1) ? dataCourses : courses.filter(function (c) {
        return c.credits >= infe && c.credits <= supe;
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
