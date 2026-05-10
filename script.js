
let time = document.body.querySelector(".time");
let ele = document.body.querySelector('#loyal');
let formdata;
function getLiveState() {
    const d = new Date();
    return {
        hours: d.getHours(),
        minutes: d.getMinutes(),
        seconds: d.getSeconds(),
        formatted: d.toLocaleTimeString(),
        timestamp: d.getTime() 
    };
}


setInterval(() => {
    const timeState = getLiveState();
  
    
    time.textContent = `[${timeState.formatted}]`;
}, 1000);


function toggle() {

    let original = ele.textContent.trim() === 'LOYALITY';
    if (original) {
        ele.textContent = 'upto 10% cashback';
    } else {
        ele.textContent = 'LOYALITY';

    }
};
setInterval(toggle, 2000);



// Handle form submission
let form = document.body.querySelector("#submission");
if (form) {
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const data = new FormData(form);

        const bookingData = {
            origin_city: data.get('origin'),
            destination_city: data.get('destination_city'),
            travel_date: data.get('date'),
            train_class: data.get('classes'),
            quota: data.get('quota'),
            
        };

        try {
            const response = await fetch('http://localhost:3000/api/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingData)
            });

            const result = await response.json();
            if (result.success) {
                console.log('Booking created successfully:', result.data);
                alert('Booking submitted successfully!');
                form.reset();
            } else {
                alert('Error: ' + result.error);
            }
        } catch (error) {
            console.error('Error submitting booking:', error);
            alert('Error submitting booking');
        }
    });
}

