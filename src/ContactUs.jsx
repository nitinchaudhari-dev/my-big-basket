import React, { useState } from 'react';

function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Thank you for contacting us!');
        setFormData({ name: '', email: '', message: '' });
    };

    // Inline Styles
    const containerStyle = {
        maxWidth: '500px',
        margin: '60px auto',
        padding: '30px',
        borderRadius: '12px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
        fontFamily: '"Segoe UI", sans-serif',
        color: '#333'
    };

    const headingStyle = {
        textAlign: 'center',
        marginBottom: '20px'
    };

    const inputGroupStyle = {
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column'
    };

    const labelStyle = {
        marginBottom: '6px',
        fontWeight: '500'
    };

    const inputStyle = {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '6px',
        fontSize: '15px'
    };

    const textAreaStyle = {
        ...inputStyle,
        resize: 'vertical',
        minHeight: '100px'
    };

    const buttonStyle = {
        padding: '12px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '15px',
        transition: 'background-color 0.3s ease'
    };

    return (
        <div style={containerStyle}>
            <h2 style={headingStyle}>If you have any issue, contact the following number:</h2>
            <h3 style={{ textAlign: 'center', color: '#007bff', marginBottom: '30px' }}>8669031090</h3>

            <form onSubmit={handleSubmit}>
                <div style={inputGroupStyle}>
                    <label htmlFor="name" style={labelStyle}>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>

                <div style={inputGroupStyle}>
                    <label htmlFor="email" style={labelStyle}>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>

                <div style={inputGroupStyle}>
                    <label htmlFor="message" style={labelStyle}>Message:</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        style={textAreaStyle}
                    />
                </div>

                <button
                    type="submit"
                    style={buttonStyle}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
                >
                    Send Message
                </button>
            </form>
        </div>
    );
}

export default ContactUs;

