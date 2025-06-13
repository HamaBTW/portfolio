import React, { useState } from 'react';
import { personalInfo } from '../../data/personal';

interface ContactProps {}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC<ContactProps> = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="s-contact target-section">
      <div className="row contact-top">
        <div className="column lg-12">
          <h2 className="text-pretitle">
            Connect with Me
          </h2>

          <p className="h1">
            Let's Connect and Innovate<br />
            Have an idea, a project, or a passion for cutting-edge technology? Let's collaborate to create something remarkable.
          </p>
        </div>
      </div>

      <div className="row contact-bottom">
        <div className="column lg-3 md-5 tab-6 stack-on-550 contact-block">
          <h3 className="text-pretitle">Get in Touch</h3>
          <p className="contact-links">
            <a href={`mailto:${personalInfo.email}`} className="mailtoui">{personalInfo.email}</a> <br />
            {personalInfo.phone && (
              <a href={`tel:${personalInfo.phone.replace(/\s/g, '')}`}>{personalInfo.phone}</a>
            )}
          </p>
        </div>
        <div className="column lg-4 md-5 tab-6 stack-on-550 contact-block">
          <h3 className="text-pretitle">Find Me Online</h3>
          <ul className="contact-social">
            {personalInfo.socialLinks.map((link, index) => (
              <li key={index}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="column lg-4 md-12 contact-block">
          <a href={`mailto:${personalInfo.email}`} className="mailtoui btn btn--medium u-fullwidth contact-btn">Say Hello</a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
