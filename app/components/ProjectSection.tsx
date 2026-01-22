export default function ProjectSection() {
  return (
    <section className="projects-section content-section">
      <h3>Projects</h3>
      <div className="project-entry">
        <h4><a href="https://github.com/Kamish76/Financial-tracker-ProjectDec1025" target="_blank" rel="noopener noreferrer">OrgFinance</a></h4>
        <p> Multi-tenant financial tracker for small teams that cleanly separates business funds from personal out-of-pocket contributions, supports reimbursements, held allocations, and per-member balances; built with Next.js 16, React 19, TypeScript, Tailwind (Shadcn UI), and Supabase (Postgres, Auth, RLS).
        </p>
      </div>
      <div className="project-entry">
        <h4>
          <a href="https://github.com/CSci-153-Web-Systems-and-Technologies/batch-2025-nfc-attendance-system-web" target="_blank" rel="noopener noreferrer">
            NFCentry: NFC-Based Attendance Management System
          </a>
        </h4>
        <p>NFCentry is a production-ready, Mobile Approach, full-stack web application that revolutionizes event attendance tracking using NFC technology, QR codes, and manual entry methods. The system eliminates traditional time-consuming attendance methods by providing automated, real-time check-ins through a mobile-first web interface.
        </p>
      </div>
      <div className="project-entry">
        <h4>Power Bank Monitoring (ESP32-C3 & INA226)</h4>
        <p>
          Developed an Arduino-based, low-power solution for the ESP32-C3
          microcontroller to accurately monitor power bank battery, voltage,
          amperage, and wattage. Includes calibration code to fine-tune INA226
          sensor readings for improved accuracy and efficiency.
        </p>
      </div>
      <div className="project-entry">
        <h4>G-Code for Multi-Material Prints (Non-AMS)</h4>
        <p>
          Experimental G-code for Bambu Labs A1 printers to enable
          multi-material printing without an AMS, automating filament change
          pauses and allowing mid-layer swaps.
        </p>
      </div>
    </section>
  );
}
