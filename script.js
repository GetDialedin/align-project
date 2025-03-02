function selectExpert() {
    const expertSelect = document.getElementById('experts');
    const selectedExpert = expertSelect.value;
    if (selectedExpert) {
        alert(`You have selected ${selectedExpert}`);
    } else {
        alert('Please select an expert.');
    }
}
