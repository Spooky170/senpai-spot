import type { Metadata } from 'next';
import PageTransition from '@/components/animations/PageTransition';
import ScrollReveal   from '@/components/animations/ScrollReveal';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Senpai Spot — learn how we collect, use, and protect your information.',
};

const SECTIONS = [
  {
    num: '1',
    title: 'Information We Collect',
    body: `We collect only the minimum information necessary to operate Senpai Spot effectively.\n\n**Contact Form:** When you submit our contact form, we collect your name, email address, and the message you provide. This information is used solely to respond to your inquiry.\n\n**Usage Data:** We may collect non-personally identifiable information such as your browser type, device type, pages visited, and time spent on the site. This is collected through standard server logs or analytics tools and is used to improve our content and user experience.\n\n**Cookies:** We use cookies to enhance your browsing experience. These may include session cookies (which expire when you close your browser) and persistent cookies (which remain on your device for a set period). You can disable cookies in your browser settings, though some parts of the site may not function properly as a result.`,
  },
  {
    num: '2',
    title: 'How We Use Your Information',
    body: `We use the information we collect for the following purposes:\n\n- To respond to messages and inquiries submitted via our contact form\n- To understand how visitors use our site and improve our content\n- To monitor site performance and prevent abuse\n- To comply with legal obligations where applicable\n\nWe do not sell, rent, or trade your personal information to third parties. We do not use your information for automated decision-making or profiling.`,
  },
  {
    num: '3',
    title: 'Third-Party Services',
    body: `Senpai Spot uses the following third-party services which may process data on our behalf:\n\n**Vercel:** Our website is hosted on Vercel. Vercel may collect standard server log data including IP addresses and request metadata. See Vercel's privacy policy at vercel.com/legal/privacy-policy.\n\n**Sanity:** We use Sanity as our content management system. Content you see on this site is stored in Sanity's infrastructure. See Sanity's privacy policy at sanity.io/legal/privacy.\n\n**Resend:** We use Resend to deliver emails sent through our contact form. Your name and email address are transmitted to Resend for this purpose only. See Resend's privacy policy at resend.com/legal/privacy-policy.\n\n**Google Analytics (if applicable):** We may use Google Analytics to understand site traffic. Google Analytics uses cookies and collects anonymised usage data. You can opt out via Google's opt-out tools.`,
  },
  {
    num: '4',
    title: 'Data Retention',
    body: `Contact form submissions are retained only as long as necessary to respond to your inquiry. We do not store contact form data in any database — messages are delivered directly to our email inbox and handled accordingly.\n\nAnalytics data is retained in aggregate, anonymised form and does not identify individual users.`,
  },
  {
    num: '5',
    title: 'Your Rights',
    body: `Depending on your location, you may have the following rights regarding your personal data:\n\n- **Access:** You may request a copy of the personal data we hold about you.\n- **Correction:** You may request that we correct inaccurate personal data.\n- **Deletion:** You may request that we delete your personal data where there is no legitimate reason for us to continue processing it.\n- **Objection:** You may object to the processing of your personal data in certain circumstances.\n\nTo exercise any of these rights, please contact us at contact@senpaispot.in. We will respond within 30 days.`,
  },
  {
    num: '6',
    title: 'Children\'s Privacy',
    body: `Senpai Spot is intended for a general audience and is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us and we will promptly delete it.`,
  },
  {
    num: '7',
    title: 'Security',
    body: `We take reasonable technical and organisational measures to protect your information from unauthorised access, loss, or misuse. Our site is served over HTTPS and we use reputable third-party providers with their own security practices. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    num: '8',
    title: 'External Links',
    body: `Our site may contain links to external websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review the privacy policies of any external sites you visit.`,
  },
  {
    num: '9',
    title: 'Changes to This Policy',
    body: `We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. We encourage you to review this page periodically. Your continued use of the site after changes are posted constitutes your acceptance of the updated policy.`,
  },
  {
    num: '10',
    title: 'Contact Us',
    body: `If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at:\n\nEmail: contact@senpaispot.in\nWebsite: www.senpaispot.in`,
  },
];

export default function PrivacyPage() {
  return (
    <PageTransition>
      <div className="relative py-24 overflow-hidden border-b border-orange-500/10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0500]/60 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="section-divider mx-auto mb-6" />
            <h1 className="text-4xl sm:text-6xl font-cinzel font-black text-white mb-6">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-white/50 text-sm">Effective date: May 2026</p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <ScrollReveal>
          <div className="glass rounded-2xl border border-orange-500/10 p-8 sm:p-10 space-y-8 text-white/60 leading-relaxed text-sm">
            <p>
              This Privacy Policy explains how Senpai Spot ("we", "us", or "our") collects, uses, and protects
              information about visitors to www.senpaispot.in (the "Site"). By using the Site, you agree to the
              practices described in this policy.
            </p>

            {SECTIONS.map(({ num, title, body }) => (
              <div key={num} className="border-t border-white/5 pt-6">
                <h2 className="font-cinzel font-bold text-white text-base mb-3">
                  <span className="text-orange-500 mr-2">{num}.</span>{title}
                </h2>
                {body.split('\n\n').map((para, i) => (
                  <p key={i} className={i > 0 ? 'mt-3' : ''}>
                    {para.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
                      part.startsWith('**') && part.endsWith('**')
                        ? <strong key={j} className="text-white/80">{part.slice(2, -2)}</strong>
                        : part
                    )}
                  </p>
                ))}
              </div>
            ))}

            <div className="border-t border-orange-500/20 pt-6">
              <p className="text-white/50">
                By continuing to use Senpai Spot, you acknowledge that you have read and understood this Privacy Policy.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
