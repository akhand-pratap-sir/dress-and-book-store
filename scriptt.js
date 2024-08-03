let total = 0;
let selectedItems = [];
let finalPrice=0;

function calculateTotal() {





                        // for date and time



// function displayDateTime() {
//     var now = new Date();
//     var dateTime = now.toLocaleString();
//     document.getElementById("dateTimee").value = dateTime;    //why are you consider it in calculateTatals function
// }



                    // Calculate books total



const bookForm = document.getElementById('book-form');
const bookInputs = bookForm.querySelectorAll('input[type="checkbox"]');
bookInputs.forEach(input => {
    if (input.checked) {
        total += parseInt(input.value);
        selectedItems.push(input.getAttribute('data-item'));
    }
});



                // Calculate dresses total



const dressForm = document.getElementById('dress-form');
const dressInputs = dressForm.querySelectorAll('input[type="number"]');
dressInputs.forEach(input => {
    const quantity = parseInt(input.value);
    const price = parseInt(input.getAttribute('data-price'));
    if (quantity > 0) {
        total += quantity * price;
        selectedItems.push(`${quantity} x ${input.closest('label').innerText.trim()} (₹${price} each)`);
    }
});




                 // Display total price



document.getElementById('total-price').innerText = 'Total Price: ₹' + total;

                    

                        // Display selected items



 const selectedItemsDiv = document.getElementById('selected-items');
selectedItemsDiv.innerHTML = '<h3>Selected Items:</h3>';
const ul = document.createElement('ul');
selectedItems.forEach(item => {
    const li = document.createElement('li');
    li.innerText = item;
    ul.appendChild(li);
});
selectedItemsDiv.appendChild(ul);




                        // Display detail and payment form



// const detailAndPaymentDiv = document.getElementById('detail-and-payment');
// detailAndPaymentDiv.innerHTML = `
//     <h3>Detail and Payment</h3>
//     <form id="payment-form">
//         <label>Name: <input type="text" name="name" required></label><br>
//         <label>Class: <input type="text" name="class" required></label><br>
//         <label>Roll No: <input type="text" name="rollno" required></label><br>
//         <label>Mobile Number: <input type="text" name="mobile" required></label><br>
//         <label>Father's Name: <input type="text" name="father" required></label><br>
//         <label>Village: <input type="text" name="village" required></label><br>
//         <label>datee: <input type="text" name="datee" required></label><br>
//         <label>Total Price: <input type="text" name="totalprice" value="${total}" readonly></label><br>
//         <label>Selected Items: <textarea name="selecteditems" readonly>${selectedItems.join(', ')}</textarea></label><br>
//         <button type="button" onclick="processPayment()">Pay Now</button>
//     </form>
// `;
}


                       //Discount 



function calculateFinalPrice() {
// let discount=0;

let selectdiscoutdiv=document.getElementById('discount-price');
let discountValue = parseFloat(selectdiscoutdiv.value);
finalPrice=total-discountValue;
// document.getElementById('final-price').innerText = 'Final Price: ₹' + discount.toFixed(2);

}






                       // Display detail and payment form


                    
function displayDetialandForm(){
let selectdiscoutdivv=document.getElementById('discount-price');
let discountRupes = parseFloat(selectdiscoutdivv.value);
const detailAndPaymentDiv = document.getElementById('detail-and-payment');
detailAndPaymentDiv.innerHTML = `
    <h3>Detail and Payment</h3>
    <form id="payment-form">
        <label>Name: <input type="text" name="name" required></label><br>
        <label>Class: <input type="text" name="class" required></label><br>
        <label>Roll No: <input type="text" name="rollno" required></label><br>
        <label>Mobile Number: <input type="text" name="mobile" required></label><br>
        <label>Father's Name: <input type="text" name="father" required></label><br>
        <label>Village: <input type="text" name="village" required></label><br>
        <label>Total Price: <input type="text" name="totalprice" value="${total}" readonly></label><br>
         <label>discount rupes: <input type="text" name="discount rupes" value="${discountRupes}" readonly></label><br>
         <label>Final Price: <input type="text" name="finalprice" value="${finalPrice}" readonly></label><br>
        <label>Selected Items: <textarea name="selecteditems" readonly>${selectedItems.join(', ')}</textarea></label><br>
        <button type="button" onclick="processPayment()">Pay Now</button>
    </form>
`;
}

                    //for Check internet



