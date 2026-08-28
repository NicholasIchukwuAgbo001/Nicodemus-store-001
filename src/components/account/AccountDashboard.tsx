import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Order, Address } from '../../types';
import { formatPrice } from '../../utils/currency';
import { 
  Package, 
  MapPin, 
  User as UserIcon, 
  LogOut, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Truck, 
  Copy, 
  Building2, 
  Plus, 
  Trash2, 
  X, 
  ArrowRight, 
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AccountDashboard: React.FC = () => {
  const { 
    currentUser, 
    orders, 
    logout, 
    navigateTo, 
    updateProfile, 
    addAddress, 
    deleteAddress, 
    setDefaultAddress,
    showToast 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile'>('orders');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Profile Edit State
  const [editFirstName, setEditFirstName] = useState(currentUser?.firstName || '');
  const [editLastName, setEditLastName] = useState(currentUser?.lastName || '');
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '');

  // Add Address Modal state
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newRecipient, setNewRecipient] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newPostalCode, setNewPostalCode] = useState('');
  const [newCountry, setNewCountry] = useState('Nigeria');
  const [newPhone, setNewPhone] = useState('');

  if (!currentUser) {
    return (
      <div className="min-h-[70vh] bg-[#FAF8F5] flex flex-col items-center justify-center p-8">
        <h2 className="font-editorial text-3xl text-[#181716]">Please Sign In</h2>
        <p className="text-xs text-[#7D7771] mt-2">Sign in to access your client dashboard and order history.</p>
        <button
          onClick={() => navigateTo('shop')}
          className="mt-6 bg-[#181716] text-[#FAF8F5] px-6 py-3 text-xs uppercase tracking-widest cursor-pointer"
        >
          Explore Atelier
        </button>
      </div>
    );
  }

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      firstName: editFirstName,
      lastName: editLastName,
      phone: editPhone,
    });
    showToast('Profile Updated', 'Your client details have been updated.', 'success');
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet || !newCity || !newPostalCode) {
      showToast('Missing Fields', 'Please complete the address form.', 'warning');
      return;
    }
    const newAddr: Omit<Address, 'id'> = {
      title: newTitle || 'Residence',
      recipientName: newRecipient || `${currentUser.firstName} ${currentUser.lastName}`,
      street: newStreet,
      city: newCity,
      state: newState,
      postalCode: newPostalCode,
      country: newCountry,
      phone: newPhone || currentUser.phone,
      isDefault: false,
    };
    addAddress(newAddr);
    setShowAddressModal(false);
    setNewTitle('');
    setNewRecipient('');
    setNewStreet('');
    setNewCity('');
    setNewState('');
    setNewPostalCode('');
    setNewPhone('');
    showToast('Address Saved', 'New delivery address added to your address book.', 'success');
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    showToast(`${label} Copied`, `${text} copied to clipboard.`, 'success');
  };

  return (
    <div id="account-dashboard-page" className="min-h-screen bg-[#FAF8F5] py-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Membership Profile Header Banner */}
        <div className="bg-[#181716] text-[#FAF8F5] p-6 sm:p-10 rounded-sm shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-[#C29E74] text-[#181716] flex items-center justify-center font-editorial text-2xl font-bold">
              {currentUser.firstName[0]}{currentUser.lastName[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-editorial text-2xl sm:text-3xl text-[#FAF8F5]">
                  {currentUser.firstName} {currentUser.lastName}
                </h1>
                <span className="bg-[#C29E74] text-[#181716] text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-sm">
                  {currentUser.memberTier}
                </span>
              </div>
              <p className="text-xs text-[#A8A196] mt-1">{currentUser.email} • Client since {currentUser.joinedDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block border-r border-[#3A352F] pr-6">
              <span className="text-[10px] uppercase tracking-widest text-[#C29E74] block">Privé Orders</span>
              <span className="text-lg font-editorial text-[#FAF8F5]">{orders.length} Active Dossiers</span>
            </div>
            <button
              onClick={logout}
              className="bg-[#26231F] hover:bg-[#34302C] text-[#E8E2DA] border border-[#3A352F] px-4 py-2.5 rounded-sm text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex border-b border-[#E8E2DA] mt-10 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-4 px-6 text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center gap-2 whitespace-nowrap relative cursor-pointer ${
              activeTab === 'orders' ? 'text-[#181716]' : 'text-[#7D7771] hover:text-[#181716]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Orders &amp; Acquisitions ({orders.length})</span>
            {activeTab === 'orders' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#181716]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`pb-4 px-6 text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center gap-2 whitespace-nowrap relative cursor-pointer ${
              activeTab === 'addresses' ? 'text-[#181716]' : 'text-[#7D7771] hover:text-[#181716]'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Address Book ({currentUser.addresses.length})</span>
            {activeTab === 'addresses' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#181716]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-4 px-6 text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center gap-2 whitespace-nowrap relative cursor-pointer ${
              activeTab === 'profile' ? 'text-[#181716]' : 'text-[#7D7771] hover:text-[#181716]'
            }`}
          >
            <UserIcon className="w-4 h-4" />
            <span>Profile Settings</span>
            {activeTab === 'profile' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#181716]" />
            )}
          </button>
        </div>

        {/* TAB 1: ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="p-12 bg-[#F2EDE5] rounded-sm text-center">
                <Package className="w-10 h-10 text-[#8F683D] mx-auto mb-3" />
                <h3 className="font-editorial text-2xl text-[#181716]">No Orders Placed Yet</h3>
                <p className="text-xs text-[#7D7771] mt-1">Discover our catalog and acquire your first statement piece.</p>
                <button
                  onClick={() => navigateTo('shop')}
                  className="mt-6 bg-[#181716] text-[#FAF8F5] px-6 py-3 text-xs uppercase tracking-widest cursor-pointer"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-[#FAF8F5] p-6 rounded-sm border border-[#E8E2DA] hover:border-[#181716] transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E2DA] pb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-bold text-[#181716]">{order.id}</span>
                        <span className={`text-[10px] uppercase font-semibold px-2.5 py-0.5 rounded-sm ${
                          order.deliveryStatus === 'Delivered' ? 'bg-[#E3EFE5] text-[#285731]' :
                          order.deliveryStatus === 'Shipped' ? 'bg-[#E5EEF9] text-[#1E4A7D]' :
                          'bg-[#FAF1E4] text-[#8F683D]'
                        }`}>
                          {order.deliveryStatus}
                        </span>
                        <span className="text-[10px] uppercase font-medium bg-[#181716] text-[#FAF8F5] px-2 py-0.5 rounded-sm">
                          Payment: {order.paymentStatus}
                        </span>
                      </div>
                      <p className="text-xs text-[#7D7771] mt-1">Placed on {order.date}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-lg font-semibold text-[#181716]">{formatPrice(order.total)}</span>
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="bg-[#181716] text-[#FAF8F5] px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#34302C] cursor-pointer"
                      >
                        View Dossier
                      </button>
                    </div>
                  </div>

                  {/* Items Preview */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 text-xs">
                        <img
                          src={item.product.primaryImage}
                          alt={item.product.name}
                          className="w-12 h-16 object-cover rounded-sm bg-[#EAE4DB]"
                        />
                        <div className="min-w-0">
                          <p className="font-editorial text-xs font-medium text-[#181716] truncate">{item.product.name}</p>
                          <p className="text-[10px] text-[#7D7771]">Qty: {item.quantity} • {formatPrice(item.product.price * item.quantity)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: ADDRESS BOOK */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-xs text-[#7D7771]">Manage saved residences and delivery destinations across Nigeria.</p>
              <button
                onClick={() => setShowAddressModal(true)}
                className="bg-[#181716] text-[#FAF8F5] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Destination
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentUser.addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="bg-[#FAF8F5] p-6 rounded-sm border border-[#E8E2DA] space-y-3 relative"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#8F683D] font-semibold">{addr.title}</span>
                      <h4 className="font-editorial text-base text-[#181716] font-medium mt-0.5">
                        {addr.recipientName}
                      </h4>
                    </div>
                    {addr.isDefault && (
                      <span className="bg-[#181716] text-[#FAF8F5] text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-sm font-semibold">
                        Default
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#5D5750]">{addr.street}</p>
                  <p className="text-xs text-[#5D5750]">{addr.city}, {addr.state} {addr.postalCode}</p>
                  <p className="text-xs text-[#5D5750]">{addr.country}</p>
                  <p className="text-xs text-[#7D7771] pt-1">Tel: {addr.phone}</p>

                  <div className="pt-3 border-t border-[#E8E2DA] flex justify-between items-center">
                    {!addr.isDefault ? (
                      <button
                        onClick={() => setDefaultAddress(addr.id)}
                        className="text-xs text-[#8F683D] hover:underline font-semibold cursor-pointer"
                      >
                        Set as Default
                      </button>
                    ) : (
                      <span className="text-[11px] text-[#355E3B] font-medium">Active Default</span>
                    )}

                    <button
                      onClick={() => deleteAddress(addr.id)}
                      className="text-xs text-[#A85A44] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PROFILE SETTINGS */}
        {activeTab === 'profile' && (
          <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-sm border border-[#E8E2DA] max-w-2xl">
            <h3 className="font-editorial text-xl text-[#181716] mb-6">Client Profile Information</h3>
            <form onSubmit={handleProfileSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-[#7D7771] mb-1">First Name</label>
                  <input
                    type="text"
                    value={editFirstName}
                    onChange={(e) => setEditFirstName(e.target.value)}
                    required
                    className="w-full bg-[#FAF8F5] border border-[#D5CDBD] p-3 rounded-sm text-xs text-[#181716]"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-[#7D7771] mb-1">Last Name</label>
                  <input
                    type="text"
                    value={editLastName}
                    onChange={(e) => setEditLastName(e.target.value)}
                    required
                    className="w-full bg-[#FAF8F5] border border-[#D5CDBD] p-3 rounded-sm text-xs text-[#181716]"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#7D7771] mb-1">Email Address</label>
                <input
                  type="email"
                  value={currentUser.email}
                  disabled
                  className="w-full bg-[#EAE5DC] border border-[#D5CDBD] p-3 rounded-sm text-xs text-[#7D7771] cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#7D7771] mb-1">Phone Number (e.g. +234 803 000 0000)</label>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#D5CDBD] p-3 rounded-sm text-xs text-[#181716]"
                />
              </div>

              <button
                type="submit"
                className="bg-[#181716] text-[#FAF8F5] py-3 px-6 rounded-sm text-xs font-semibold uppercase tracking-wider hover:bg-[#34302C] transition-colors cursor-pointer"
              >
                Save Changes
              </button>
            </form>
          </div>
        )}

      </div>

      {/* Order Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-[#141312]/60" onClick={() => setSelectedOrder(null)} />
            <div className="relative bg-[#FAF8F5] rounded-lg max-w-2xl w-full p-6 sm:p-8 z-10 border border-[#E8E2DA] max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute top-5 right-5 p-1 text-[#7D7771] hover:text-[#181716] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-[10px] uppercase tracking-widest text-[#8F683D] font-semibold">Order Dossier</span>
              <h3 className="font-editorial text-2xl text-[#181716] mt-1">{selectedOrder.id}</h3>
              <p className="text-xs text-[#7D7771]">Initiated on {selectedOrder.date}</p>

              <div className="mt-6 space-y-3 divide-y divide-[#E8E2DA]">
                {selectedOrder.items.map((it) => (
                  <div key={it.id} className="pt-3 flex gap-3 text-xs">
                    <img src={it.product.primaryImage} alt="" className="w-14 h-18 object-cover rounded-sm" />
                    <div className="flex-1 flex justify-between">
                      <div>
                        <h5 className="font-editorial text-sm text-[#181716]">{it.product.name}</h5>
                        <p className="text-[#7D7771]">{it.selectedColor} • {it.selectedSize} (Qty: {it.quantity})</p>
                      </div>
                      <span className="font-semibold">{formatPrice(it.product.price * it.quantity)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8E2DA] text-xs space-y-1.5">
                <div className="flex justify-between"><span>Subtotal:</span><span>{formatPrice(selectedOrder.subtotal)}</span></div>
                <div className="flex justify-between"><span>Discount:</span><span>-{formatPrice(selectedOrder.discount)}</span></div>
                <div className="flex justify-between"><span>Shipping ({selectedOrder.shippingMethod.name}):</span><span>{formatPrice(selectedOrder.shippingFee)}</span></div>
                <div className="flex justify-between font-semibold text-sm pt-2 border-t"><span>Total:</span><span>{formatPrice(selectedOrder.total)}</span></div>
              </div>

              <div className="mt-6 p-4 bg-[#F2EDE5] rounded-sm text-xs space-y-1">
                <p className="font-semibold text-[#181716]">Bank Wire / NIP Reference: {selectedOrder.paymentReference}</p>
                <p className="text-[#7D7771]">Status: {selectedOrder.deliveryStatus} (Payment: {selectedOrder.paymentStatus})</p>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Address Modal */}
      <AnimatePresence>
        {showAddressModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-[#141312]/60" onClick={() => setShowAddressModal(false)} />
            <div className="relative bg-[#FAF8F5] rounded-lg max-w-md w-full p-6 sm:p-8 z-10 border border-[#E8E2DA]">
              <button
                onClick={() => setShowAddressModal(false)}
                className="absolute top-5 right-5 p-1 text-[#7D7771] hover:text-[#181716] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-editorial text-xl text-[#181716] mb-4">Add Delivery Destination</h3>

              <form onSubmit={handleAddAddress} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[#7D7771] uppercase mb-1">Residence Title</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Lekki Residence or Maitama Penthouse"
                    className="w-full bg-[#FAF8F5] border p-2.5 rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-[#7D7771] uppercase mb-1">Recipient Name</label>
                  <input
                    type="text"
                    value={newRecipient}
                    onChange={(e) => setNewRecipient(e.target.value)}
                    placeholder="Full name"
                    className="w-full bg-[#FAF8F5] border p-2.5 rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-[#7D7771] uppercase mb-1">Street Address</label>
                  <input
                    type="text"
                    value={newStreet}
                    onChange={(e) => setNewStreet(e.target.value)}
                    required
                    placeholder="Plot / Street number, Estate"
                    className="w-full bg-[#FAF8F5] border p-2.5 rounded-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[#7D7771] uppercase mb-1">City / Area</label>
                    <input
                      type="text"
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      required
                      placeholder="e.g. Lekki, Ikeja, Abuja"
                      className="w-full bg-[#FAF8F5] border p-2.5 rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[#7D7771] uppercase mb-1">State</label>
                    <input
                      type="text"
                      value={newState}
                      onChange={(e) => setNewState(e.target.value)}
                      placeholder="e.g. Lagos, FCT"
                      className="w-full bg-[#FAF8F5] border p-2.5 rounded-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[#7D7771] uppercase mb-1">Postal Code</label>
                  <input
                    type="text"
                    value={newPostalCode}
                    onChange={(e) => setNewPostalCode(e.target.value)}
                    required
                    placeholder="105102"
                    className="w-full bg-[#FAF8F5] border p-2.5 rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-[#7D7771] uppercase mb-1">Country</label>
                  <input
                    type="text"
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    required
                    className="w-full bg-[#FAF8F5] border p-2.5 rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-[#7D7771] uppercase mb-1">Telephone</label>
                  <input
                    type="tel"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+234 803 000 0000"
                    className="w-full bg-[#FAF8F5] border p-2.5 rounded-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#181716] text-[#FAF8F5] py-3 text-xs uppercase tracking-wider font-semibold rounded-sm mt-4 cursor-pointer"
                >
                  Save Destination
                </button>
              </form>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
