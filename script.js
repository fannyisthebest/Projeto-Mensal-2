const notesContainer = document.getElementById("notesContainer");
const noteTitleInput = document.getElementById("noteTitleInput");

function loadNotes() {
  const saved = localStorage.getItem("notes");
  if (saved) {
    const notes = JSON.parse(saved);
    notes.forEach(note => {
      createNote(note.title, note.text);
    });
  }
}

function saveNotes() {
  const notes = [];
  const noteDivs = document.querySelectorAll(".note");
  noteDivs.forEach(div => {
    const title = div.querySelector(".title").innerText;
    const text = div.querySelector(".text").innerText;
    notes.push({ title, text });
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}

function createNote(title, text = "") {
  const note = document.createElement("div");
  note.className = "note";

  const titleEl = document.createElement("div");
  titleEl.className = "title";
  titleEl.innerText = title;

  const textEl = document.createElement("div");
  textEl.className = "text";
  textEl.innerText = text;

  const actions = document.createElement("div");
  actions.className = "actions";

  const editBtn = document.createElement("span");
  editBtn.innerText = "✏️";
  editBtn.title = "Editar";
  editBtn.onclick = () => {
    const textarea = document.createElement("textarea");
    textarea.value = textEl.innerText;
    note.replaceChild(textarea, textEl);

    textarea.onblur = () => {
      textEl.innerText = textarea.value;
      note.replaceChild(textEl, textarea);
      saveNotes();
    };

    textarea.focus();
  };

  const deleteBtn = document.createElement("span");
  deleteBtn.innerText = "❌";
  deleteBtn.title = "Excluir";
  deleteBtn.onclick = () => {
    note.remove();
    saveNotes();
  };

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  note.appendChild(actions);
  note.appendChild(titleEl);
  note.appendChild(textEl);
  notesContainer.appendChild(note);
}

function addNote() {
  const title = noteTitleInput.value.trim();
  if (title === "") {
    alert("Digite um título!");
    return;
  }
  createNote(title);
  saveNotes();
  noteTitleInput.value = "";
}

window.onload = loadNotes;
