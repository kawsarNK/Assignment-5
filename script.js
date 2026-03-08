const issuesCardContainer = document.getElementById("issuesCardContainer");
const totalIssuCount = document.getElementById("totalIssuCount");
const allIssuesButton = document.getElementById("allIssuesBtn");
const openIssuesButton = document.getElementById("openIssuesBtn");
const closeIssuesButton = document.getElementById("closeIssuesBtn");
const searchBtn = document.getElementById("searchBtn");

const issueShowModal = document.getElementById("issueShowModal");
const modalContainer = document.getElementById("modalContainer");
const searchText = document.getElementById("searchText");
const loadingSpinner = document.getElementById("loadingSpinner");

const mainContainer = document.querySelector('body');

// variable to store the fetched data globally
let allIssues = [];

// Loading
function showLoading() {
    loadingSpinner.classList.remove("hidden");
}
function hideLoading() {
    loadingSpinner.classList.add("hidden");
}

// load data for show card 
async function loadIssues() {
    showLoading();
    try {
        const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
        const data = await res.json();

        //Store the data for filter it if without load fetching again
        allIssues = data.data;

        displayIssues(allIssues);
        hideLoading();

    } catch (error) {
        console.error("Failed to load issues:", error);
        hideLoading();
    }
}
// load data for search

