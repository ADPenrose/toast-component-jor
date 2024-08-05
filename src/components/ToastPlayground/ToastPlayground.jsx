import React from "react";

import Button from "../Button";
import ToastShelf from "../ToastShelf";
import { ToastContext } from "../ToastProvider";

import styles from "./ToastPlayground.module.css";
import toastUrl from "../../assets/toast.png";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [message, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);

  const { createToast } = React.useContext(ToastContext);

  function handleSubmit(event) {
    event.preventDefault();

    if (!message) {
      return;
    }

    createToast(message, variant);
    setMessage("");
    setVariant(VARIANT_OPTIONS[0]);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src={toastUrl} />
        <h1>Toast Playground</h1>
      </header>

      {/* TODO: Implement working solution */}
      <ToastShelf />

      <form
        className={styles.controlsWrapper}
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {/*  Variant radio buttons here */}
            {VARIANT_OPTIONS.map((opt) => (
              <label htmlFor={`variant-${opt}`} key={opt}>
                <input
                  id={"variant-${opt}"}
                  type="radio"
                  name="variant"
                  value={opt}
                  checked={opt === variant}
                  onChange={(e) => setVariant(e.target.value)}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
