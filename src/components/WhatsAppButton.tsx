import React from 'react';
import { Button } from '@/components/ui/button';
import whatsappLogo from '@/assets/whatsapp-logo.svg';

const WhatsAppButton: React.FC = () => {
  const phoneNumber = '7707000725';
  const message = 'Hi! I\'m interested in your laptop products. Could you help me?';
  
  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      size="icon"
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
      aria-label="Contact us on WhatsApp"
    >
      <img src={whatsappLogo} alt="WhatsApp" className="h-7 w-7" />
    </Button>
  );
};

export default WhatsAppButton;