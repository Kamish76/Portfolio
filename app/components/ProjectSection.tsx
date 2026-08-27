export default function ProjectSection() {
  return (
    <div className="projects-section content-section">
      <h3>Projects</h3>
      <div className="project-entry">
        <h4><a href="https://github.com/Kamish76/Financial-tracker-ProjectDec1025" target="_blank" rel="noopener noreferrer">OrgFinance (Web Platform)</a></h4>
        <p>A comprehensive, multi-tenant web application for individuals, student groups, and small businesses to track finances. It distinguishes between business/operational expenses and out-of-pocket personal contributions, while also offering a specialized single-tenant Personal Wallet Mode.</p>
        <ul className="project-details">
          <li><strong>Role:</strong> Sole Developer</li>
          <li><strong>Tech Stack:</strong> Next.js 16, React 19, TypeScript, Tailwind CSS 4, Shadcn UI, Supabase</li>
          <li><strong>Results:</strong> Engineered robust financial logic for collaborative environments and implemented automated Vercel Cron Jobs to ensure database uptime and resilience.</li>
        </ul>
      </div>
      <div className="project-entry">
        <h4><a href="https://github.com/Kamish76/Wallet-tracker-ProjectJuly29-.git" target="_blank" rel="noopener noreferrer">OrgWallet (Android Companion App)</a></h4>
        <p>The official mobile companion app to OrgFinance, designed for fast, offline-first personal expense tracking on the go. It utilizes local SQLite storage with a smart background synchronization engine to sync with the main Supabase backend when online.</p>
        <ul className="project-details">
          <li><strong>Role:</strong> Sole Developer</li>
          <li><strong>Tech Stack:</strong> React Native, Expo (Expo Router), TypeScript, SQLite</li>
          <li><strong>Results:</strong> Delivered a seamless offline-first mobile experience with reliable conflict resolution and unified authentication across the ecosystem.</li>
        </ul>
      </div>
      <div className="project-entry">
        <h4>
          <a href="https://github.com/CSci-153-Web-Systems-and-Technologies/batch-2025-nfc-attendance-system-web" target="_blank" rel="noopener noreferrer">
            NFCentry: NFC-Based Attendance Management System
          </a>
        </h4>
        <p>A production-ready, mobile-first full-stack web application that revolutionizes event attendance tracking using NFC technology, QR codes, and manual entry methods.</p>
        <ul className="project-details">
          <li><strong>Role:</strong> Sole Developer</li>
          <li><strong>Tech Stack:</strong> Web NFC API, React, Next.js, Node.js</li>
          <li><strong>Results:</strong> Eliminated traditional time-consuming attendance methods by providing automated, real-time check-ins for users.</li>
        </ul>
      </div>
      <div className="project-entry">
        <h4>Power Bank Monitoring (ESP32-C3 & INA226)</h4>
        <p>An Arduino-based, low-power solution for the ESP32-C3 microcontroller to accurately monitor power bank battery, voltage, amperage, and wattage.</p>
        <ul className="project-details">
          <li><strong>Role:</strong> Sole Developer</li>
          <li><strong>Tech Stack:</strong> C++, Arduino, ESP32-C3, INA226 Sensor</li>
          <li><strong>Results:</strong> Achieved highly accurate sensor readings through custom calibration code, optimizing power efficiency.</li>
        </ul>
      </div>
      <div className="project-entry">
        <h4>G-Code for Multi-Material Prints (Non-AMS)</h4>
        <p>Experimental G-code for Bambu Labs A1 printers to enable multi-material printing without an AMS, automating filament change pauses and allowing mid-layer swaps.</p>
        <ul className="project-details">
          <li><strong>Role:</strong> Sole Developer</li>
          <li><strong>Tech Stack:</strong> G-code, Bambu Studio</li>
          <li><strong>Results:</strong> Enabled seamless multi-color 3D prints without requiring expensive AMS hardware upgrades.</li>
        </ul>
      </div>
    </div>
  );
}
