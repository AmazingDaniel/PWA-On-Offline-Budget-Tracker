let db;
const request =  window.indexedDB.open("budget", 1);

request.onsuccess = function (event) {
    db = event.target.result;

    if (navigator.onLine) {
        checkDatabase();
    }
};

request.onupgradeneeded = function (event) {
    const db = event.target.result;
    db.createObjectStore("pending", { autoIncrement: true });
};

request.onerror = function (event) {
    console.log("Wrong!" + event.target.errorCode);
};

function checkDatabase() {

    const deal = db.transaction(["pending"], "readwrite");
    const stock = deal.objectStore("pending");
    const getAll = stock.getAll();

    getAll.onsuccess = function () {

        if (getAll.result.length > 0) {
            console.log(getAll.result)
            fetch("/api/deal/bulk", {
                method: "POST",
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(() => {
                    const deal = db.transaction(["pending"], "readwrite");
                    const stock = deal.objectStore("pending");

                    stock.clear();
                });
        }
    };
}

function saveRecord(record) {
    const deal = db.transaction(["pending"], "readwrite");
    const stock = deal.objectStore("pending");

    stock.add(record);
}

window.addEventListener("online", checkDatabase)