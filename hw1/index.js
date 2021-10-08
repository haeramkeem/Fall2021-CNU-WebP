/* Modal */
// Show modal
document.getElementById("add-item-btn").addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("modal-container").style.display = "block";
});

// Close Modal
document.getElementById("cancel-item-btn").addEventListener("click", (event) => {
    event.preventDefault();
    closeModal();
});

function closeModal() {
    document.getElementById("modal-container").style.display = "none";
}