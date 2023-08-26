
const submitBtn = document.querySelector('.submitButton');
const savedNoteContainer = document.getElementById('noteContainer');

let numOfNotes = 1;

// waits for the button to be clicked
submitBtn.addEventListener("click", addNote);

function addNote() {
    
    // create an HTML element textarea and delete button and get the Id of the div on where the textarea should be placed
    const savedNote = document.createElement("textarea");
    const writtenNote = document.getElementById('notepad').value;

    const deleteBtn = document.createElement('button');

    // add the properties and values to the textarea
    savedNote.classList.add("form-control");
    savedNote.classList.add("my-3");

    // add properties and values to delete button
    deleteBtn.classList.add("btn");
    deleteBtn.classList.add("btn-danger");
    deleteBtn.classList.add("px-2");
    deleteBtn.classList.add("deleteButton");
    
    // create unique-ids
    let uniqueIdProperty = "savedNote" + numOfNotes;
    savedNote.setAttribute("id", uniqueIdProperty);    

    let uniqueDeleteBtn = "deleteBtn" + numOfNotes;
    deleteBtn.setAttribute("id", uniqueDeleteBtn);
    deleteBtn.setAttribute("type", "button");

    let onClickValue = "deleteNote('" + uniqueDeleteBtn + "', '" + uniqueIdProperty + "')";
    deleteBtn.setAttribute("onclick", onClickValue);

    // add the text area in the html file
    savedNoteContainer.appendChild(savedNote);
    savedNoteContainer.appendChild(deleteBtn);

    numOfNotes++;
    
    document.getElementById(uniqueIdProperty).value = writtenNote;
    document.getElementById(uniqueIdProperty).style = "height: 200px; width: 60%";

    document.getElementById(uniqueDeleteBtn).textContent = "Delete Note";

    //const deleteEventListener = document.querySelector('.submitButton');
    //document.getElementById(uniqueDeleteBtn).addEventListener("click", deleteNote(uniqueDeleteBtn));

    removeNoteContent();
}

function removeNoteContent() {
    document.getElementById("notepad").value = "";
}

function deleteNote(deletebtnId, textId) {
    const element = document.getElementById(textId);
    element.remove();

    const elementBtn = document.getElementById(deletebtnId);
    elementBtn.remove();

    console.log("deelete" + uniqueDeleteBtn);
}


/*
function saveNote(notes) {
    const htmlCode = `<textarea placeholder="Your notes" class="form-control" style="height: 200px; disabled">` + notes + `</textarea>`;
    createNote(htmlCode);
}


function createNote(html) {
    const template = document.createElement("template");

    template.innerHTML = html.trim();

    return template.content.firstElementChild;
}

*/