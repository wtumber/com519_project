const searchView = (guide) => `
<div class="row mb-12" style="justify-content: center; margin-top:15px; ">
<div class="col-md-8">
          <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div class="col p-4 d-flex flex-column position-static">
              <strong class="d-inline-block mb-2 text-secondary">${guide.author} | ${guide.language}</strong>
              <h5 class="mb-0">${guide.title}</h5>              
              <div class="mb-1 text-muted">Recommended by <i>${guide.recommended_by}</i></div>
              <p class="card-text mb-auto">${guide.description}</p>
              <p class="card-text mb-auto">Difficulty: ${guide.difficulty}</p>
              <p class="card-text mb-auto">Format: ${guide.format}</p>
                <div>
                    <a href="${guide.link}" class="link link-secondary">Go to site</a>
                    | 
                    <a href="#" onclick="handleSave('${guide._id}')" class="link">
                    Save</a>
                    |
                    <a><i>(search match: ${guide.score})</i></a>
                </div>
            </div>
        </div>
    </div>
    </div>
`;


const handleClick = async () => {
    const searchVal = document.querySelector("#searchInput").value;
    try {
        const searchDomRef = document.querySelector('#searchItems');
        const ref = await fetch(`/api/search/?search=${searchVal}`);
        const searchResults = await ref.json();
        //console.log(searchResults)
        let searchHtml = [];
        searchResults.forEach(search => {
            searchHtml.push(searchView(search));
        });
        searchDomRef.innerHTML = searchHtml.join("");
    } catch (e) {
        console.log(e);
        console.log('could not search api');
    }

}


const handleSave = async (id) => {
    await fetch('/api/saved', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: id})
    })
  };