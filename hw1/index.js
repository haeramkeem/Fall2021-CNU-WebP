/* Shortcuts */
const id = (idName) => document.getElementById(idName);

/* Modal */
// Show modal
id("add-item-btn").addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("modal-container").style.display = "block";
});

// Cancel
id("cancel-item-btn").addEventListener("click", (event) => {
    event.preventDefault();
    closeModal();
    clearInput();
});

// Clear
function clearInput() {
    id("image-input").value = "";
    id("name-input").value = "";
    id("price-input").value = "";
    id("item-num-input").value = "";
}

// Close
function closeModal() {
    document.getElementById("modal-container").style.display = "none";
}