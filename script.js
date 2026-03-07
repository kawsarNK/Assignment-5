const issuesCardContainer = document.getElementById("issuesCardContainer");
const totalIssuCount = document.getElementById("totalIssuCount");
const mainContainer = document.querySelector('main');

// 1. Create a variable to store the fetched data globally
let allIssues = []; 

async function loadIssues() {
    try {
        const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
        const data = await res.json();
        
        // 2. Store the data for filter it if without load fetching again
        allIssues = data.data; 
        
        displayIssues(allIssues);

    } catch (error) {
        console.error("Failed to load issues:", error);
    }
}

mainContainer.addEventListener('click', function (event) {
    const filterBtn = event.target.closest('.fiterBtn'); 
    if (!filterBtn) return;
    
    // 3. Implement the filtering logic
    if (event.target.closest('#allIssuesBtn')) {
        displayIssues(allIssues);
    }
    else if (event.target.closest('#openIssuesBtn')) {
        const openIssues = allIssues.filter(issue => issue.status === 'open');
        displayIssues(openIssues);
    }
    else if (event.target.closest('#closeIssuesBtn')) {
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
                    <h3 class="font-bold text-slate-800 leading-tight mb-2">${issue.title}</h3>
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