let customers = [];
let records = [];
let rooms = [
    { type: 'Standard Non-AC', price: 3000, available: 5 },
    { type: 'Standard AC', price: 4000, available: 5 },
    { type: '3-Bed Non-AC', price: 4500, available: 5 },
    { type: '3-Bed AC', price: 5000, available: 5 }
];

function showBooking() {
    let content = `
        <h2>BOOKING ROOMS</h2>
        <form id="bookingForm">
            <label>Name:</label>
            <input type="text" id="name" required>
            <label>Phone No.:</label>
            <input type="text" id="phone" required>
            <label>Address:</label>
            <input type="text" id="address" required>
            <label>Check-In:</label>
            <input type="date" id="checkin" required>
            <label>Check-Out:</label>
            <input type="date" id="checkout" required>
            <label>Room Type:</label>
            <select id="roomType">
                <option value="0">Standard Non-AC - ₹3000</option>
                <option value="1">Standard AC - ₹4000</option>
                <option value="2">3-Bed Non-AC - ₹4500</option>
                <option value="3">3-Bed AC - ₹5000</option>
            </select>
            <button type="button" onclick="bookRoom()">Book Room</button>
        </form>
    `;
    document.getElementById('content').innerHTML = content;
}

function bookRoom() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const roomIndex = document.getElementById('roomType').value;
    
    if (rooms[roomIndex].available > 0) {
        rooms[roomIndex].available--;
        const customerId = customers.length + 1;
        const roomNo = customerId + 100; // Example room number assignment
        customers.push({ name, phone, address, checkin, checkout, roomType: rooms[roomIndex].type, roomNo, customerId });
        
        alert(`Room Booked Successfully\nRoom No: ${roomNo}\nCustomer ID: ${customerId}`);
        showBooking();
    } else {
        alert('Selected room type is not available.');
    }
}

function showRoomsInfo() {
    let info = '<h2>ROOMS INFO</h2><ul>';
    rooms.forEach(room => {
        info += `<li>${room.type}: Available - ${room.available}</li>`;
    });
    info += '</ul>';
    document.getElementById('content').innerHTML = info;
}

function showRoomService() {
    let menu = `
        <h2>ROOM SERVICE (MENU CARD)</h2>
        <ul>
            <li>Sandwich - ₹150</li>
            <li>Pizza - ₹500</li>
            <li>Pasta - ₹300</li>
            <li>Salad - ₹200</li>
        </ul>
    `;
    document.getElementById('content').innerHTML = menu;
}

function showPayment() {
    let paymentForm = `
        <h2>Payment</h2>
        <form id="paymentForm">
            <label>Phone Number:</label>
            <input type="text" id="paymentPhone" required>
            <button type="button" onclick="processPayment()">Find Customer</button>
        </form>
        <div id="paymentInfo"></div>
    `;
    document.getElementById('content').innerHTML = paymentForm;
}

function processPayment() {
    const phone = document.getElementById('paymentPhone').value;
    const customer = customers.find(c => c.phone === phone);
    
    if (!customer) {
        alert('No customer found with this phone number.');
        return;
    }
    
    let roomType = rooms.find(room => room.type === customer.roomType);
    let roomCharges = roomType.price * 3; // Example calculation for 3 days
    
    let paymentInfo = `
        <h3>Payment Information</h3>
        <p>Customer Name: ${customer.name}</p>
        <p>Room Type: ${customer.roomType}</p>
        <p>Room Charges: ₹${roomCharges}</p>
        <label>MODE OF PAYMENT</label>
        <select id="paymentMode">
            <option value="Card">Credit/Debit Card</option>
            <option value="Paytm">Paytm/PhonePe</option>
            <option value="UPI">Using UPI</option>
            <option value="Cash">Cash</option>
        </select>
        <button type="button" onclick="confirmPayment(${roomCharges}, '${customer.name}', '${customer.phone}', '${customer.roomType}')">Confirm Payment</button>
    `;
    
    document.getElementById('paymentInfo').innerHTML = paymentInfo;
}

function confirmPayment(amount, name, phone, roomType) {
    let confirm = window.confirm(`Total Amount: ₹${amount}\nConfirm Payment?`);
    if (confirm) {
        records.push({ name, phone, roomType, amount });
        alert('Payment Successful! Thank you for your stay.');
        document.getElementById('content').innerHTML = '';
    } else {
        alert('Payment Cancelled.');
    }
}

function showRecord() {
    let recordContent = '<h2>RECORDS</h2>';
    if (records.length === 0) {
        recordContent += '<p>No records found.</p>';
    } else {
        recordContent += '<ul>';
        records.forEach(record => {
            recordContent += `<li>Name: ${record.name}, Phone: ${record.phone}, Room Type: ${record.roomType}, Amount Paid: ₹${record.amount}</li>`;
        });
        recordContent += '</ul>';
    }
    document.getElementById('content').innerHTML = recordContent;
}

function exitSystem() {
    alert('Thank you for visiting Pakistan Hotel!');
    document.getElementById('content').innerHTML = '';
}
