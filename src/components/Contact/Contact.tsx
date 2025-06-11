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
            <a href="mailto:abidi.mohamed.business@gmail.com" className="mailtoui">abidi.mohamed.business</a> <br />
            <a href="tel:+21693213636">+216 93 213 636</a>
          </p>
        </div>
        <div className="column lg-4 md-5 tab-6 stack-on-550 contact-block">
          <h3 className="text-pretitle">Find Me Online</h3>
          <ul className="contact-social">
            <li><a href="https://www.linkedin.com/in/med-abidi/">LinkedIn</a></li>
            <li><a href="https://github.com/HamaBTW">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/med-abidi/">Facebook</a></li>
            <li><a href="https://www.tache-lik.tn">TacheLik</a></li>
          </ul>
        </div>
        <div className="column lg-4 md-12 contact-block">
          <a href="mailto:abidi.mohamed.business@gmail.com" className="mailtoui btn btn--medium u-fullwidth contact-btn">Say Hello</a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
