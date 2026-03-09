const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', () => {
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value.trim().toLowerCase();

    if(searchValue === "") {
        alert("Please enter a search term!");
        return;
    }

    manageLoading(true);
    removeActiveButton();
    // document.getElementById('all-button').classList.add('active-button');
    document.getElementById('all-issues-container').classList.remove('hidden');
    document.getElementById('all-issues-container').classList.add('grid');
    document.getElementById('open-issues-container').classList.add('hidden');
    document.getElementById('open-issues-container').classList.remove('grid');
    document.getElementById('closed-issues-container').classList.add('hidden');
    document.getElementById('closed-issues-container').classList.remove('grid');
    document.getElementById('all-count').classList.remove('hidden');
    document.getElementById('open-count').classList.add('hidden');
    document.getElementById('closed-count').classList.add('hidden');

    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`;
    fetch(url)
        .then((response) => response.json())
        .then((searchResults) => {
            const filteredData = searchResults.data.filter(data => data.title.toLowerCase().includes(searchValue));
            const number = filteredData.length;

            if(number === 0) {
                document.getElementById('all-issues-container').innerHTML = `
                    <div class="flex justify-center items-center text-2xl font-bold text-red-500">
                        <p class="text-center">No issues found</p>
                    </div>
                `;
                document.getElementById('all-issue-count').innerText = 0;
                manageLoading(false);
                clearSearchValue();
                return;
            }
            displayAllIssues(filteredData);
        });
});

const clearSearchValue = () => {
    const searchInput = document.getElementById('search-input');
    searchInput.value = "";
    manageLoading(false);
}