const manageLoading = (status) => {
    const loadingContainer = document.getElementById('loading-container');
    if(status) {
        loadingContainer.classList.remove('hidden');
    }
    else {
        loadingContainer.classList.add('hidden');
    }
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
            const element = ``;
            return element;
        }
        else if(label === "documentation") {
            const element = ``;
            return element;
        }
    })
    return labelElements.join(' ');
};


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
    const allIssuesContainer = document.getElementById('all-issues-container');
    allIssuesContainer.innerHTML = "";

    allIssuesData.forEach((issue) => {
        const issueCard = document.createElement('div');
        issueCard.innerHTML = `
            <div class="issue-card bg-[#FFFFFF] border-t-4 ${issue.priority === "high" || issue.priority === "medium" ? 'border-t-[#00A96E]' : 'border-t-[#A855F7]'} rounded-sm shadow-[0px_3px_6px_rgba(0,0,0,0.08)]">
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
                    <div>
                        ${createLabelElements(issue.labels)}
                    </div>
                </div>
                <div class="p-4 space-y-2">
                    <p class="geist-font font-normal text-[18px] leading-[auto] tracking-[0%] text-[#64748B]">#1 by john_doe</p>
                    <p class="geist-font font-normal text-[18px] leading-[auto] tracking-[0%] text-[#64748B]">1/15/2024</p>
                </div>
            </div>
        `;
        allIssuesContainer.appendChild(issueCard);
    });
    manageLoading(false);
};

loadAllIssues();