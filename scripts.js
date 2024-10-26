const animated = document.querySelector(".skills");

animated.addEventListener("animationstart", () => {
    updateCircularProgressbars(() => updateProgressbar(0));
});

function updateCircularProgressbars(callback) {
    const circularProgressbar = document.getElementsByClassName("circular-progressbar"),
        circularProgressValue = document.getElementsByClassName("circular-progressbar-value");

    const circularProgressEndValues = [100, 92, 85];
    let progressStartValues = Array(circularProgressValue.length).fill(0);
    const delay = 8;

    const circularProgress = setInterval(() => {
        let allBarsComplete = true;

        for (let i = 0; i < circularProgressValue.length; i++) {
            if (progressStartValues[i] < circularProgressEndValues[i]) {
                progressStartValues[i]++;
                circularProgressValue[i].textContent = `${progressStartValues[i]}%`;
                circularProgressbar[i].style.background = `conic-gradient(white ${progressStartValues[i] * 3.6}deg, rgb(32, 51, 70) 0deg)`;

                allBarsComplete = false;
            }
        }

        if (allBarsComplete) {
            clearInterval(circularProgress);
            if (typeof callback === "function") {
                callback(); 
            }
        }
    }, delay);
}

function updateProgressbar(index) {
    const progressbars = document.getElementsByClassName("progress-bar");

    if (index >= progressbars.length) return; // Stop if all progress bars have been updated

    const progressbar = progressbars[index];
    const progressEndValue = parseInt(progressbar.getAttribute('aria-valuemax')) || 100;
    let progressStartValue = parseInt(progressbar.getAttribute('aria-valuenow')) || 0;
    const delay = 8;

    const progress = setInterval(() => {
        if (progressStartValue < progressEndValue) {
            progressStartValue++;
            progressbar.setAttribute('aria-valuenow', progressStartValue);
            progressbar.style.width = progressStartValue + `%`;
            progressbar.textContent = `${progressStartValue}%`;
        } else {
            clearInterval(progress);
            updateProgressbar(index + 1); 
        }
    }, delay);
}

ChangeContent();

function ChangeContent() {
    // Get the buttons and content divs
    let jobsButton = document.getElementById("jobs-button");
    let educationButton = document.getElementById("education-button");

    let jobsDiv = document.getElementById("jobs");
    let educationDiv = document.getElementById("education");

    function ShowContent(contentDiv) {
        // Remove 'active' class from all content divs
        [jobsDiv, educationDiv].forEach(div => {
            div.classList.remove('active');
        });

        // Remove 'active' class from all buttons
        [jobsButton, educationButton].forEach(btn => {
            btn.classList.remove('active');
        });

        // Show the selected content div
        contentDiv.classList.add('active');

        // Set active button state
        if (contentDiv == jobsDiv) {
            jobsButton.classList.add('active');
        } else if (contentDiv == educationDiv) {
            educationButton.classList.add('active');
        }
    }

    // Add click event listeners to buttons
    jobsButton.addEventListener("click", function() {
        ShowContent(jobsDiv);
    });

    educationButton.addEventListener("click", function() {
        ShowContent(educationDiv);
    });
}