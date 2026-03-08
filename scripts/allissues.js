const manageLoading = (status) => {
    const loadingContainer = document.getElementById('loading-container');
    if(status) {
        loadingContainer.classList.remove('hidden');
    }
    else {
        loadingContainer.classList.add('hidden');
    }
};

const removeActiveButton = () => {
    const buttons = document.querySelectorAll('#all-button, #open-button, #closed-button');
    buttons.forEach((button) => {
        button.classList.remove('active-button');
    })
};

const createLabelElements = (labels) => {
    const labelElements = labels.map((label) => {
        if(label === "bug") {
            const element = `<div class="badge badge-xl p-2 rounded-[100px] bg-[#FEECEC] border border-[#FECACA] geist-font font-medium text-[16px] leading-[100%] tracking-[0%] text-[#EF4444] uppercase"><i class="fa-solid fa-bug"></i>${label}</div>`;
            return element;
        }
        else if(label === "help wanted") {
            const element = `<div class="badge badge-xl p-2 rounded-[100px] bg-[#FFF8DB] border border-[#FDE68A] geist-font font-medium text-[16px] leading-[100%] tracking-[0%] text-[#D97706] uppercase"><i class="fa-solid fa-life-ring"></i>${label}</div>`
            return element;
        }
        else if(label === "enhancement") {
            const element = `<div class="badge badge-xl p-2 rounded-[100px] bg-[#DEFCE8] border border-[#BBF7D0] geist-font font-medium text-[16px] leading-[100%] tracking-[0%] text-[#16A34A] uppercase"><i class="fa-solid fa-wand-magic-sparkles"></i>${label}</div>`;
            return element;
        }
        else if(label === "good first issue") {
            const element = `<div class="badge badge-xl p-2 rounded-[100px] bg-[#FFDEAD] border border-[#FFBF00] geist-font font-medium text-[16px] leading-[100%] tracking-[0%] text-[#8B4000] uppercase"><i class="fa-solid fa-circle-exclamation"></i>${label}</div>`;
            return element;
        }
        else if(label === "documentation") {
            const element = `<div class="badge badge-xl p-2 rounded-[100px] bg-[#F0FFFF] border border-[#0096FF] geist-font font-medium text-[16px] leading-[100%] tracking-[0%] text-[#00008B] uppercase"><i class="fa-solid fa-file-lines"></i>${label}</div>`;
            return element;
        }
    })
    return labelElements.join(' ');
};

const counter = () => {
    const allIssuesContainer = document.getElementById('all-issues-container');
    const issuesNumber = allIssuesContainer.childElementCount;
    const allIssueCount = document.getElementById('all-issue-count');
    allIssueCount.innerText = issuesNumber;
}


const loadAllIssues = () => {
    manageLoading(true);
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((allIssues) => {
            displayAllIssues(allIssues.data);
        })
};
const displayAllIssues = (allIssuesData) => {
    clearSearchValue();
    manageLoading(false);
    const allIssuesContainer = document.getElementById('all-issues-container');
    allIssuesContainer.innerHTML = "";

    allIssuesData.forEach((issue) => {
        const issueCard = document.createElement('div');
        issueCard.innerHTML = `
            <div onclick="showDetails(${issue.id})" class="issue-card bg-[#FFFFFF] border-t-4 ${issue.status === "open" ? 'border-t-[#00A96E]' : 'border-t-[#A855F7]'} rounded-sm shadow-[0px_3px_6px_rgba(0,0,0,0.08)] h-full">
                <div class="border-b border-b-[#E4E4E7] p-4 space-y-4">
                    <div class="flex items-center justify-between">
                        <div>
                            ${issue.priority === "high" || issue.priority === "medium" ? `<img src="../assets/Open-Status.png" alt="Open Status" class="w-6 h-6">` : `<img src="../assets/Closed- Status .png" alt="Closed Status" class="w-6 h-6">`}
                        </div>
                        <div>
                            ${issue.priority === "high" ? 
                            `<p class="w-24 bg-[#FEECEC] px-3 py-2 flex items-center justify-center rounded-[100px] geist-font font-medium text-[16px] leading-[100%] tracking-[0%] text-[#EF4444] uppercase">${issue.priority}</p>` : 
                            issue.priority === "medium" ? 
                            `<p class="w-24 bg-[#FFF6D1] px-3 py-2 flex items-center justify-center rounded-[100px] geist-font font-medium text-[16px] leading-[100%] tracking-[0%] text-[#F59E0B] uppercase">${issue.priority}</p>` : 
                            `<p class="w-24 bg-[#EEEFF2] px-3 py-2 flex items-center justify-center rounded-[100px] geist-font font-medium text-[16px] leading-[100%] tracking-[0%] text-[#9CA3AF] uppercase">${issue.priority}</p>`}
                        </div>
                    </div>
                    <div>
                        <h1 class="geist-font font-semibold text-[20px] leading-[auto] tracking-[0%] text-[#000000]">${issue.title}</h1>
                        <p class="geist-font font-normal text-[16px] leading-[auto] tracking-[0%] text-[#64748B]">${issue.description}</p>
                    </div>
                    <div class="flex items-center gap-2 flex-wrap">
                        ${createLabelElements(issue.labels)}
                    </div>
                </div>
                <div class="p-4 space-y-2">
                    <div class="flex items-center justify-between">
                        <p class="geist-font font-normal text-[13px] leading-[auto] tracking-[0%] text-[#64748B]">#${issue.id} by ${issue.author}</p>
                        <p class="geist-font font-normal text-[13px] leading-[auto] tracking-[0%] text-[#64748B]">${new Date(issue.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div class="flex items-center justify-between">
                        <p class="geist-font font-normal text-[13px] leading-[auto] tracking-[0%] text-[#64748B]">Assignee: ${issue.assignee}</p>
                        <p class="geist-font font-normal text-[13px] leading-[auto] tracking-[0%] text-[#64748B]">Updated: ${new Date(issue.updatedAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        `;
        allIssuesContainer.appendChild(issueCard);
        counter();
    });
    manageLoading(false);
};

const allButton = document.getElementById("all-button");
allButton.addEventListener('click', () => {
    removeActiveButton();
    allButton.classList.add("active-button");
    const allIssuesContainer = document.getElementById('all-issues-container');
    allIssuesContainer.classList.remove('hidden');
    allIssuesContainer.classList.add('grid');
    const closedIssuesContainer = document.getElementById('closed-issues-container');
    closedIssuesContainer.classList.add('hidden');
    closedIssuesContainer.classList.remove('grid');
    const openIssuesContainer = document.getElementById('open-issues-container');
    openIssuesContainer.classList.add('hidden');
    openIssuesContainer.classList.remove('grid');
    const allCount = document.getElementById('all-count');
    allCount.classList.remove('hidden');
    const openCount = document.getElementById('open-count');
    openCount.classList.add('hidden');
    const closedCount = document.getElementById('closed-count');
    closedCount.classList.add('hidden');
    loadAllIssues();
});

const allCount = document.getElementById('all-count');
allCount.classList.remove('hidden');
const openCount = document.getElementById('open-count');
openCount.classList.add('hidden');
const closedCount = document.getElementById('closed-count');
closedCount.classList.add('hidden');
allButton.classList.add("active-button");
loadAllIssues();
