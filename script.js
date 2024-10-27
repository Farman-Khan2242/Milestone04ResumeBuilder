// Initialize event listeners for form submission and generating resume
document.getElementById('resumeForm').addEventListener('submit', generateResume);

function generateResume(event) {
    event.preventDefault();

    // Retrieve form values
    let name = document.getElementById('fname').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let profilePicture = document.getElementById('profile').files[0];
    let education = document.getElementById('education').value.split('\n');
    let skills = document.getElementById('skills').value.split('\n');
    let experience = document.getElementById('experiance').value.split('\n');

    let dynamicHeading = document.getElementById('dynamicHeading');
    if (dynamicHeading) dynamicHeading.style.display = 'none';

    // Profile picture handling
    if (profilePicture) {
        let reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('imgdiv').innerHTML = `<img src="${e.target.result}" alt="Profile Picture">`;
        };
        reader.readAsDataURL(profilePicture);
    }

    // Fill resume details
    document.getElementById('name').innerText = name;
    document.getElementById('contactBox').innerHTML = `Email: ${email} | Phone: ${phone}`;

    populateSection('eduList', education);
    populateSection('skillsList', skills);
    populateSection('expList', experience);

    document.querySelector('form').style.display = 'none';
    document.getElementById('resumePut').style.display = 'flex';
    document.querySelectorAll('.buttons').forEach(button => button.style.display = 'inline-block');

    addToggleFunctionality();
    addEditability('eduList');
    addEditability('skillsList');
    addEditability('expList');
}

// Populate section helper
function populateSection(sectionId, items) {
    document.getElementById(sectionId).innerHTML = items.map(item => `<div class="editableItem"><p>${item}</p></div>`).join('');
}

// Add toggle button functionality
function addToggleFunctionality() {
    document.getElementById('btn01').addEventListener('click', function () {
        toggleSection('eduList', this, 'Education');
    });
    document.getElementById('btn02').addEventListener('click', function () {
        toggleSection('skillsList', this, 'Skills');
    });
    document.getElementById('btn03').addEventListener('click', function () {
        toggleSection('expList', this, 'Experience');
    });
}

// Add editability to each section
function addEditability(sectionId) {
    const section = document.getElementById(sectionId);
    section.setAttribute('contenteditable', 'true');
    section.addEventListener('input', () => {
        console.log(`${sectionId} updated: `, section.innerHTML); // Log the changes or save them as needed
    });
    section.addEventListener('blur', () => {
        console.log(`Final ${sectionId} content saved.`);
    });
}

// Toggle section visibility
function toggleSection(sectionId, button, label) {
    let section = document.getElementById(sectionId);
    if (section.style.display === 'none' || section.style.display === '') {
        section.style.display = 'block';
        button.innerText = `Hide ${label}`;
    } else {
        section.style.display = 'none';
        button.innerText = `Show ${label}`;
    }
}
