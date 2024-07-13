// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBLg8yW7uj7o6yvpA-yWD8Mk9yt2kdSoSQ",
    authDomain: "pmdazm-19197.firebaseapp.com",
    databaseURL: "https://pmdazm-19197-default-rtdb.firebaseio.com",
    projectId: "pmdazm-19197",
    storageBucket: "pmdazm-19197.appspot.com",
    messagingSenderId: "601613362373",
    appId: "1:601613362373:web:1a0b66f704c66a72577cac"
  
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function exportToExcel() {
    const attendanceLogRef = database.ref('attendanceLog');
    attendanceLogRef.once('value', (snapshot) => {
        const data = snapshot.val();
        const table = document.createElement('table');
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const tr = document.createElement('tr');
                const td = document.createElement('td');
                td.textContent = `${data[key].name} (${data[key].email}) - ${data[key].timestamp}`;
                tr.appendChild(td);
                table.appendChild(tr);
            }
        }

        const excelFile = XLSX.utils.table_to_book(table, {sheet: "Sheet1"});
        XLSX.writeFile(excelFile, 'attendance_log.xlsx');
    });
}

function clearAttendance() {
    database.ref('attendanceLog').remove()
        .then(() => {
            alert("Attendance log has been cleared.");
            document.getElementById('attendanceLog').innerHTML = '';
        })
        .catch(error => console.error('Error:', error));
}
