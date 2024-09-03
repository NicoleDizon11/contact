
function addorUpdate() {
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    
    const xhr = new XMLHttpRequest();
    const url = id ? "update.php" : "create.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
            loadTable();
        }
    };
    xhr.send("id=" + id + "&name=" + name + "&address=" + address + "&phone=" + phone);
}


function loadTable() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "read.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.querySelector("#crudTable tbody").innerHTML = xhr.responseText;
        }
    };
    xhr.send();
}

function editRecord(id) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "getRecord.php?id=" + id, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = xhr.responseText;
            console.log("Server response:", response); // Log the response
            if (response) {
                try {
                    const record = JSON.parse(response);
                    console.log("Parsed record:", record); // Log the parsed record
                    
                    const idElem = document.getElementById('id');
                    const nameElem = document.getElementById('name');
                    const addressElem = document.getElementById('address');
                    const phoneElem = document.getElementById('phone');
                    
                    console.log("Elements:", { idElem, nameElem, addressElem, phoneElem }); // Log elements
                    
                    if (idElem && nameElem && addressElem && phoneElem) {
                        idElem.value = record.id;
                        nameElem.value = record.name;
                        addressElem.value = record.address;
                        phoneElem.value = record.phone;
                    } else {
                        console.error("One or more elements are not found in the DOM.");
                    }
                } catch (e) {
                    console.error("Error parsing JSON response: ", e);
                }
            } else {
                console.error("Empty response from server.");
            }
        }
    };
    xhr.send();
}



function deleteRecord(id) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "delete.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
            loadTable();
        }
    };
    xhr.send("id=" + id);
}

window.onload = function() {
    loadTable();
};