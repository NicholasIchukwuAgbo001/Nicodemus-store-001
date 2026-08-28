import React from 'react';
import { useStore } from '../../context/StoreContext';
import { BANK_DETAILS } from '../../data/storeConfig';
import { formatPrice } from '../../utils/currency';
import { 
  CheckCircle2, 
  Copy, 
  Truck, 
  Package, 
  ShieldCheck, 
  Building2, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  ChevronRight 
} from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { lastConfirmedOrder, orders, navigateTo, showToast } = useStore();

  const order = lastConfirmedOrder || orders[0];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    showToast(`${label} Copied`, `${text} copied to your clipboard.`, 'success');
  };

  if (!order) {
    return (
      <div className="min-h-[70vh] bg-[#FAF8F5] flex flex-col items-center justify-center p-8">
        <h2 className="font-editorial text-2xl text-[#181716]">No active order found</h2>
        <button
          onClick={() => navigateTo('shop')}
          className="mt-4 bg-[#181716] text-[#FAF8F5] px-6 py-3 text-xs uppercase tracking-widest"
        >
          Return to Atelier
        </button>
      </div>
    );
  }

  return (
    <div id="order-confirmation-page" className="min-h-screen bg-[#FAF8F5] py-14 pb-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Success Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-[#F2EDE5] text-[#8F683D] flex items-center justify-center mx-auto mb-4 border border-[#E8E2DA]">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8F683D]">
            Order Confirmation
          </span>

          <h1 className="font-editorial text-3xl sm:text-5xl text-[#181716] font-normal leading-tight">
            THANK YOU FOR YOUR ACQUISITION
          </h1>

          <p className="text-xs sm:text-sm text-[#7D7771] max-w-md mx-auto">
            Your acquisition dossier has been created. A receipt and packing overview have been forwarded to {order.customer.email}.
          </p>

          <div className="inline-flex items-center gap-2 bg-[#F2EDE5] px-4 py-2 rounded-full border border-[#E8E2DA] mt-4">
            <span className="text-xs text-[#7D7771] uppercase tracking-wider">Order Reference:</span>
            <strong className="text-xs font-mono font-bold text-[#181716]">{order.id}</strong>
            <button
              onClick={() => handleCopy(order.id, 'Order ID')}
              className="text-[#7D7771] hover:text-[#181716] ml-1 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Live Order Timeline Progress Status */}
        <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-sm border border-[#E8E2DA] shadow-xs">
          <h3 className="font-editorial text-lg text-[#181716] mb-6">Atelier Progress Status</h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative">
            {order.timeline.slice(0, 4).map((evt, idx) => (
              <div key={evt.label} className="flex flex-col sm:items-center sm:text-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                  evt.completed ? 'bg-[#181716] text-[#FAF8F5]' : evt.current ? 'bg-[#C29E74] text-[#FAF8F5]' : 'bg-[#EAE4DB] text-[#9E968B]'
                }`}>
                  {idx + 1}
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#181716]">{evt.label}</h4>
                  <p className="text-[11px] text-[#7D7771] mt-0.5">{evt.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bank Transfer Payment Summary Reminder */}
        <div className="bg-[#181716] text-[#FAF8F5] p-6 sm:p-8 rounded-sm shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#2D2A26] pb-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#C29E74]" />
              <h3 className="font-editorial text-lg text-[#FAF8F5]">Bank Transfer &amp; NIP Settlement Instructions</h3>
            </div>
            <span className="text-[10px] bg-[#C29E74] text-[#181716] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider">
              {order.paymentStatus}
            </span>
          </div>

          <p className="text-xs text-[#D5CDBC] leading-relaxed">
            Please transfer the total sum of <strong className="text-[#C29E74] text-sm">{formatPrice(order.total)}</strong> from your banking app or USSD to the dedicated corporate account below. Include your reference code in the narration/memo field.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-[#221F1B] p-4 rounded-sm border border-[#3A352F]">
            <div>
              <span className="text-[10px] text-[#8F683D] uppercase tracking-wider block">Narration / Memo Ref</span>
              <div className="flex items-center gap-2 mt-0.5">
                <strong className="font-mono text-[#C29E74] font-bold text-sm">{order.paymentReference}</strong>
                <button onClick={() => handleCopy(order.paymentReference, 'Reference Code')} className="cursor-pointer">
                  <Copy className="w-3.5 h-3.5 text-[#A8A196] hover:text-[#FAF8F5]" />
                </button>
              </div>
            </div>

            <div>
              <span className="text-[10px] text-[#8F683D] uppercase tracking-wider block">NUBAN Account Number</span>
              <div className="flex items-center gap-2 mt-0.5">
                <strong className="font-mono text-[#FAF8F5] text-sm font-semibold">{BANK_DETAILS.accountNumber}</strong>
                <button onClick={() => handleCopy(BANK_DETAILS.accountNumber, 'Account Number')} className="cursor-pointer">
                  <Copy className="w-3.5 h-3.5 text-[#A8A196] hover:text-[#FAF8F5]" />
                </button>
              </div>
            </div>

            <div>
              <span className="text-[10px] text-[#8F683D] uppercase tracking-wider block">Beneficiary Account Name</span>
              <strong className="text-[#FAF8F5] text-xs">{BANK_DETAILS.accountName}</strong>
            </div>

            <div>
              <span className="text-[10px] text-[#8F683D] uppercase tracking-wider block">Bank &amp; Sort Code</span>
              <strong className="text-[#FAF8F5] text-xs">{BANK_DETAILS.bankName} ({BANK_DETAILS.routingCode})</strong>
            </div>
          </div>
        </div>

        {/* Itemized Order Details & Address */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Purchased Items */}
          <div className="md:col-span-7 bg-[#FAF8F5] p-6 rounded-sm border border-[#E8E2DA] space-y-4">
            <h3 className="font-editorial text-lg text-[#181716] border-b border-[#E8E2DA] pb-3">
              Acquisition Dossier Items
            </h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-3 text-xs pb-3 border-b border-[#E8E2DA] last:border-0">
                  <img
                    src={item.product.primaryImage}
                    alt={item.product.name}
                    className="w-16 h-20 object-cover rounded-sm bg-[#EAE4DB]"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-editorial text-sm font-medium text-[#181716]">{item.product.name}</h4>
                      <p className="text-[11px] text-[#7D7771]">
                        Shade: {item.selectedColor} • Size: {item.selectedSize} (Qty: {item.quantity})
                      </p>
                    </div>
                    <span className="font-semibold text-[#181716]">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#E8E2DA] space-y-1.5 text-xs text-[#5D5750]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-[#8F683D]">
                  <span>Discount</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping ({order.shippingMethod.name})</span>
                <span>{order.shippingFee === 0 ? 'Complimentary' : formatPrice(order.shippingFee)}</span>
              </div>
              <div className="flex justify-between font-semibold text-sm text-[#181716] pt-2 border-t border-[#E8E2DA]">
                <span>Total Amount</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Delivery Address & Concierge Support */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-[#FAF8F5] p-6 rounded-sm border border-[#E8E2DA] space-y-3 text-xs">
              <h3 className="font-editorial text-lg text-[#181716] border-b border-[#E8E2DA] pb-2">
                Delivery Destination
              </h3>
              <p className="font-semibold text-[#181716]">
                {order.deliveryAddress.recipientName}
              </p>
              <p className="text-[#5D5750]">
                {order.deliveryAddress.street}
              </p>
              <p className="text-[#5D5750]">
                {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.postalCode}
              </p>
              <p className="text-[#5D5750]">{order.deliveryAddress.country}</p>
              <p className="text-[#7D7771] pt-1">Contact: {order.deliveryAddress.phone}</p>
            </div>

            <div className="bg-[#F2EDE5] p-6 rounded-sm border border-[#E8E2DA] space-y-3 text-xs">
              <h4 className="font-editorial text-base text-[#181716]">Private Concierge</h4>
              <p className="text-[#615B54] leading-relaxed">
                Need to amend delivery timing, request garment adjustments, or confirm your Nigerian bank transfer receipt? Our Lagos &amp; Abuja advisors are ready 24/7.
              </p>
              <button
                onClick={() => navigateTo('contact')}
                className="text-[#8F683D] underline font-semibold uppercase tracking-wider block cursor-pointer"
              >
                Contact Concierge
              </button>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <button
            onClick={() => navigateTo('account')}
            className="w-full sm:w-auto bg-[#181716] text-[#FAF8F5] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] rounded-sm hover:bg-[#34302C] transition-colors cursor-pointer"
          >
            Track in Client Account
          </button>
          <button
            onClick={() => navigateTo('shop')}
            className="w-full sm:w-auto bg-[#FAF8F5] text-[#181716] border border-[#181716] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] rounded-sm hover:bg-[#F2ECE3] transition-colors cursor-pointer"
          >
            Continue Exploring Collections
          </button>
        </div>

      </div>
    </div>
  );
};
