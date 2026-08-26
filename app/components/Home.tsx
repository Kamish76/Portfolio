import styles from "./Home.module.css";

export default function ProfileSection() {
  return (
    <div className={styles.homeHero}>
      <p className={styles.introKicker}>Hi, I&apos;m</p>

      <h1 className={styles.heroName}>
        JABEZ
        <br />
        RAFAEL
        <br />
        ABELLA
      </h1>
      <p className={styles.heroRole}>3rd Year BSCS Student</p>

      <p className={styles.heroSubtext}>
        Exploring web and mobile app development, embedded systems (ESP32, circuit prototyping), and 3D printing technologies. Currently seeking new development projects to expand my technical stack and gain hands-on production experience.
      </p>
      <div className={styles.heroLinks}>
        <a
          href="https://github.com/Kamish76"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/jabez-abella"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a href="mailto:jabezrafael1@gmail.com">Email</a>
      </div>
    </div>
  );
}
