import React from 'react';
import styles from './FooterStateData.module.css'; // Importing CSS module for styling

function FooterStateData() {
  return (
    <div> {/* Main wrapper for the footer */}
      <div className={styles.init}> {/* Container for footer content */}
        <div className={styles.initPowered}> {/* Text section */}
          Powered by: explainable AI
        </div>
        <div className={styles.initNimble}> {/* Logo section */}
          <img src={'/img/NimbleNovaLogo.png'} alt="NimbleNovaLogo" /> {/* Company Logo */}
        </div>
      </div> 
    </div>
  );
}

export default FooterStateData; // Exporting FooterStateData component for use in other parts of the app
