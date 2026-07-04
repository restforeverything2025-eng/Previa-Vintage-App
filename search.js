/*
=========================================================
PREVIA Search 2.0
Version: 1.0
Status: Development
=========================================================
*/

class SearchManager {

    constructor() {

        this.state = "HOME";

        console.log("SearchManager initialized");

    }

    enterSearchMode() {

        this.state = "SEARCH";

        document.body.classList.add("search-mode");

        console.log("Search Mode");

    }

    exitSearchMode() {

        this.state = "HOME";

        document.body.classList.remove("search-mode");

        console.log("Home Mode");

    }

}

window.Search = new SearchManager();