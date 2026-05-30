import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>Dashboard de Gestión</h1>
        <p>Bienvenido al sistema.</p>
      </header>
      
      <section className={styles.grid}>
        <div className={styles.card}>
          <h3>Métrica 1</h3>
          <p>0000</p>
        </div>
        <div className={styles.card}>
          <h3>Métrica 2</h3>
          <p>0000</p>
        </div>
      </section>
    </main>
  );
}
