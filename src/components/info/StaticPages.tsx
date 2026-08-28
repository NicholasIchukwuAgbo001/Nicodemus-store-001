import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Sparkles, 
  Truck, 
  RefreshCw, 
  ShieldCheck, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Send,
  CheckCircle2
} from 'lucide-react';

// STORY PAGE
export const StoryPage: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div id="story-page" className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Hero */}
      <div className="relative bg-[#181716] text-[#FAF8F5] py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=80"
            alt="Maison Craft"
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C29E74] block mb-3">
            The Maison Philosophy
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-normal leading-tight">
            THE ARCHITECTURE OF QUIET LUXURY
          </h1>
          <p className="text-sm sm:text-base text-[#D5CDBC] font-light mt-4 max-w-xl mx-auto leading-relaxed">
            Founded on the conviction that women's fashion should be an enduring expression of grace, strength, and impeccable tailoring.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-editorial text-3xl text-[#181716]">Born in Limited Editions</h2>
            <p className="text-xs sm:text-sm text-[#5D5750] mt-4 leading-relaxed">
              NICODEMUS 001 was conceived to dismantle the disposable cycle of trend-driven fashion. We craft each silhouette in numbered batches, using exclusively traceable mulberry silks, Italian virgin wools, and full-grain vegetable-tanned leathers.
            </p>
            <p className="text-xs sm:text-sm text-[#5D5750] mt-3 leading-relaxed">
              Every curve, seam, and pleat is rigorously tested to ensure fluidity in motion and structural confidence throughout your day.
            </p>
          </div>
          <div className="aspect-4/5 rounded-sm overflow-hidden bg-[#E8E2DA] shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
              alt="Atelier fitting"
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="p-8 sm:p-12 bg-[#F2EDE5] rounded-sm border border-[#E8E2DA] text-center max-w-3xl mx-auto space-y-4">
          <Sparkles className="w-6 h-6 text-[#8F683D] mx-auto" />
          <h3 className="font-editorial text-2xl sm:text-3xl text-[#181716]">
            &ldquo;Our garments do not shout for attention; they command it through proportion and texture.&rdquo;
          </h3>
          <p className="text-xs uppercase tracking-widest text-[#7D7771]">— NICODEMUS 001 Design Director</p>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigateTo('shop')}
            className="bg-[#181716] text-[#FAF8F5] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] rounded-sm hover:bg-[#34302C] transition-colors"
          >
            Explore the Collection
          </button>
        </div>
      </div>
    </div>
  );
};

// SHIPPING & RETURNS PAGE
export const ShippingReturnsPage: React.FC = () => {
  return (
    <div id="shipping-returns-page" className="min-h-screen bg-[#FAF8F5] py-16 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8F683D]">Client Care</span>
          <h1 className="font-editorial text-3xl sm:text-5xl text-[#181716] font-normal mt-1">
            DELIVERY & RETURNS POLICY
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#FAF8F5] p-6 rounded-sm border border-[#E8E2DA] space-y-3">
            <Truck className="w-5 h-5 text-[#8F683D]" />
            <h3 className="font-editorial text-xl text-[#181716]">Nationwide & Global Delivery</h3>
            <p className="text-xs text-[#5D5750] leading-relaxed">
              Complimentary expedited nationwide courier shipping on all orders over ₦250,000. Orders confirmed before 2:00 PM WAT dispatch same business day with end-to-end tracking and signature on delivery.
            </p>
            <ul className="text-xs text-[#7D7771] space-y-1 pt-2 border-t">
              <li>• Lagos (Island & Mainland): Same-Day / Next-Day Express</li>
              <li>• Abuja & Port Harcourt: 1-2 Business Days</li>
              <li>• Other Nigerian States: 2-3 Business Days</li>
              <li>• International & Diaspora: 3-5 Business Days via DHL Express</li>
            </ul>
          </div>

          <div className="bg-[#FAF8F5] p-6 rounded-sm border border-[#E8E2DA] space-y-3">
            <RefreshCw className="w-5 h-5 text-[#8F683D]" />
            <h3 className="font-editorial text-xl text-[#181716]">14-Day Returns & Exchanges</h3>
            <p className="text-xs text-[#5D5750] leading-relaxed">
              We provide complimentary return pickups in Lagos & Abuja for all unworn garments with atelier security tags intact. Size exchanges are expedited upon courier collection.
            </p>
            <ul className="text-xs text-[#7D7771] space-y-1 pt-2 border-t">
              <li>• Return portal access in client account</li>
              <li>• Complimentary courier collection</li>
              <li>• Instant size exchange reservations</li>
            </ul>
          </div>
        </div>

        <div className="bg-[#F2EDE5] p-6 sm:p-8 rounded-sm border border-[#E8E2DA] space-y-3 text-xs text-[#5D5750]">
          <h4 className="font-editorial text-lg text-[#181716]">VIP Presentation Packaging</h4>
          <p>
            All creations arrive packed in our signature rigid archive box, tied with grosgrain ribbon and scented with Maison Santal spray. Garments include branded wooden hangers and breathable garment covers.
          </p>
        </div>
      </div>
    </div>
  );
};

