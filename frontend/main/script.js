const openMenuButton = document.querySelector(".bar-icon");
const navMenu = document.querySelector(".nav-menu");
const btnLogout = document.querySelector(".btnLogout");
const btnMessaged = document.querySelector(".btnMessaged");


btnMessaged.addEventListener("click", () => {
    window.location.href = "messaged.html"
});

btnLogout.addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "index.html";
})

navMenu.style.maxHeight = "0px";
openMenuButton.addEventListener("click", () => {
    toggleMenu();
});

function toggleMenu() {
    if (navMenu.style.maxHeight === "0px") {
        navMenu.style.maxHeight = "800px";
    } else {
        navMenu.style.maxHeight = "0px";
    }
}

//http://localhost:8001/message/readReplied
//http://localhost:8001/message/readMessage
//http://localhost:8001/message/deleteMessage

const messageContainer = document.querySelector(".message-container");

function deleteMessage(messageId) {
    fetch("https://voxifytechclient.onrender.com/message/deleteMessage", {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messageId: messageId })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        // Optionally, refresh the messages list after deletion
        readMessages();
    })
    .catch(error => {
        console.error("Error Deleting Message:", error);
    });
}

function updateStatus(messageId) {
    fetch("https://voxifytechclient.onrender.com/message/updateStatus", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messageId: messageId })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); 
    })
    .then(data => {
        console.log(data);
        readMessages();
    })
    .catch(error => {
        console.error('There was a problem with the update operation:', error);
    });
}

function readMessages() {
    fetch("https://voxifytechclient.onrender.com/message/readMessage", {
        method: "GET",
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); 
    })
    .then(data => {
        console.log(data);
        messageContainer.innerHTML = ''; // Clear the container before appending new content

        for(let i = 0; i < data.length; i++) {
            messageContainer.innerHTML += `
            <div class="bg-white shadow-md mb-4 p-4">
                <p class="font-bold">Name: ${data[i].name}</p>
                <p class="font-semibold text-wrap">Email: ${data[i].email}</p>
                <p>Message</p>
                <div class="border-gray-200 border p-4">
                    <p>${data[i].message}</p>
                </div>
                <div class="flex mt-2 gap-2">
                    <button onclick="deleteMessage('${data[i]._id}')" class="p-2 bg-red-600 hover:bg-red-800 active:bg-red-900 text-white rounded-sm">Delete</button>
                    <button onclick="openModal('${data[i]._id}', '${data[i].email}')" class="bg-green-600 active:bg-green-950 hover:bg-green-800 p-2 text-white">Reply</button>
                </div>
            </div>
            `;
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

    let currentReplyId = null;
    let currentReplyEmail = null;

    function openModal(id, email) {
        currentReplyId = id;
        currentReplyEmail = email;
        document.getElementById('replyEmail').innerText = `Reply to ${email}`;
        document.getElementById('replyModal').classList.remove('hidden');
    }

    function closeModal() {
        document.getElementById('replyModal').classList.add('hidden');
        currentReplyId = null;
        currentReplyEmail = null;
        document.getElementById('replyMessage').value = '';
    }

const serviceID = "service_kq1s4tp"
const templateID = "template_ck1xbd9"
emailjs.init("tHYZQ2tbvWe-QIlej"); //initializing API

    function sendReply() {
        const replyMessage = document.getElementById('replyMessage').value; //the message
        if (replyMessage.trim() !== "") {

            updateStatus(currentReplyId);
            var params = {
                to: currentReplyEmail,
                replyto: "User",
                message: replyMessage
            }

            emailjs.send(serviceID, templateID, params)
            .then(res => {
                
                alert("Email Sent", currentReplyId);
            })
            .catch();
            closeModal();
        } else {
            alert("Please enter a reply message.");
        }
    }

    function renderPage() {
        if(sessionStorage.getItem("isLoggedIn")) {
            readMessages();
        } else {
            alert("log in first");
        }
    }
            
renderPage();


//console.log(sessionStorage.getItem("isLoggedIn"))