// pages/privacy.js
import Head from 'next/head'
import Link from 'next/link'

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | LunaraHQ</title>
        <meta name="description" content="Privacy Policy for LunaraHQ" />
      </Head>

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
        <h1>Privacy Policy</h1>
        <p><em>Last updated: May 11, 2025</em></p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            LunaraHQ Ltd. (“LunaraHQ”, “we”, “us” or “our”) is committed to protecting your privacy. 
            This policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website — lunarahq.com — or otherwise interact with us.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <ul>
            <li><strong>Personal Data</strong>: Name, email address, company name, job title (if provided).</li>
            <li><strong>Usage Data</strong>: IP address, browser type, pages visited, time stamps, and analytics collected via cookies or third-party tools (e.g. Google Analytics).</li>
            <li><strong>Cookies & Tracking</strong>: We use cookies to personalize your experience and analyze site traffic. You can disable cookies via your browser, but some features may not function.</li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <ul>
            <li>To provide, maintain, and improve our services and website.</li>
            <li>To respond to your inquiries and send updates.</li>
            <li>To monitor and analyze usage and trends to improve user experience.</li>
            <li>To comply with legal obligations and protect our rights.</li>
          </ul>
        </section>

        <section>
          <h2>4. Data Sharing & Disclosure</h2>
          <p>We do <strong>not</strong> sell your personal data. We may share information with:</p>
          <ul>
            <li><strong>Service Providers</strong>: Hosting, payment processors (e.g. Stripe), analytics (Google Analytics), email (Mailgun).</li>
            <li><strong>Legal Compliance</strong>: When required by law or to protect our rights or the safety of our users.</li>
          </ul>
        </section>

        <section>
          <h2>5. Data Retention</h2>
          <p>We retain personal data only as long as necessary to fulfill the purposes outlined above, or as required by law.</p>
        </section>

        <section>
          <h2>6. Your Rights</h2>
          <p>Under GDPR you have the right to:</p>
          <ul>
            <li>Access, correct, or delete your personal data.</li>
            <li>Restrict or object to our processing of your data.</li>
            <li>Withdraw consent at any time (where processing is based on consent).</li>
            <li>Lodge a complaint with a supervisory authority (e.g. Ireland’s Data Protection Commission).</li>
          </ul>
          <p>To exercise these rights, contact us at <a href="mailto:privacy@lunarahq.com">privacy@lunarahq.com</a>.</p>
        </section>

        <section>
          <h2>7. Security</h2>
          <p>We implement reasonable administrative, technical, and physical safeguards to protect your personal data.</p>
        </section>

        <section>
          <h2>8. Changes to This Policy</h2>
          <p>We may update this policy from time to time. The “Last updated” date at the top will reflect any changes.</p>
        </section>

        <p style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Link href="/"><a>← Back to home</a></Link>
        </p>
      </main>
    </>
  )
}
