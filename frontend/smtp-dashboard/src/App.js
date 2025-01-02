import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [emailData, setEmailData] = useState({
        to: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        setEmailData({ ...emailData, [e.target.name]: e.target.value });
    };

    const sendEmail = async () => {
        try {
            const response = await axios.post('http://localhost:3000/send-email', emailData);
            alert('Email sent successfully!');
            console.log(response.data);
        } catch (error) {
            alert('Failed to send email');
            console.error(error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>SMTP Email Service</h1>
            <input
                type="email"
                name="to"
                placeholder="Recipient Email"
                value={emailData.to}
                onChange={handleChange}
            />
            <br />
            <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={emailData.subject}
                onChange={handleChange}
            />
            <br />
            <textarea
                name="message"
                placeholder="Message"
                value={emailData.message}
                onChange={handleChange}
            />
            <br />
            <button onClick={sendEmail}>Send Email</button>
        </div>
    );
}

export default App;
