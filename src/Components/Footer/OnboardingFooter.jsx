import React from "react";
import styles from "./new_onboarding_footer.module.css";
import { Col, Row } from "react-bootstrap";
const OnboardingFooter = () => {
  return (
    <>
      <Row className={styles.on_boarding_footer}>
        <Col lg={4} sm={12} md={12}>
          About Digital Green
        </Col>
        <Col lg={4} sm={12} md={12}>
          About Farmstack
        </Col>
        <Col className={styles.bold} lg={4} sm={12} md={12}>
          Contact:{" "}
          <span className={styles.email_id}>farmstack@digitalgreen.org</span>
        </Col>
      </Row>
    </>
  );
};

export default OnboardingFooter;
