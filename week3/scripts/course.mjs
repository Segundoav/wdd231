// Datos del curso y lógica de inscripción
const byuiCourse = {
    code: "CSE121b",
    name: "Javascript Language",
    sections: [
        { sectionNum: 1, roomNum: 'STC 353', enrolled: 26, days: 'TTh', instructor: 'Bro Thayne' },
        { sectionNum: 2, roomNum: 'STC 347', enrolled: 28, days: 'MWF', instructor: 'Bro Wright' }
    ],
    changeEnrollment: function (sectionNum, add = true) {
        const sectionIndex = this.sections.findIndex(
            (section) => section.sectionNum == sectionNum
        );
        if (sectionIndex >= 0) {
            if (add) {
                this.sections[sectionIndex].enrolled++;
            } else {
                this.sections[sectionIndex].enrolled--;
            }
        }
    }
};

// Exportación por defecto
export default byuiCourse;