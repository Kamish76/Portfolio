import profilePic from "../../public/JBZ.jpg";
import Image from "next/image";

export default function ProfileSection() {
  return (
    <section className="profile-section">
      <div className="profile-image-container">
        <Image
          src={profilePic}
          alt="Jabez Rafael Abella"
          className="profile-image"
        />
      </div>
      <div className="profile-intro">
        <h2>Jabez Rafael Abella</h2>
        <p>Computer Science Student | Aspiring Mobile Developer</p>
        <p>Tacloban City, Philippines</p>
        <p className="bio-text">
          Actively seeking and implementing solutions to improve quality of
          life.
        </p>
      </div>
    </section>
  );
}
