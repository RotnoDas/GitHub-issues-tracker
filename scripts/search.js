const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', () => {
    removeActiveButton();
    manageLoading(true);
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value.trim().toLowerCase();
    if(searchValue === "") {
        loadAllIssues();
        const allButton = document.getElementById("all-button");
        allButton.classList.add("active-button");
        return;
    }
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((searchResults) => {
            const allData = searchResults.data;
            const filteredData = allData.filter((data) => {
                const titleMatch = data.title.toLowerCase().includes(searchValue);
                return titleMatch;
            });
            const number = filteredData.length;
            const allCount = document.getElementById('all-issue-count');
            allCount.innerText = number;
            if(number === 0) {
                const allIssuesContainer = document.getElementById('all-issues-container');
                allIssuesContainer.innerHTML = `
                    <div class="flex justify-center items-center text-2xl font-bold text-red-500">
                        <p class="text-center">No issues found</p>
                    </div>
                `;
                manageLoading(false);
                clearSearchValue();
                return;
            }
            displayAllIssues(filteredData);
            manageLoading(false);
        })
});

const clearSearchValue = () => {
    const searchInput = document.getElementById('search-input');
    searchInput.value = "";
    manageLoading(false);
}