function checkInternetConnection() {
return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = 'https://www.google.com/favicon.ico' + new Date().getTime();
    img.onload = () => resolve(true);
    img.onerror = () => reject(false);
});
}





// function pp(){
//     let l=6+4;
//     return l;
// }

function processPayment() {
const paymentForm = document.getElementById('payment-form'); //**********************
if (paymentForm.checkValidity()) {
    const totalPrice = paymentForm.querySelector('input[name="totalprice"]').value;
    const selectedItems = paymentForm.querySelector('textarea[name="selecteditems"]').value;
    const formData = new FormData(paymentForm);//**********************
    const formDetails = {};
    formData.forEach((value, key) => {
        formDetails[key] = value;
    });

    // Clear the previous content in the payment form
    const detailAndPaymentDiv = document.getElementById('detail-and-payment');
    detailAndPaymentDiv.innerHTML = '';

    // Generate QR code
    const qrCodeImage = generateQRCode(totalPrice);

    // Append QR code to the payment div
    const qrDiv = document.createElement('div');
    qrDiv.innerHTML = `
        <h3>Scan QR Code to Pay</h3>
        <img src="${qrCodeImage}" alt="QR Code">
        <button id="payment-done-button">OK</button>
    `;
    detailAndPaymentDiv.appendChild(qrDiv);

    // Add event listener to the OK button
    document.getElementById('payment-done-button').addEventListener('click', () => {
        
    //     checkInternetConnection()
    // .then(() => {
    //     openPaymentDetailsTab(formDetails, totalPrice, selectedItems);
    //     sendDataToGoogleSheet(formDetails);
    // })
    // .catch(() => {
    //     alert('Please connect to the internet.');
    // });
    openPaymentDetailsTab(formDetails, totalPrice, selectedItems);
        sendDataToGoogleSheet(formDetails);
        
    });
} else {
    alert('Please fill out all required fields.');
}
}



             //QR-CODE SECTION



function generateQRCode(totalPrice) {
// This function should generate a QR code image URL
// For demo purposes, we'll use a placeholder image
// In a real application, you should use a QR code generation library or API
return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROcv6X9PLgqgf4TVyJfTIOeYTDTw2iEUA0cA&s';
}






                    //DISPLAY फ़ीस रसीद 


                


function openPaymentDetailsTab(formDetails, totalPrice, selectedItems,) {
let selectdiscoutdivv=document.getElementById('discount-price');
let discountRupes = parseFloat(selectdiscoutdivv.value);
const newTab = window.open('', '_blank');
newTab.document.write(`
    <html>
    <head>
        <title>Payment Details</title>
    
    </head>
    <body>
      
        <h1>Payment Details</h1>
        <p><strong>Date and Time: </strong>${document.getElementById("dateTimee").value}</p>
        <p><strong>Total Price:</strong> ${totalPrice}</p>
        <p><strong>final Price:</strong> ${finalPrice}</p>
          <p><strong>Selected Items:</strong> ${selectedItems}</p>
        <p><strong>discount Price:</strong> ${discountRupes}</p>
        <h3>Form Details:</h3>
        <ul>
           <li><strong>datee:</strong> ${formDetails.datee}</li>
            <li><strong>Name:</strong> ${formDetails.name}</li>
            <li><strong>Class:</strong> ${formDetails.class}</li>
            <li><strong>Roll No:</strong> ${formDetails.rollno}</li>
            <li><strong>Mobile Number:</strong> ${formDetails.mobile}</li>
            <li><strong>Father's Name:</strong> ${formDetails.father}</li>
            <li><strong>Village:</strong> ${formDetails.village}</li>
            
        </ul>
    
    </body>
    </html>
`);
}



                //Send data to DATA-BASE


                
function sendDataToGoogleSheet(formDetails) {
const url = 'https://script.google.com/macros/s/AKfycbyO4uAMfVC9PLBM-Cmfb6XLho7w4QhQkv5OKkCkc6ciYbwYvtF-TsPByY1MUbWGrPcL/exec';
const params = new URLSearchParams(formDetails);

fetch(`${url}?${params.toString()}`)
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            console.log('Data successfully added to Google Sheets');
        } else {
            console.error('Error:', data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}