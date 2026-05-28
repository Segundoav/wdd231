// Renderiza las opciones del menú desplegable de secciones
export function setSectionSelection(sections) {
    const selectionElement = document.querySelector("#sectionNumber");
    const options = sections.map(
        (section) => `<option value="${section.sectionNum}">${section.sectionNum}</option>`
    );
    selectionElement.innerHTML = options.join("");
}