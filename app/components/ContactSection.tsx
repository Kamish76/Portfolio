export default function ContactSection() {
  return (
    <div className="contact-section content-section">
      <h3>Get In Touch</h3>
      <p>Feel free to reach out! You can find me on:</p>
      <div className="row">
        <div className="column">
          <ul className="contact-links">
            <li>
              <a
                href="https://linkedin.com/in/jabez-abella"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn: linkedin.com/in/jabez-abella
              </a>
            </li>
            <li>
              <a href="mailto:jabezrafael1@gmail.com">
                Email: jabezrafael1@gmail.com
              </a>
            </li>
          </ul>
        </div>
        <div className="column">
          <ul className="contact-links">
            <li>
              <span>Phone: +63 9999806222</span>
            </li>
            <li>
              <a
                href="https://github.com/Kamish76"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub: https://github.com/Kamish76
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
