let openIssues = [];

const openIssuesCounter = () => {
    const openIssuesCount = document.getElementById('open-issue-count');
    openIssuesCount.innerText = openIssues.length;
}

const pushData = (issuesData) => {
    openIssues.length = 0;
    issuesData.forEach((element) => {
        if(element.status === "open") {
            openIssues.push(element);
        }
    });
    displayOpenIssues(openIssues);
};

const displayOpenIssues = (openIssues) => {
    manageLoading(false);
    const openIssuesContainer = document.getElementById('open-issues-container');
    openIssuesContainer.innerHTML = "";
    openIssues.forEach((issue) => {
        const openDiv = document.createElement('div');
        openDiv.innerHTML = `
            <div onclick="showDetails(${issue.id})"class="issue-card bg-[#FFFFFF] border-t-4 ${issue.status === "open" ? 'border-t-[#00A96E]' : 'border-t-[#A855F7]'} rounded-sm shadow-[0px_3px_6px_rgba(0,0,0,0.08)] h-full">
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
        openIssuesContainer.appendChild(openDiv);
        openIssuesCounter();
    })
    manageLoading(false);
};

const loadOpenIssues = () => {
    manageLoading(true);
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((issuesData) => {
            pushData(issuesData.data);
        })
};

const openButton = document.getElementById('open-button');
openButton.addEventListener('click', () => {

    removeActiveButton();
    openButton.classList.add("active-button");
    manageLoading(true);
    const allIssuesContainer = document.getElementById('all-issues-container');
    allIssuesContainer.classList.add('hidden');
    allIssuesContainer.classList.remove('grid');
    const closedIssuesContainer = document.getElementById('closed-issues-container');
    closedIssuesContainer.classList.add('hidden');
    closedIssuesContainer.classList.remove('grid');
    const openIssuesContainer = document.getElementById('open-issues-container');
    openIssuesContainer.classList.remove('hidden');
    openIssuesContainer.classList.add('grid');
    const allCount = document.getElementById('all-count');
    allCount.classList.add('hidden');
    const openCount = document.getElementById('open-count');
    openCount.classList.remove('hidden');
    const closedCount = document.getElementById('closed-count');
    closedCount.classList.add('hidden');
    loadOpenIssues();
});