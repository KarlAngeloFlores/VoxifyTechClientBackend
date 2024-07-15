const btnHome = document.querySelector(".btnHome");
const messageContainer = document.querySelector(".message-container");

btnHome.addEventListener("click", () => {
    window.location.href = "home.html"
});

//http://localhost:8001/message/readReplied
//http://localhost:8001/message/updateStatus

function readRepliedMessages() {
    

    fetch("http://localhost:8001/message/readReplied", {
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
                    
                </div>
            </div>
            `;
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

}


function deleteMessage(messageId) {
    fetch("http://localhost:8001/message/deleteMessage", {
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
        readRepliedMessages();
    })
    .catch(error => {
        console.error("Error Deleting Message:", error);
    });
}

/**functions */
readRepliedMessages();