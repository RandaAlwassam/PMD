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

document.addEventListener('DOMContentLoaded', () => {
    loadAttendanceLog();
});

function recordAttendance() {
    const nameInput = document.getElementById('employeeName');
    const emailInput = document.getElementById('employeeEmail');
    const name = nameInput.value;
    const email = emailInput.value;

    if (name && email && email.endsWith('@azm.sa')) {
        const now = new Date();
        const dateTimeString = now.toLocaleString();
        const logEntry = {
            name: name,
            email: email,
            timestamp: dateTimeString
        };

        const newLogEntryKey = database.ref().child('attendanceLog').push().key;
        const updates = {};
        updates['/attendanceLog/' + newLogEntryKey] = logEntry;
        database.ref().update(updates);

        nameInput.value = "";
        emailInput.value = "";

        if (now.getHours() < 8 || (now.getHours() === 8 && now.getMinutes() < 1)) {
            alert("كفوووو عليك");
        }
    } else {
        alert("Please enter a valid email with domain @azm.sa and your name.");
    }
}

function loadAttendanceLog() {
    const attendanceLogRef = database.ref('attendanceLog');
    attendanceLogRef.on('value', (snapshot) => {
        const data = snapshot.val();
        document.getElementById('attendanceLog').innerHTML = '';
        const entries = [];
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                entries.push(data[key]);
            }
        }
        entries.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        entries.forEach((entry) => {
            addLogEntry(entry);
        });
        highlightTopThree(); // استدعاء الدالة هنا بعد إضافة جميع العناصر
    });
}

function addLogEntry(logEntry) {
    const li = document.createElement('li');
    li.textContent = `${logEntry.name} (${logEntry.email}) - ${logEntry.timestamp}`;
    document.getElementById('attendanceLog').appendChild(li);
}





function highlightTopThree() {
    const logItems = document.querySelectorAll('#attendanceLog li');
    logItems.forEach((item, index) => {
        if (index < 3 && !item.querySelector('.icon')) {
            item.classList.add('top-three');
            const icon = document.createElement('span');
            icon.className = 'icon';
            icon.innerHTML = '&#9733;'; // Star icon
            item.appendChild(icon);
        }
    });
}
