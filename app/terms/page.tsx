import type { Metadata } from 'next';
import PageTransition from '@/components/animations/PageTransition';
import ScrollReveal   from '@/components/animations/ScrollReveal';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of Use for Senpai Spot — the rules and guidelines for using our website.',
};

const SECTIONS = [
  {
    num: '1',
    title: 'Acceptance of Terms',
    body: `By accessing or using Senpai Spot at www.senpaispot.in (the "Site"), you agree to be bound by these Terms of Use ("Terms"). If you do not agree to these Terms, please do not use the Site.\n\nWe reserve the right to update or modify these Terms at any time without prior notice. Your continued use of the Site following any changes constitutes your acceptance of the revised Terms. We encourage you to review this page periodically.`,
  },
  {
    num: '2',
    title: 'Use of the Site',
    body: `Senpai Spot is an anime and manga content platform providing news, reviews, discussions, and related editorial content. You may use the Site for personal, non-commercial purposes only.\n\nYou agree not to:\n\n- Use the Site for any unlawful purpose or in violation of any applicable laws or regulations\n- Attempt to gain unauthorised access to any part of the Site or its related systems\n- Scrape, crawl, or systematically copy content from the Site without our prior written consent\n- Transmit any harmful, offensive, or disruptive content through our contact form or any other means\n- Impersonate any person or entity or misrepresent your affiliation with any person or entity\n- Use the Site in any way that could damage, disable, or impair its functionality`,
  },
  {
    num: '3',
    title: 'Intellectual Property',
    body: `All content on Senpai Spot — including but not limited to written articles, editorial commentary, design, layout, logos, and original graphics — is owned by Senpai Spot or its content contributors and is protected by applicable copyright and intellectual property laws.\n\nAnime, manga, and related titles discussed on this Site are the intellectual property of their respective owners and studios. Senpai Spot is an independent fan and editorial platform and is not affiliated with, endorsed by, or sponsored by any anime studio, publisher, or licensor.\n\nYou may not reproduce, distribute, republish, or commercially exploit any original content from this Site without our prior written permission. Brief quotations with proper attribution for non-commercial purposes (such as commentary or criticism) may be permitted under fair use principles.`,
  },
  {
    num: '4',
    title: 'Third-Party Content and Links',
    body: `The Site may contain links to external websites and embed content from third-party platforms. These links are provided for convenience and informational purposes only. Senpai Spot does not endorse, control, or take responsibility for the content, privacy practices, or availability of any third-party sites.\n\nWe are not liable for any harm or damages related to your use of third-party services accessed through links on our Site. We encourage you to review the terms and privacy policies of any external sites you visit.`,
  },
  {
    num: '5',
    title: 'User-Submitted Content',
    body: `If you submit content to us via the contact form or any other channel (such as tips, feedback, or suggestions), you grant Senpai Spot a non-exclusive, royalty-free, worldwide licence to use, reproduce, and incorporate that content as part of our operations and communications.\n\nYou represent that any content you submit does not infringe the rights of any third party, is not unlawful or defamatory, and is provided in good faith.`,
  },
  {
    num: '6',
    title: 'Disclaimer of Warranties',
    body: `The Site and its content are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. Senpai Spot makes no warranty that:\n\n- The Site will be uninterrupted, error-free, or free of viruses or other harmful components\n- The information on the Site is accurate, complete, or up to date\n- Any errors or defects will be corrected\n\nYour use of the Site is at your sole risk. To the fullest extent permitted by law, we disclaim all warranties, express or implied.`,
  },
  {
    num: '7',
    title: 'Limitation of Liability',
    body: `To the fullest extent permitted by applicable law, Senpai Spot and its owners, contributors, and operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the Site, even if we have been advised of the possibility of such damages.\n\nOur total liability to you for any claim arising out of or relating to these Terms or the Site shall not exceed the amount you have paid us in the twelve months preceding the claim (which, given the Site is free, would be nil).`,
  },
  {
    num: '8',
    title: 'Age Restrictions',
    body: `Senpai Spot is intended for users of all ages who enjoy anime and manga. However, some content may be more suitable for mature audiences. We do not knowingly permit children under the age of 13 to submit personal information through our contact form or otherwise interact with the Site in ways that require personal data.\n\nIf you are under 13, please do not submit any personal information to us. If you believe we have inadvertently received information from a child under 13, please contact us and we will promptly delete it.`,
  },
  {
    num: '9',
    title: 'Fan Content and Copyright Notice',
    body: `Senpai Spot is an independent editorial and fan platform. Images, screenshots, and visual media from anime and manga series may be used in accordance with fair use principles for purposes of commentary, criticism, news reporting, and educational discussion.\n\nIf you are a rights holder and believe that content on this Site infringes your copyright, please contact us at contact@senpaispot.in with details of the allegedly infringing content and your ownership claim. We will investigate and respond in a timely manner.`,
  },
  {
    num: '10',
    title: 'Governing Law',
    body: `These Terms are governed by and construed in accordance with the laws of India. Any disputes arising from or related to these Terms or your use of the Site shall be subject to the exclusive jurisdiction of the courts located in India.\n\nIf any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.`,
  },
  {
    num: '11',
    title: 'Contact Us',
    body: `If you have any questions or concerns about these Terms of Use, please contact us at:\n\nEmail: contact@senpaispot.in\nWebsite: www.senpaispot.in`,
  },
];

export default function TermsPage() {
  return (
    <PageTransition>
      <div className="relative py-24 overflow-hidden border-b border-orange-500/10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0500]/60 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="section-divider mx-auto mb-6" />
            <h1 className="text-4xl sm:text-6xl font-cinzel font-black text-white mb-6">
              Terms of <span className="gradient-text">Use</span>
            </h1>
            <p className="text-white/50 text-sm">Effective date: May 2026</p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <ScrollReveal>
          <div className="glass rounded-2xl border border-orange-500/10 p-8 sm:p-10 space-y-8 text-white/60 leading-relaxed text-sm">
            <p>
              Please read these Terms of Use carefully before using Senpai Spot ("we", "us", or "our") at
              www.senpaispot.in (the "Site"). These Terms govern your access to and use of the Site and all
              content available through it.
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
                By continuing to use Senpai Spot, you acknowledge that you have read, understood, and agree
                to be bound by these Terms of Use.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
