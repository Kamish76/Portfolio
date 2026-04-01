import styles from "./Home.module.css";

export default function ProfileSection() {
  return (
    <section className={styles.homeHero} id="home">
      <p className={styles.introKicker}>Hi, I&apos;m</p>

      <h1 className={styles.heroName}>
        JABEZ
        <br />
        RAFAEL
        <br />
        ABELLA
      </h1>
      <p className={styles.heroRole}>Building for Web & Mobile</p>

      <p className={styles.heroSubtext}>
        Building practical systems with modern web technologies and embedded
        hardware.
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
    </section>
  );
}
