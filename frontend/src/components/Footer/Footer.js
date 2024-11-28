import React from "react";
import styles from "./Footer.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Stack } from "react-bootstrap";
import { Icon } from "@iconify/react";
import LOGO from "../../assets/logo-footer.png";

const Footer = () => {
  return (
    <>
      <div className={`${styles.footerBg}`}>
        <Stack direction="horizontal" gap={3} className={styles.footerDisplay}>
          <div>
            <div className={` ${styles.footerLogo}`}>OddsRun</div>
          </div>
          <Stack direction="horizontal" gap={3} className={`${styles.footerDisplay} ${styles.faq}  ms-auto `} >
            <Stack direction="horizontal" gap={3}>
              <div className={`p-2  ${styles.footerItem}`}>FAQ</div>
              <div className={`vr ${styles.footerVr}`} />
              <div className={`p-2 ${styles.footerItem}`}>Terms of Use</div>
              <div className={`vr ${styles.footerVr}`} />
              <div className={`p-2 ${styles.footerItem}`}>Set Privacy</div>
            </Stack>
            <Stack direction="horizontal" gap={3}>
              <div className={`vr ${styles.footerVr}`} />
              <div className={`p-2 ${styles.footerItem}`}>Web Masters</div>
              <div className={`vr ${styles.footerVr}`} />
              <div className={`p-2 ${styles.footerItem}`}>Contact</div>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction="horizontal" className={styles.footerDisplay}>
          <div className={`${styles.footerDiscription}`}>
            The best betting odds! You can compare sports odds and lines across
            all bookmakers and betting sites. Go for the highest odds for
            Football, Tennis, esport, NFL and more !
          </div>
          <Stack direction="horizontal" className="ms-auto mt-3" gap={2}>
            <div className={styles.logoNotDisplay}>
              <img src={LOGO} height={65} />
            </div>
            <div className={styles.footerSocialMedia}>
              <Icon icon="mingcute:twitter-fill" className={styles.socialMediaIcon} />
            </div>
            <div className={styles.footerSocialMedia}>
              <Icon icon="iconoir:mail-solid" className={styles.socialMediaIcon} />
            </div>
            <div className={styles.footerSocialMedia}>
              <Icon icon="flowbite:linkedin-solid" className={styles.socialMediaIcon} />
            </div>
            <div className={styles.footerSocialMedia}>
              <Icon icon="lucide:instagram" className={styles.socialMediaIcon} />
            </div>
          </Stack>
          <div className={styles.footerLogo}>
            <img src={LOGO} height={50} />
          </div>
        </Stack>
        <hr></hr>
        <div className="text-center mt-2">Copyright © 2023 OddsRun.com</div>
      </div>
    </>
  );
};

export default Footer;