// FAQS PAGE
export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the direct bank transfer payment work in Nigeria?',
      a: 'Upon placing your order, an official Atelier Acquisition Dossier is generated with our dedicated corporate Zenith Bank NUBAN account (1012948271) and your unique reference code (e.g. NCD-93821). Simply transfer the total via your mobile banking app or USSD. Your pieces are immediately reserved upon confirmation.',
    },
    {
      q: 'How do I determine my correct size?',
      a: 'We offer an interactive Size Guide on every product page providing precise measurements in centimeters and inches for bust, waist, hips, and Nigerian/UK/European footwear sizes. Our concierge team is also on standby via WhatsApp or phone to advise on bespoke sizing.',
    },
    {
      q: 'Can I exchange a size if the fit is not ideal?',
      a: 'Yes, we offer complimentary exchanges across Nigeria within 14 days of receipt. Simply initiate a request from your client dashboard or contact our private concierge.',
    },
    {
      q: 'Are NICODEMUS 001 pieces produced sustainably?',
      a: 'Every piece is crafted in certified European and master artisan ateliers adhering to strict fair wage and environmental regulations. Our silks and virgin wools are 100% natural, biodegradable, and ethically harvested.',
    },
  ];

  return (
    <div id="faq-page" className="min-h-screen bg-[#FAF8F5] py-16 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8F683D]">Client Care</span>
          <h1 className="font-editorial text-3xl sm:text-5xl text-[#181716] font-normal mt-1">
            FREQUENTLY ASKED QUESTIONS
          </h1>
        </div>

        <div className="divide-y divide-[#E8E2DA] border-y border-[#E8E2DA]">
          {faqs.map((faq, i) => (
            <div key={i} className="py-5">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center text-left font-editorial text-lg text-[#181716]"
              >
                <span>{faq.q}</span>
                {openIndex === i ? <ChevronUp className="w-4 h-4 text-[#8F683D]" /> : <ChevronDown className="w-4 h-4 text-[#7D7771]" />}
              </button>
              {openIndex === i && (
                <p className="mt-3 text-xs text-[#5D5750] leading-relaxed pr-6">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// CONTACT PAGE
export const ContactPage: React.FC = () => {
  const { showToast } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Missing Fields', 'Please complete the message fields.', 'warning');
      return;
    }
    setSent(true);
    showToast('Message Forwarded', 'Our private client advisor will respond within 4 business hours.', 'success');
  };

  return (
    <div id="contact-page" className="min-h-screen bg-[#FAF8F5] py-16 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Atelier details */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8F683D]">Client Services</span>
            <h1 className="font-editorial text-3xl sm:text-5xl text-[#181716] font-normal leading-tight">
              PRIVATE CONCIERGE
            </h1>
            <p className="text-xs sm:text-sm text-[#5D5750] leading-relaxed">
              Our client advisors assist with styling consultations, garment measurements, bank transfer confirmations, and bespoke order requests.
            </p>

            <div className="space-y-4 pt-4 border-t border-[#E8E2DA] text-xs text-[#2B2723]">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#8F683D] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#181716]">Concierge Email</strong>
                  <span>concierge@nicodemus001.ng</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#8F683D] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#181716]">Client Hotline / WhatsApp</strong>
                  <span>+234 803 555 0194 / +234 1 888 0019</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#8F683D] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#181716]">Lagos Flagship Suite</strong>
                  <span>Plot 12, Admiralty Way, Lekki Phase 1, Lagos, Nigeria</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#8F683D] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#181716]">Atelier Hours</strong>
                  <span>Monday – Saturday: 9:00 AM – 7:00 PM WAT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-7 bg-[#FAF8F5] p-6 sm:p-8 rounded-sm border border-[#E8E2DA]">
            <h3 className="font-editorial text-2xl text-[#181716] mb-4">Send a Confidential Inquiry</h3>

            {sent ? (
              <div className="p-8 bg-[#EAF2EC] text-[#2C5234] rounded-sm text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-[#355E3B] mx-auto" />
                <h4 className="font-editorial text-xl">Inquiry Received</h4>
                <p className="text-xs">Thank you, {name}. A dedicated advisor will reach out shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-wider text-[#7D7771] mb-1">Your Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-[#FAF8F5] border border-[#D5CDBD] p-3 rounded-sm text-[#181716]"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wider text-[#7D7771] mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-[#FAF8F5] border border-[#D5CDBD] p-3 rounded-sm text-[#181716]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#7D7771] mb-1">Topic / Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Sizing inquiry or custom garment order"
                    className="w-full bg-[#FAF8F5] border border-[#D5CDBD] p-3 rounded-sm text-[#181716]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#7D7771] mb-1">Message *</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full bg-[#FAF8F5] border border-[#D5CDBD] p-3 rounded-sm text-[#181716]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#181716] text-[#FAF8F5] py-4 rounded-sm text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#34302C] transition-colors flex items-center justify-center gap-2"
                >
                  <span>Transmit Inquiry</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

