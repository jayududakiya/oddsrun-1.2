import React from "react";
import styles from "./Footer.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Stack } from "react-bootstrap";
import { Icon } from "@iconify/react";
import LOGO from "../../assets/logo-footer.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className={`${styles.footerBg}`}>
        <Stack direction="horizontal" gap={3} className={styles.footerDisplay}>
          <div>
            <div className={` ${styles.footerLogo}`}>OddsRun</div>
          </div>
          <Stack
            direction="horizontal"
            gap={3}
            className={`${styles.footerDisplay} ${styles.faq}  ms-auto `}
          >
            <Stack direction="horizontal" gap={3}>
              <Link to="/faq" className={`p-2  ${styles.footerItem}`}>
                FAQ
              </Link>
              <div className={`vr ${styles.footerVr}`} />
              <Link to="/termsofuse" className={`p-2 ${styles.footerItem}`}>
                Terms of Use
              </Link>
              <div className={`vr ${styles.footerVr}`} />
              <Link to="/setprivacy" className={`p-2 ${styles.footerItem}`}>
                Set Privacy
              </Link>
            </Stack>
            <Stack direction="horizontal" gap={3}>
              <div className={`vr ${styles.footerVr}`} />
              <Link to="/webmasters" className={`p-2 ${styles.footerItem}`}>
                Web Masters
              </Link>
              <div className={`vr ${styles.footerVr}`} />
              <Link to="/contact" className={`p-2 ${styles.footerItem}`}>
                Contact
              </Link>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          direction="horizontal"
          className={`${styles.footerDisplay} flex-wrap  justify-content-between `}
        >
          <div className={`${styles.footerDiscription} `}>
            The best betting odds! You can compare sports odds and lines across
            all bookmakers and betting sites. Go for the highest odds for
            Football, Tennis, esport, NFL and more !
          </div>
          <Stack
            direction="horizontal"
            className=" justify-content-center mt-3 flex-wrap"
            gap={2}
          >
            <div className={styles.logoNotDisplay}>
              <img src={LOGO} height={65} alt="LOGO" />
            </div>
            <a href="#" className={styles.footerSocialMedia}>
              <Icon
                icon="mingcute:twitter-fill"
                className={styles.socialMediaIcon}
              />
            </a>
            <a href="#" className={styles.footerSocialMedia}>
              <Icon
                icon="iconoir:mail-solid"
                className={styles.socialMediaIcon}
              />
            </a>
            <a href="#" className={styles.footerSocialMedia}>
              <Icon
                icon="flowbite:linkedin-solid"
                className={styles.socialMediaIcon}
              />
            </a>
            <a href="#" className={styles.footerSocialMedia}>
              <Icon
                icon="lucide:instagram"
                className={styles.socialMediaIcon}
              />
            </a>
          </Stack>
          <div className={styles.footerLogo}>
            <img src={LOGO} height={50} alt="LOGO" />
          </div>
        </Stack>
        <hr></hr>
        <div className="text-center mt-2">Copyright © 2023 OddsRun.com</div>
      </div>
    </>
  );
};

export default Footer;
