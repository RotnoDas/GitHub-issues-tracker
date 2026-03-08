const firstUpperCase = (dataObjectStatus) => {
    const firstLetter = dataObjectStatus.charAt(0).toUpperCase();
    const restWords = dataObjectStatus.slice(1);
    return firstLetter + restWords;
}

const priorityCheck = (priority) => {
    if(priority === "high") {
        const pDiv = `
            <div class="p-2 rounded-[100px] bg-[#EF4444] flex items-center justify-center w-fit">
                <p class="geist-font font-medium text-[12px] leading-[100%] tracking-[0%] text-[#FFFFFF] uppercase">${priority}</p>
            </div>
        `;
        return pDiv;
    }
    else if(priority === "medium") {
        const pDiv = `
            <div class="p-2 rounded-[100px] bg-[#CBAF55] flex items-center justify-center w-fit">
                <p class="geist-font font-medium text-[12px] leading-[100%] tracking-[0%] text-[#FFFFFF] uppercase">${priority}</p>
            </div>
        `;
        return pDiv;
    }
    else if(priority === "low") {
        const pDiv = `
            <div class="p-2 rounded-[100px] bg-[#7F00FF] flex items-center justify-center w-fit">
                <p class="geist-font font-medium text-[12px] leading-[100%] tracking-[0%] text-[#FFFFFF] uppercase">${priority}</p>
            </div>
        `;
        return pDiv;
    }
};

const modal = (dataObject) => {
    const myModal = document.getElementById('my_modal_5');
    myModal.innerHTML = `
        <div class="modal-box space-y-6">
            <div>
                <h3 class="text-lg font-bold">${dataObject.title}</h3>
            </div>
            <div class="flex items-center gap-2">
                <div class="${dataObject.status === "open" ? 'bg-[#00A96E]' : 'bg-[#A855F7]'} p-2 rounded-[100px] w-fit flex items-center justify-center">
                    <p class="geist-font font-medium text-[12px] leading-[100%] tracking-[0%] text-[#FFFFFF]">${firstUpperCase(dataObject.status)}</p>
                </div>
                <div class="flex items-center justify-center">
                    <span class="status"></span>
                </div>
                <div>
                    <p class="geist-font font-normal text-[12px] leading-[auto] tracking-[0%] text-[#64748B]"><span>${firstUpperCase(dataObject.status) === "Open" ? "Opened" : "Closed"}</span> by ${dataObject.author}</p>
                </div>
                <div class="flex items-center justify-center">
                    <span class="status"></span>
                </div>
                <div>
                    <p class="geist-font font-normal text-[12px] leading-[auto] tracking-[0%] text-[#64748B]">${new Date(dataObject.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
            <div class="flex items-center gap-1 flex-wrap">
                ${createLabelElements(dataObject.labels)}
            </div>
            <div>
                <p class="geist-font font-normal text-[16px] leading-[auto] tracking-[0%] text-[#64748B]">${dataObject.description}</p>
            </div>
            <div class="bg-[#F8FAFC] p-4 rounded-lg flex items-center justify-start">
                <div class="w-[50%]">   
                    <p class="geist-font font-normal text-[16px] leading-[auto] tracking-[0%] text-[#64748B]">Assignee:</p>
                    <p class="geist-font font-semibold text-[16px] leading-[auto] tracking-[0%] text-[#1F2937]">${dataObject.assignee}</p>
                </div>
                <div class="w-[50%]">
                    <p class="geist-font font-normal text-[16px] leading-[auto] tracking-[0%] text-[#64748B]">Priority:</p>
                    <div>
                        ${priorityCheck(dataObject.priority)}
                    </div>
                </div>
            </div>
            <div class="modal-action">
                <form method="dialog">
                    <button class="btn px-4 py-3 bg-[#4A00FF] rounded-sm geist-font font-semibold text-[16px] leading-[auto] tracking-[0%] text-[#FFFFFF] outline-none">Close</button>
                </form>
            </div>
        </div>
    `;
    myModal.showModal();
};


const showDetails = (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((detailsData) => {
            modal(detailsData.data);
        })
};