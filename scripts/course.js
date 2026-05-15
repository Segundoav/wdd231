const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 3, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 3, completed: true },
    { subject: 'CSE', number: 111, title: 'An Introduction to Databases', credits: 3, completed: false },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 3, completed: true },
    { subject: 'WDD', number: 231, title: 'Web Frontend Development I', credits: 3, completed: false },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 3, completed: false }
];

const courseList = document.getElementById('course-list');
const totalCreditsElement = document.getElementById('total-credits');

function displayCourses(filteredCourses) {
    courseList.innerHTML = "";
    filteredCourses.forEach(course => {
        const li = document.createElement('li');
        li.textContent = `${course.subject} ${course.number}: ${course.title}`;
        
        // Estilo diferente si el curso está completado (cumple criterio 11)
        if (course.completed) {
            li.classList.add('completed');
        }
        courseList.appendChild(li);
    });

    // Calcular créditos dinámicamente con 'reduce' (cumple criterio 10)
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsElement.textContent = `Total Credits Required: ${totalCredits}`;
}

// Filtros (cumple criterio 9)
document.getElementById('all-btn').addEventListener('click', () => displayCourses(courses));
document.getElementById('wdd-btn').addEventListener('click', () => displayCourses(courses.filter(c => c.subject === 'WDD')));
document.getElementById('cse-btn').addEventListener('click', () => displayCourses(courses.filter(c => c.subject === 'CSE')));

// Carga inicial
displayCourses(courses);