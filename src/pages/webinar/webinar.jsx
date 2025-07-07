import React, { useState } from "react";
import styles from "./webinar.module.css";

export default function Webinar() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    position: "",
    phone: "",
    interests: [],
    marketingConsent: false,
  });

  const [isRegistered, setIsRegistered] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleInterestChange = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration submitted:", formData);
    setIsRegistered(true);
  };

  if (isRegistered) {
    return (
      <div className={styles.container}>
        <div className={styles.successMessage}>
          <div className={styles.successIcon}>
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="40" fill="#59BBA8" />
              <path
                d="M25 40L35 50L55 30"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1>Registration Confirmed!</h1>
          <p>Thank you for registering for our exclusive webinar.</p>
          <p>You'll receive a confirmation email with the webinar link shortly.</p>
          <button onClick={() => setIsRegistered(false)} className={styles.backButton}>
            Register Another Attendee
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Banner Section */}
      <section className={styles.banner}>
        <div className={styles.bannerBackground}>
          <img src="/images/aviation-banner.png" alt="Aviation Banner" className={styles.bannerImage} />
          <div className={styles.bannerOverlay}>
            <div className={styles.bannerContent}>
              <div className={styles.bannerText}>
                <h1 className={styles.bannerTitle}>
                  EMPOWERING AVIATION
                  <br />
                  <span className={styles.bannerSubtext}>professionals with</span>
                  <br />
                  <span className={styles.bannerScript}>Confidence and Strategy</span>
                </h1>
                <p className={styles.bannerDescription}>
                  From operational planning to premium onboard service, we design each flight experience to meet your
                  unique needs.
                </p>
                <div className={styles.bannerFeatures}>
                  <div className={styles.featureItem}>
                    <div className={styles.featureIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#B38D2F" strokeWidth="2" />
                        <path d="M8 12L11 15L16 9" stroke="#B38D2F" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span>Regional Expertise</span>
                  </div>
                  <div className={styles.featureItem}>
                    <div className={styles.featureIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#B38D2F" strokeWidth="2" />
                        <polyline points="12,6 12,12 16,14" stroke="#B38D2F" strokeWidth="2" />
                      </svg>
                    </div>
                    <span>On-time Performance</span>
                  </div>
                  <div className={styles.featureItem}>
                    <div className={styles.featureIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#B38D2F" strokeWidth="2" />
                        <path d="M9 12L11 14L15 10" stroke="#B38D2F" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span>Quality Service</span>
                  </div>
                </div>
                <button className={styles.readMoreButton}>READ MORE</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exclusive Webinar Section */}
      <section className={styles.webinarSection}>
        <div className={styles.sectionContent}>
          <div className={styles.webinarHeader}>
            <div className={styles.badge}>EXCLUSIVE WEBINAR</div>
            <h2 className={styles.webinarTitle}>The Future of Private Aviation: Trends, Technology & Sustainability</h2>
            <p className={styles.webinarDescription}>
              Join industry leaders as we explore the evolving landscape of private aviation, from cutting-edge
              technology to sustainable flight solutions that are reshaping the industry.
            </p>
          </div>

          <div className={styles.webinarDetails}>
            <div className={styles.detailItem}>
              <div className={styles.detailIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="#6FA1A6" strokeWidth="2" />
                  <line x1="16" y1="2" x2="16" y2="6" stroke="#6FA1A6" strokeWidth="2" />
                  <line x1="8" y1="2" x2="8" y2="6" stroke="#6FA1A6" strokeWidth="2" />
                  <line x1="3" y1="10" x2="21" y2="10" stroke="#6FA1A6" strokeWidth="2" />
                </svg>
              </div>
              <div className={styles.detailContent}>
                <strong>Date</strong>
                <span>March 15, 2024</span>
              </div>
            </div>

            <div className={styles.detailItem}>
              <div className={styles.detailIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#6FA1A6" strokeWidth="2" />
                  <polyline points="12,6 12,12 16,14" stroke="#6FA1A6" strokeWidth="2" />
                </svg>
              </div>
              <div className={styles.detailContent}>
                <strong>Time</strong>
                <span>2:00 PM - 3:30 PM EST</span>
              </div>
            </div>

            <div className={styles.detailItem}>
              <div className={styles.detailIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="#6FA1A6" strokeWidth="2" />
                  <line x1="8" y1="21" x2="16" y2="21" stroke="#6FA1A6" strokeWidth="2" />
                  <line x1="12" y1="17" x2="12" y2="21" stroke="#6FA1A6" strokeWidth="2" />
                </svg>
              </div>
              <div className={styles.detailContent}>
                <strong>Format</strong>
                <span>Live Online Event</span>
              </div>
            </div>

            <div className={styles.detailItem}>
              <div className={styles.detailIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#6FA1A6" strokeWidth="2" />
                  <path d="M2 17L12 22L22 17" stroke="#6FA1A6" strokeWidth="2" />
                  <path d="M2 12L12 17L22 12" stroke="#6FA1A6" strokeWidth="2" />
                </svg>
              </div>
              <div className={styles.detailContent}>
                <strong>Duration</strong>
                <span>90 Minutes + Q&A</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className={styles.learningSection}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>What You'll Learn</h2>
          <div className={styles.learningGrid}>
            <div className={styles.learningItem}>
              <div className={styles.learningIcon}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M24 4L44 14V34L24 44L4 34V14L24 4Z" stroke="#6FA1A6" strokeWidth="2" />
                  <path d="M24 4V44" stroke="#6FA1A6" strokeWidth="2" />
                  <path d="M4 14L24 24L44 14" stroke="#6FA1A6" strokeWidth="2" />
                </svg>
              </div>
              <h3>Innovation & Technology</h3>
              <p>
                Discover the latest technological advances in aircraft design, avionics, and flight management systems.
              </p>
            </div>

            <div className={styles.learningItem}>
              <div className={styles.learningIcon}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M24 8C30.6274 8 36 13.3726 36 20C36 26.6274 30.6274 32 24 32C17.3726 32 12 26.6274 12 20C12 13.3726 17.3726 8 24 8Z"
                    stroke="#6FA1A6"
                    strokeWidth="2"
                  />
                  <path
                    d="M8 40C8 33.3726 13.3726 28 20 28H28C34.6274 28 40 33.3726 40 40V44H8V40Z"
                    stroke="#6FA1A6"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h3>Sustainable Aviation</h3>
              <p>
                Learn about eco-friendly initiatives, sustainable aviation fuels, and carbon-neutral flight options.
              </p>
            </div>

            <div className={styles.learningItem}>
              <div className={styles.learningIcon}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M8 40L16 32L24 40L32 28L40 36"
                    stroke="#6FA1A6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M40 28V36H32"
                    stroke="#6FA1A6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect x="4" y="4" width="40" height="40" rx="2" stroke="#6FA1A6" strokeWidth="2" />
                </svg>
              </div>
              <h3>Market Trends</h3>
              <p>Understand current market dynamics, growth opportunities, and emerging customer preferences.</p>
            </div>

            <div className={styles.learningItem}>
              <div className={styles.learningIcon}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M24 4C35.0457 4 44 12.9543 44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4Z"
                    stroke="#6FA1A6"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 24L22 28L30 20"
                    stroke="#6FA1A6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>Safety & Regulations</h3>
              <p>Stay updated on the latest safety protocols, regulatory changes, and compliance requirements.</p>
            </div>

            <div className={styles.learningItem}>
              <div className={styles.learningIcon}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="12" width="32" height="28" rx="2" stroke="#6FA1A6" strokeWidth="2" />
                  <path d="M16 8V16" stroke="#6FA1A6" strokeWidth="2" />
                  <path d="M32 8V16" stroke="#6FA1A6" strokeWidth="2" />
                  <path d="M8 24H40" stroke="#6FA1A6" strokeWidth="2" />
                  <circle cx="20" cy="32" r="2" fill="#6FA1A6" />
                  <circle cx="28" cy="32" r="2" fill="#6FA1A6" />
                </svg>
              </div>
              <h3>Fleet Management</h3>
              <p>Optimize operations with advanced fleet management strategies and digital transformation tools.</p>
            </div>

            <div className={styles.learningItem}>
              <div className={styles.learningIcon}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M20 6C20 4.89543 20.8954 4 22 4H26C27.1046 4 28 4.89543 28 6V10H20V6Z"
                    stroke="#6FA1A6"
                    strokeWidth="2"
                  />
                  <path
                    d="M8 10H40V38C40 40.2091 38.2091 42 36 42H12C9.79086 42 8 40.2091 8 38V10Z"
                    stroke="#6FA1A6"
                    strokeWidth="2"
                  />
                  <path d="M18 20V30" stroke="#6FA1A6" strokeWidth="2" strokeLinecap="round" />
                  <path d="M24 18V30" stroke="#6FA1A6" strokeWidth="2" strokeLinecap="round" />
                  <path d="M30 22V30" stroke="#6FA1A6" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h3>Customer Experience</h3>
              <p>Enhance passenger satisfaction through personalized services and innovative cabin technologies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section className={styles.speakersSection}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Featured Speakers</h2>
          <div className={styles.speakersGrid}>
            <div className={styles.speakerCard}>
              <div className={styles.speakerAvatar}>
                <span>JD</span>
              </div>
              <h3>John Davidson</h3>
              <p className={styles.speakerTitle}>CEO, AeroTech Solutions</p>
              <p className={styles.speakerBio}>
                20+ years in aviation technology, former Boeing executive, leading expert in sustainable aviation.
              </p>
            </div>
            <div className={styles.speakerCard}>
              <div className={styles.speakerAvatar}>
                <span>SM</span>
              </div>
              <h3>Sarah Mitchell</h3>
              <p className={styles.speakerTitle}>Director of Innovation, SkyVentures</p>
              <p className={styles.speakerBio}>
                Pioneer in electric aircraft development, MIT graduate, 15 years in aerospace engineering.
              </p>
            </div>
            <div className={styles.speakerCard}>
              <div className={styles.speakerAvatar}>
                <span>RC</span>
              </div>
              <h3>Robert Chen</h3>
              <p className={styles.speakerTitle}>Aviation Market Analyst</p>
              <p className={styles.speakerBio}>
                Leading market researcher, published author on aviation trends, consultant for major airlines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className={styles.registrationSection}>
        <div className={styles.sectionContent}>
          <div className={styles.registrationContainer}>
            <div className={styles.registrationInfo}>
              <h2>Reserve Your Spot</h2>
              <p>
                Don't miss this exclusive opportunity to gain insights from industry leaders and network with aviation
                professionals worldwide.
              </p>
              <div className={styles.benefits}>
                <div className={styles.benefit}>
                  <div className={styles.checkIcon}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M16.6667 5L7.5 14.1667L3.33333 10"
                        stroke="#59BBA8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span>Live Q&A with industry experts</span>
                </div>
                <div className={styles.benefit}>
                  <div className={styles.checkIcon}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M16.6667 5L7.5 14.1667L3.33333 10"
                        stroke="#59BBA8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span>Downloadable resources and reports</span>
                </div>
                <div className={styles.benefit}>
                  <div className={styles.checkIcon}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M16.6667 5L7.5 14.1667L3.33333 10"
                        stroke="#59BBA8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span>Recording available for 30 days</span>
                </div>
                <div className={styles.benefit}>
                  <div className={styles.checkIcon}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M16.6667 5L7.5 14.1667L3.33333 10"
                        stroke="#59BBA8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span>Networking opportunities</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className={styles.registrationForm}>
              <h3>Register Now - It's Free!</h3>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Position</label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className={styles.select}
                  >
                    <option value="">Select Position</option>
                    <option>CEO/President</option>
                    <option>VP/Director</option>
                    <option>Manager</option>
                    <option>Pilot</option>
                    <option>Engineer</option>
                    <option>Consultant</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Areas of Interest (Select all that apply)</label>
                <div className={styles.interestsGrid}>
                  {[
                    "Aircraft Technology",
                    "Sustainable Aviation",
                    "Market Analysis",
                    "Safety & Regulations",
                    "Fleet Management",
                    "Customer Experience",
                  ].map((interest) => (
                    <label key={interest} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest)}
                        onChange={() => handleInterestChange(interest)}
                        className={styles.checkbox}
                      />
                      {interest}
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.consentGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="marketingConsent"
                    checked={formData.marketingConsent}
                    onChange={handleInputChange}
                    className={styles.checkbox}
                  />
                  I agree to receive updates about future webinars and aviation industry insights.
                </label>
              </div>

              <button type="submit" className={styles.registerButton}>
                Register for Free Webinar
              </button>

              <p className={styles.disclaimer}>
                By registering, you agree to our privacy policy. We respect your privacy and will never share your
                information.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>&copy; 2024 AeroVision Webinars. All rights reserved.</p>
          <p>Questions? Contact us at webinars@aerovision.com</p>
        </div>
      </footer>
    </div>
  );
}
