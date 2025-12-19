import "../Styles/contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>

      <div className="contact-info">
        <h2>Get in Touch</h2>
        <p>Have questions or feedback? Reach out to us!</p>

        <div className="contact-details">
          <div className="contact-item">
            <label>Email:</label>
            <p>akileshakileshs1234@gmail.com</p>
          </div>

          <div className="contact-item">
            <label>Phone:</label>
            <p>6379276131</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
