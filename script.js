// ==========================================
// COLLEGE CONTACT SYSTEM
// ==========================================


// Get HTML elements
const loginSection = document.getElementById("loginSection");
const appSection = document.getElementById("appSection");

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

const logoutButton = document.getElementById("logoutButton");

const searchForm = document.getElementById("searchForm");
const rollNumberInput = document.getElementById("rollNumber");
const studentResult = document.getElementById("studentResult");


// ==========================================
// CHECK LOGIN WHEN PAGE OPENS
// ==========================================

checkUser();


// ==========================================
// CHECK CURRENT USER
// ==========================================

async function checkUser() {

    const {
        data: { user }
    } = await supabaseClient.auth.getUser();

    if (user) {
        showApp();
    } else {
        showLogin();
    }
}


// ==========================================
// LOGIN
// ==========================================

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    loginMessage.innerHTML = "<p>Logging in...</p>";

    const { data, error } =
        await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

    if (error) {

        loginMessage.innerHTML =
            `<p>❌ ${error.message}</p>`;

        return;
    }

    loginMessage.innerHTML =
        "<p>✅ Login successful!</p>";

    showApp();
});


// ==========================================
// LOGOUT
// ==========================================

logoutButton.addEventListener("click", async function () {

    await supabaseClient.auth.signOut();

    showLogin();

});


// ==========================================
// SHOW LOGIN
// ==========================================

function showLogin() {

    loginSection.style.display = "block";
    appSection.style.display = "none";

}


// ==========================================
// SHOW APPLICATION
// ==========================================

function showApp() {

    loginSection.style.display = "none";
    appSection.style.display = "block";

}


// ==========================================
// SEARCH STUDENT
// ==========================================

searchForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const rollNumber =
        rollNumberInput.value.trim().toUpperCase();

    if (!rollNumber) {

        studentResult.innerHTML =
            "<p>Please enter a roll number.</p>";

        return;
    }

    studentResult.innerHTML =
        "<p>🔎 Searching...</p>";


    // Search the secure Supabase database
    const { data, error } = await supabaseClient
        .from("students")
        .select("*")
        .eq("roll_number", rollNumber)
        .maybeSingle();


    // Database error
    if (error) {

        console.error(error);

        studentResult.innerHTML =
            `<p>❌ Unable to search the database.</p>`;

        return;
    }


    // Student not found
    if (!data) {

        studentResult.innerHTML =
            `<p>❌ No student found with roll number
            <strong>${rollNumber}</strong>.</p>`;

        return;
    }


    // Student found
    studentResult.innerHTML = `

        <h3>Student Found</h3>

        <p>
            <strong>Name:</strong>
            ${escapeHTML(data.name)}
        </p>

        <p>
            <strong>Roll Number:</strong>
            ${escapeHTML(data.roll_number)}
        </p>

        <p>
            <strong>Department:</strong>
            ${escapeHTML(data.department || "-")}
        </p>

        <p>
            <strong>Year:</strong>
            ${escapeHTML(data.year || "-")}
        </p>

        <p>
            <strong>Section:</strong>
            ${escapeHTML(data.section || "-")}
        </p>

        <p>
            <strong>Mobile:</strong>
            ${escapeHTML(data.mobile_number)}
        </p>

        <a
            href="tel:${encodeURIComponent(data.mobile_number)}"
            class="call-button"
        >
            📞 Call Student
        </a>
    `;
});


// ==========================================
// BASIC HTML SAFETY
// ==========================================

function escapeHTML(value) {

    const div = document.createElement("div");

    div.textContent = value;

    return div.innerHTML;
}