async function loadSearchIssues() {

    const searchKey = searchText.value;
    showLoading();
    try {
        const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchKey}`);
        const data = await res.json();

        const searchIssues = data.data;
        displayIssues(searchIssues);
        hideLoading();

    } catch (error) {
        console.error("Failed to load issues:", error);
        hideLoading();
    }
}

// event deligation
mainContainer.addEventListener('click', function (event) {
    const filterBtn = event.target.closest('.fiterBtn');
    if (!filterBtn) return;

    // Create array of all buttons for reset
    const buttons = [allIssuesButton, openIssuesButton, closeIssuesButton];

    buttons.forEach(btn => {
        // Reset to "Inactive" style for all
        btn.classList.remove("bg-[#4f00ff]", "hover:bg-[#3f00cc]", "text-white");
        btn.classList.add("btn-ghost", "border", "border-slate-200");
    });

    // Apply "Active" style to the clicked button
    filterBtn.classList.remove("btn-ghost", "border", "border-slate-200");
    filterBtn.classList.add("bg-[#4f00ff]", "hover:bg-[#3f00cc]", "text-white");

    //Filtering Logic
    if (filterBtn.id === 'allIssuesBtn') {
        displayIssues(allIssues);
    }
    else if (filterBtn.id === 'openIssuesBtn') {
        const openIssues = allIssues.filter(issue => issue.status === 'open');
        displayIssues(openIssues);
    }
    else if (filterBtn.id === 'closeIssuesBtn') {
        const closedIssues = allIssues.filter(issue => issue.status === 'closed');
        displayIssues(closedIssues);
    }

});

function displayIssues(issuesList) {
    let issueCount = issuesList.length;
    issuesCardContainer.innerHTML = "";

    issuesList.forEach(issue => {
        const labelsHTML = issue.labels.map(label => {
            const lowerLabel = label.toLowerCase();
            if (lowerLabel === "bug") {
                return `<div class="badge badge-soft badge-error"><i class="fa-solid fa-bug"></i> BUG</div>`;
            }
            else if (lowerLabel === "help wanted") {
                return `<div class="badge badge-soft badge-warning"><i class="fa-solid fa-life-ring"></i> HELP WANTED</div>`;
            }
            else if (lowerLabel === "enhancement") {
                return `<div class="badge badge-soft badge-accent"><i class="fa-solid fa-wand-magic-sparkles"></i> ENHANCEMENT</div>`;
            }
            else if (lowerLabel === "good first issue") {
                return `<div class="badge badge-soft badge-info"><i class="fa-solid fa-school-circle-exclamation"></i> GOOD FIRST ISSUE</div>`;
            }
            else {
                return `<div class="badge badge-soft badge-primary"><i class="fa-solid fa-file-circle-exclamation"></i> ${label.toUpperCase()}</div>`;
            }
        }).join("");

        const formattedDate = new Date(issue.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        const card = document.createElement("div");
        card.className = issue.status === 'open'
            ? "card bg-white border-t-4 border-emerald-500 shadow-sm border-x border-b rounded-lg hover:shadow-md transition-shadow"
            : "card bg-white border-t-4 border-violet-500 shadow-sm border-x border-b rounded-lg hover:shadow-md transition-shadow";

        card.innerHTML = `
            <div class="p-4 space-y-4">
                <div class="flex justify-between items-center">
                    <div class="w-8 h-8 rounded-full">
                        <img src="${issue.status === 'open' ? './assets/Open-Status.png' : './assets/Closed- Status .png'}" alt="Status">
                    </div>
                    ${issue.priority === "high"
                ? `<div class="badge badge-soft badge-error">HIGH</div>`
                : issue.priority === "medium"
                    ? `<div class="badge badge-soft badge-warning">MEDIUM</div>`
                    : `<div class="badge bg-slate-100 text-slate-500 border-none font-bold py-3 px-4 rounded-full text-xs uppercase tracking-wider">Low</div>`
            }
                </div>
                <div>
                    <h3 class="cursor-pointer hover:text-blue-600  font-bold text-slate-800 leading-tight mb-2" onclick = "openModal(${issue.id})">${issue.title}</h3>
                    <p class="text-xs text-slate-500 line-clamp-2">${issue.description}</p>
                </div>
                <div class="flex flex-wrap gap-2">${labelsHTML}</div>
            </div>
            <div class="border-t border-slate-100 p-4 pt-3 text-[11px] text-slate-400 space-y-1">
                <p>#${issue.id} by ${issue.author || 'user'}</p>
                <p>${formattedDate}</p>
            </div>
        `;
        issuesCardContainer.appendChild(card);
    });
    totalIssuCount.innerText = `${issueCount} Issues`;
}

loadIssues();

async function openModal(issueID) {
    const modalContainer = document.getElementById("modalContainer");

    // Show Loading for modal
    modalContainer.innerHTML = `
        <dialog id="issueShowModal" class="modal modal-open">
            <div class="modal-box flex flex-col items-center justify-center py-20">
                <span class="loading loading-spinner loading-lg text-primary"></span>
                <p class="mt-4 text-slate-500 animate-pulse">Fetching issue details...</p>
            </div>
        </dialog>
    `;

    const modal = document.getElementById("issueShowModal");
    modal.showModal();

    try {
        const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueID}`);
        const data = await res.json();
        const issueDetails = data.data;

        // Map Labels to HTML

        const labelsHTML = issueDetails.labels.map(label => {
            const lowerLabel = label.toLowerCase();
            if (lowerLabel === "bug") {
                return `<div class="badge badge-soft badge-error"><i class="fa-solid fa-bug"></i> BUG</div>`;
            }
            else if (lowerLabel === "help wanted") {
                return `<div class="badge badge-soft badge-warning"><i class="fa-solid fa-life-ring"></i> HELP WANTED</div>`;
            }
            else if (lowerLabel === "enhancement") {
                return `<div class="badge badge-soft badge-accent"><i class="fa-solid fa-wand-magic-sparkles"></i> ENHANCEMENT</div>`;
            }
            else if (lowerLabel === "good first issue") {
                return `<div class="badge badge-soft badge-info"><i class="fa-solid fa-school-circle-exclamation"></i> GOOD FIRST ISSUE</div>`;
            }
            else {
                return `<div class="badge badge-soft badge-primary"><i class="fa-solid fa-file-circle-exclamation"></i> ${label.toUpperCase()}</div>`;
            }
        }).join("");

        //set modal content
        modal.innerHTML = `
            <div class="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4">
                <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-200">
                    <div class="p-8 space-y-6 text-left">
                        <div class="space-y-3">
                            <h2 class="text-3xl font-bold text-slate-800">${issueDetails.title}</h2>
                            <div class="flex items-center gap-3 text-slate-500 text-sm">
                                <span class="${issueDetails.status === 'open' ? 'bg-emerald-500' : 'bg-red-500'} text-white px-3 py-1 rounded-full text-xs font-semibold">
                                    ${issueDetails.status === 'open' ? 'Opened' : 'Closed'}
                                </span>
                                <span class="block w-1 h-1 bg-slate-300 rounded-full"></span>
                                <p>Opened by <span class="font-medium text-slate-700">${issueDetails.author}</span></p>
                                <span class="block w-1 h-1 bg-slate-300 rounded-full"></span>
                                <p>${new Date(issueDetails.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>

                        <div class="flex gap-2">${labelsHTML}</div>

                        <p class="text-slate-500 leading-relaxed text-lg border-b border-dashed border-sky-400 pb-8">
                            ${issueDetails.description}
                        </p>

                        <div class="grid grid-cols-2 bg-slate-50/50 rounded-lg p-4">
                            <div class="space-y-1">
                                <p class="text-slate-400 text-sm">Assignee:</p>
                                <p class="font-bold text-slate-800 text-lg">${issueDetails.assignee || 'Unassigned'}</p>
                            </div>
                            <div class="space-y-1">
                                <p class="text-slate-400 text-sm">Priority:</p>
                                <span class="inline-block ${issueDetails.priority.toLowerCase() === 'high' ? 'bg-red-500' : 'bg-amber-500'} text-white px-4 py-1 rounded-full text-xs font-bold uppercase">
                                    ${issueDetails.priority}
                                </span>
                            </div>
                        </div>

                        <div class="modal-action flex justify-end mt-0">
                            <button id="closeModalBtn" class="bg-[#4f00ff] hover:bg-[#3f00cc] text-white px-8 py-3 rounded-lg font-bold transition-colors">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Set event listener for Close btn
        const closeBtn = document.getElementById("closeModalBtn");
        closeBtn.addEventListener("click", () => {
            modal.close();
            //Remove modal-open class cause - DaisyUI added it
            modal.classList.remove("modal-open");
        });

    } catch (error) {
        console.error("Failed to load issue details:", error);
        // Show error state in modal
        modal.innerHTML = `
            <div class="modal-box text-center">
                <h3 class="font-bold text-lg text-error">Oops!</h3>
                <p class="py-4 text-slate-600">Could not load issue details. Please try again.</p>
                <div class="modal-action">
                    <button class="btn" onclick="this.closest('dialog').close()">Close</button>
                </div>
            </div>
        `;
    }
}