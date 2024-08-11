// ContactAndAboutUs.js
import React from 'react';
import { WrapperContactAndAboutUs, ContactInfo, AboutUsInfo } from './style';
import { Col, Row } from 'react-bootstrap';

const ContactAndAboutUs = () => (
  <WrapperContactAndAboutUs>
    {/* Cột cho Instructors */}
    <Col xs={12} md={4} lg={4}>
      <ContactInfo>
        <h2>Instructors</h2>
        <div>
          <p>Nguyễn Văn A</p>
          <p>Email: nva@husc.edu.vn</p>
          <p>Phone: +123 456 789</p>     
        </div>
      </ContactInfo>
    </Col>

    {/* Cột cho Contact */}
    <Col xs={12} md={8} lg={4}>
      <ContactInfo>
        <h2>Contact</h2>
        <div>
          <p>Văn Viết Hiếu</p>
          <p>Email: 21@huc.edu.vn</p>
          <p>Phone: +123 456 789</p>
          <p>Mssv: 21</p>
        </div>
      </ContactInfo>
    </Col>

    {/* Cột cho About Us */}
    <Col xs={12} md={12} lg={4}>
      <AboutUsInfo>
        <h2>About Us</h2>
        <div>
          <p>Ngày bắt đầu Dự án Website: 23/6/2024</p>
        </div>
      </AboutUsInfo>
    </Col>
  </WrapperContactAndAboutUs>
);

export default ContactAndAboutUs;
