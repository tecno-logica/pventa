import styles from "../styles/Home.module.css";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../src/utils/createUrqlClient";

export default withUrqlClient(createUrqlClient, { ssr: false })(
  function Home() {
    return <div className={styles.container}>Inventory App</div>;
  }
);
