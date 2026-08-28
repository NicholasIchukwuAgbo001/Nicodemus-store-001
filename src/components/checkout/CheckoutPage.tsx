import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { STORE_CONFIG, BANK_DETAILS, SHIPPING_OPTIONS } from '../../data/storeConfig';
import { formatPrice, NIGERIAN_STATES } from '../../utils/currency';
import { Address } from '../../types';
import { 
  CheckCircle2, 
  Copy, 
  Upload, 
  ShieldCheck, 
  Lock, 
  Truck, 
  Sparkles, 
  ArrowRight, 
  Building2, 
  FileCheck,
  ChevronLeft
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    cartDiscount, 
    cartTotal, 
    currentUser, 
    appliedPromo, 
    placeOrder, 
    navigateTo, 
    showToast 
  } = useStore();

  // Redirect if empty
  useEffect(() => {
    if (cart.length === 0) {
      navigateTo('cart');
    }
  }, [cart, navigateTo]);

  // Form State
  const [email, setEmail] = useState(currentUser?.email || 'amina.adebayo@fashionatelier.ng');
  const [firstName, setFirstName] = useState(currentUser?.firstName || 'Amina');
  const [lastName, setLastName] = useState(currentUser?.lastName || 'Adebayo');
  const [phone, setPhone] = useState(currentUser?.phone || '+234 803 555 0194');

  // Address
  const defaultAddr = currentUser?.addresses.find((a) => a.isDefault) || currentUser?.addresses[0];
  const [addressLine1, setAddressLine1] = useState(defaultAddr?.street || 'Plot 12, Admiralty Way, Lekki Phase 1');
  const [city, setCity] = useState(defaultAddr?.city || 'Lagos');
  const [state, setState] = useState(defaultAddr?.state || 'Lagos');
  const [postalCode, setPostalCode] = useState(defaultAddr?.postalCode || '105102');
  const [country, setCountry] = useState(defaultAddr?.country || 'Nigeria');

  // Shipping choice
  const [selectedShippingId, setSelectedShippingId] = useState<string>('standard');
  
  // Bank Transfer Proof
  const [proofFileName, setProofFileName] = useState<string | null>(null);
  const [paymentRefCode, setPaymentRefCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Generate Reference code on mount
  useEffect(() => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    setPaymentRefCode(`NCD-${randomNum}`);
  }, []);

  const selectedShipping = SHIPPING_OPTIONS.find((s) => s.id === selectedShippingId) || SHIPPING_OPTIONS[0];
  const isFreeStandard = cartSubtotal >= STORE_CONFIG.freeShippingThreshold;
  const effectiveShippingCost = (selectedShipping.id === 'standard' && isFreeStandard) ? 0 : selectedShipping.price;
  const finalGrandTotal = cartTotal + effectiveShippingCost;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    showToast(`${label} Copied`, `${text} copied to clipboard for your bank transfer.`, 'success');
  };

  const handleProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProofFileName(file.name);
      showToast('Proof Attached', `${file.name} attached for expedited concierge verification.`, 'info');
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !firstName || !lastName || !addressLine1 || !city || !postalCode) {
      showToast('Missing Details', 'Please complete all required shipping fields.', 'warning');
      return;
    }

    setIsProcessing(true);

    const deliveryAddress: Address = {
      id: `addr-${Date.now()}`,
      recipientName: `${firstName} ${lastName}`,
      street: addressLine1,
      city,
      state,
      postalCode,
      country,
      phone,
      isDefault: true,
    };

    setTimeout(() => {
      placeOrder({
        customer: {
          name: `${firstName} ${lastName}`,
          email,
          phone,
        },
        deliveryAddress,
        shippingMethod: {
          id: selectedShipping.id,
          name: selectedShipping.name,
          price: effectiveShippingCost,
          estimatedDays: selectedShipping.estimatedDays,
        },
        paymentReference: paymentRefCode,
        paymentProofName: proofFileName || undefined,
      });
      setIsProcessing(false);
    }, 800);
  };

  return (
    <div id="checkout-page" className="min-h-screen bg-[#FAF8F5] py-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Checkout Header */}
        <div className="pb-8 border-b border-[#E8E2DA] flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8F683D]">
              Secure Atelier Checkout
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl text-[#181716] font-normal mt-1">
              FINALIZE YOUR ACQUISITION
            </h1>
          </div>

          <button
            onClick={() => navigateTo('cart')}
            className="text-xs uppercase tracking-wider text-[#7D7771] hover:text-[#181716] flex items-center gap-1 font-medium"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Bag
          </button>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">
          
          {/* Left Column: Form Fields */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* 1. Contact Info */}
            <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-sm border border-[#E8E2DA] space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8E2DA] pb-3">
                <h3 className="font-editorial text-xl text-[#181716] font-medium flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#181716] text-[#FAF8F5] text-xs flex items-center justify-center font-sans">1</span>
                  Client Contact
                </h3>
                {currentUser && (
                  <span className="text-xs text-[#8F683D]">Logged in as {currentUser.email}</span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block uppercase tracking-wider text-[#7D7771] mb-1">First Name *</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full bg-[#FAF8F5] border border-[#D5CDBD] p-3 rounded-sm text-xs text-[#181716] focus:outline-none focus:border-[#181716]"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-[#7D7771] mb-1">Last Name *</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full bg-[#FAF8F5] border border-[#D5CDBD] p-3 rounded-sm text-xs text-[#181716] focus:outline-none focus:border-[#181716]"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-[#7D7771] mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[#FAF8F5] border border-[#D5CDBD] p-3 rounded-sm text-xs text-[#181716] focus:outline-none focus:border-[#181716]"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-[#7D7771] mb-1">Phone Number (e.g. +234 803 000 0000) *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="+234..."
                    className="w-full bg-[#FAF8F5] border border-[#D5CDBD] p-3 rounded-sm text-xs text-[#181716] focus:outline-none focus:border-[#181716]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-sm border border-[#E8E2DA] space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8E2DA] pb-3">
                <h3 className="font-editorial text-xl text-[#181716] font-medium flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#181716] text-[#FAF8F5] text-xs flex items-center justify-center font-sans">2</span>
                  Delivery Destination in Nigeria
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block uppercase tracking-wider text-[#7D7771] mb-1">Delivery Street Address *</label>
                  <input
                    type="text"
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    placeholder="Plot / Street number, Estate, Area"
                    required
                    className="w-full bg-[#FAF8F5] border border-[#D5CDBD] p-3 rounded-sm text-xs text-[#181716] focus:outline-none focus:border-[#181716]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block uppercase tracking-wider text-[#7D7771] mb-1">City / Area *</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Lekki Phase 1, Ikeja, Maitama"
                      required
                      className="w-full bg-[#FAF8F5] border border-[#D5CDBD] p-3 rounded-sm text-xs text-[#181716] focus:outline-none focus:border-[#181716]"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wider text-[#7D7771] mb-1">State *</label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#D5CDBD] p-3 rounded-sm text-xs text-[#181716] focus:outline-none focus:border-[#181716]"
                    >
                      {NIGERIAN_STATES.map((st) => (
                        <option key={st} value={st}>{st} State</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block uppercase tracking-wider text-[#7D7771] mb-1">Postal Code *</label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      required
                      className="w-full bg-[#FAF8F5] border border-[#D5CDBD] p-3 rounded-sm text-xs text-[#181716] focus:outline-none focus:border-[#181716]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#7D7771] mb-1">Country *</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#D5CDBD] p-3 rounded-sm text-xs text-[#181716] focus:outline-none focus:border-[#181716]"
                  >
                    <option value="Nigeria">Nigeria</option>
                    <option value="Ghana">Ghana (West Africa Express)</option>
                    <option value="United Kingdom">United Kingdom (International Diaspora)</option>
                    <option value="United States">United States (International Diaspora)</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3. Shipping Options */}
            <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-sm border border-[#E8E2DA] space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8E2DA] pb-3">
                <h3 className="font-editorial text-xl text-[#181716] font-medium flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#181716] text-[#FAF8F5] text-xs flex items-center justify-center font-sans">3</span>
                  Courier Selection
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                {SHIPPING_OPTIONS.map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center justify-between p-4 rounded-sm border cursor-pointer transition-all ${
                      selectedShippingId === opt.id ? 'border-[#181716] bg-[#F2EDE5]' : 'border-[#E8E2DA] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={selectedShippingId === opt.id}
                        onChange={() => setSelectedShippingId(opt.id)}
                        className="accent-[#181716]"
                      />
                      <div>
                        <span className="font-semibold text-[#181716] block">{opt.name} ({opt.estimatedDays})</span>
                        <span className="text-[#7D7771]">{opt.description}</span>
                      </div>
                    </div>
                    <span className="font-semibold text-[#181716]">
                      {opt.id === 'standard' && isFreeStandard ? 'Complimentary' : formatPrice(opt.price)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 4. High-End Direct Bank Wire Payment Gateway */}
            <div className="bg-[#181716] text-[#FAF8F5] p-6 sm:p-8 rounded-sm shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-[#2D2A26] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#C29E74] text-[#181716] flex items-center justify-center font-bold text-xs">
                    4
                  </div>
                  <div>
                    <h3 className="font-editorial text-xl text-[#FAF8F5] font-medium">
                      Direct Bank Transfer / NIP Settlement
                    </h3>
                    <p className="text-[10px] uppercase tracking-widest text-[#C29E74]">
                      Audited Nigerian Corporate Account
                    </p>
                  </div>
                </div>
                <Building2 className="w-6 h-6 text-[#C29E74]" />
              </div>

              {/* Wire details card */}
              <div className="bg-[#221F1B] p-5 rounded-sm border border-[#3A352F] space-y-4 text-xs">
                <div className="flex justify-between items-center pb-3 border-b border-[#2D2A26]">
                  <span className="text-[#A8A196] uppercase tracking-wider">Payment Reference Code</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-[#C29E74] tracking-widest">
                      {paymentRefCode}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(paymentRefCode, 'Payment Reference')}
                      className="p-1 text-[#A8A196] hover:text-[#FAF8F5]"
                      title="Copy Reference"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#D5CDBC]">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#8F683D] block">Beneficiary Bank</span>
                    <strong className="text-[#FAF8F5] font-medium">{BANK_DETAILS.bankName}</strong>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#8F683D] block">Account Name</span>
                    <strong className="text-[#FAF8F5] font-medium">{BANK_DETAILS.accountName}</strong>
                  </div>

                  <div className="sm:col-span-2 flex justify-between items-center bg-[#1A1816] p-3 rounded-sm border border-[#2D2A26]">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#8F683D] block">NUBAN Account Number</span>
                      <strong className="text-[#FAF8F5] font-mono text-base tracking-wider">{BANK_DETAILS.accountNumber}</strong>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(BANK_DETAILS.accountNumber, 'NUBAN Account Number')}
                      className="p-1.5 bg-[#2D2A26] hover:bg-[#3E3A34] rounded-sm text-[#C29E74]"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center bg-[#1A1816] p-3 rounded-sm border border-[#2D2A26]">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#8F683D] block">CBN Sort / Bank Code</span>
                      <strong className="text-[#FAF8F5] font-mono text-xs">{BANK_DETAILS.routingCode}</strong>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(BANK_DETAILS.routingCode, 'Sort Code')}
                      className="p-1.5 bg-[#2D2A26] hover:bg-[#3E3A34] rounded-sm text-[#C29E74]"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center bg-[#1A1816] p-3 rounded-sm border border-[#2D2A26]">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#8F683D] block">SWIFT Code (for Diaspora)</span>
                      <strong className="text-[#FAF8F5] font-mono text-xs">{BANK_DETAILS.swiftCode}</strong>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(BANK_DETAILS.swiftCode, 'SWIFT Code')}
                      className="p-1.5 bg-[#2D2A26] hover:bg-[#3E3A34] rounded-sm text-[#C29E74]"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-[#A8A196] leading-relaxed">
                  <p className="font-medium text-[#FAF8F5]">Transfer Instructions:</p>
                  <ul className="list-disc pl-4 space-y-1 mt-1">
                    <li>Initiate a transfer of <strong className="text-[#C29E74]">{formatPrice(finalGrandTotal)}</strong> from your bank app (Zenith, GTBank, Access, UBA, etc.) or USSD.</li>
                    <li>Please include the Reference Code <strong className="text-[#C29E74]">{paymentRefCode}</strong> in the remarks/narration field of your transfer.</li>
                    <li>Orders are immediately queued for dispatch upon receipt of payment confirmation.</li>
                  </ul>
                </div>
              </div>

              {/* Optional Proof of Payment upload */}
              <div className="p-4 bg-[#221F1B] rounded-sm border border-[#3A352F] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#FAF8F5] font-semibold flex items-center gap-2">
                    <Upload className="w-4 h-4 text-[#C29E74]" />
                    Attach Transfer Receipt / Screenshot (Optional)
                  </span>
                  <span className="text-[10px] text-[#A8A196]">PNG, JPG, PDF up to 10MB</span>
                </div>

                {proofFileName ? (
                  <div className="flex items-center justify-between bg-[#181716] p-3 rounded-sm border border-[#C29E74]/50 text-xs">
                    <div className="flex items-center gap-2 text-[#C29E74]">
                      <FileCheck className="w-4 h-4" />
                      <span>{proofFileName} (Attached)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setProofFileName(null)}
                      className="text-[#D97762] hover:underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-[#3A352F] hover:border-[#C29E74] rounded-sm cursor-pointer transition-colors bg-[#181716]">
                    <span className="text-xs text-[#A8A196]">Click or drag transfer confirmation slip</span>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleProofUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

            </div>

          </div>

          {/* Right Column: Order Summary & Placement */}
          <div className="lg:col-span-5">
            <div className="bg-[#F2EDE5] p-6 sm:p-8 rounded-sm border border-[#E8E2DA] sticky top-28 space-y-6">
              <h3 className="font-editorial text-xl text-[#181716] font-medium border-b border-[#D8D0C4] pb-4">
                Order Summary ({cart.length} creations)
              </h3>

              {/* Line Items Preview */}
              <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3 text-xs">
                    <img
                      src={item.product.primaryImage}
                      alt={item.product.name}
                      className="w-14 h-18 object-cover rounded-sm bg-[#EAE4DB] shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h4 className="font-editorial text-sm font-medium text-[#181716] truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-[#7D7771]">
                          {item.selectedColor} • {item.selectedSize} (Qty: {item.quantity})
                        </p>
                      </div>
                      <span className="font-semibold text-[#181716]">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-2 text-xs text-[#5D5750] border-t border-[#D8D0C4] pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#181716]">{formatPrice(cartSubtotal)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-[#8F683D]">
                    <span>Privilege Discount ({appliedPromo?.code})</span>
                    <span>-{formatPrice(cartDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping ({selectedShipping.name})</span>
                  <span className="font-semibold text-[#181716]">
                    {effectiveShippingCost === 0 ? 'Complimentary' : formatPrice(effectiveShippingCost)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Bespoke Packaging &amp; Archive Box</span>
                  <span className="text-[#355E3B] font-medium">Included</span>
                </div>

                <div className="flex justify-between text-lg font-semibold text-[#181716] border-t border-[#D8D0C4] pt-4">
                  <span>Total Due</span>
                  <span>{formatPrice(finalGrandTotal)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                id="checkout-submit-btn"
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[#181716] hover:bg-[#34302C] text-[#FAF8F5] py-4 px-6 rounded-sm text-xs font-semibold uppercase tracking-[0.22em] transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
              >
                {isProcessing ? (
                  <span>Generating Atelier Dossier...</span>
                ) : (
                  <>
                    <span>Confirm &amp; Generate Order Dossier</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-2 text-center text-[10px] uppercase tracking-wider text-[#7D7771] flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8F683D]" />
                <span>Encrypted Atelier Order Validation</span>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
