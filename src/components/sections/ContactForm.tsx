import React, { useState } from 'react';
import supabaseEmailService from '../../services/supabaseEmailService';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleWhatsAppClick = () => {
    window.open('https://wa.link/mfzmps', '_blank');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.phone.trim()) {
      setSubmitMessage('יש למלא שם ומספר טלפון');
      return;
    }

    // Israeli phone number validation (basic)
    const phoneRegex = /^0[2-9]\d{7,8}$/;
    if (!phoneRegex.test(formData.phone.replace(/[-\s]/g, ''))) {
      setSubmitMessage('יש להזין מספר טלפון ישראלי תקין');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Send admin notification email via Supabase
      await supabaseEmailService.sendContactFormNotification({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || '',
        message: 'הרשמה לעדכונים מהאתר'
      });

      // Send auto-reply if email provided
      if (formData.email.trim()) {
        await supabaseEmailService.sendContactFormAutoReply(formData.email, formData.name);
      }

      // Store in localStorage for demo purposes (existing functionality)
      const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
      contacts.push({
        ...formData,
        timestamp: new Date().toISOString(),
        source: 'contact_form'
      });
      localStorage.setItem('contacts', JSON.stringify(contacts));
      
      setSubmitMessage('תודה! נציג יצור איתך קשר בקרוב');
      setFormData({ name: '', phone: '', email: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitMessage('שגיאה בשליחה, אנא נסו שוב');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-bg-primary text-text-primary py-16 lg:py-24">
      <div className="mx-auto px-2 sm:px-4 max-w-[1200px]">
        {/* Title */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="typo-section-title mb-6 text-content">
            רוצים לדבר איתי?
          </h2>
          <p className="typo-body-large text-gray-300 mb-8">
          רוצים לארח אותי במועדון שלכם? <br />
          לא בטוחים אם הסדנה מתאימה לכם או שיש לכם כל שאלה אחרת? <br />
          מוזמנים לכתוב לי - אני עונה לכל אחד באופן אישי.
          </p>
          
          {/* WhatsApp Button */}
          <button 
            onClick={handleWhatsAppClick}
            className="bg-cta hover:bg-yellow-600 text-bg-primary 
                      typo-button-cta px-8 py-4 rounded-lg 
                      transition-colors inline-flex items-center gap-3 mb-8"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.4M12.043 21.785h-.004c-1.774 0-3.513-.477-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m5.413-7.402c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
            </svg>
            צ'אט בוואטסאפ
          </button>

          {/* Divider Text */}
          <div className="typo-body-large text-gray-300 mb-2">
            או
          </div>
          <p className="typo-body-large text-gray-300">
            השאירו פה פרטים בשביל לקבל עדכונים על הסדנאות הבאות
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8 lg:space-y-12">
            {/* Form Fields - Horizontal on Desktop */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Name Field */}
              <div className="flex-1">
                <label htmlFor="name" className="block typo-body-regular text-text-primary mb-2 text-right">
                  שם מלא
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 
                            text-text-primary placeholder-gray-400 focus:border-cta 
                            focus:outline-none focus:ring-2 focus:ring-cta focus:ring-opacity-50
                            transition-colors text-right"
                  
                />
              </div>

              {/* Phone Field */}
              <div className="flex-1">
                <label htmlFor="phone" className="block typo-body-regular text-text-primary mb-2 text-right">
                  מספר טלפון
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 
                            text-text-primary placeholder-gray-400 focus:border-cta 
                            focus:outline-none focus:ring-2 focus:ring-cta focus:ring-opacity-50
                            transition-colors text-right"
                  
                  dir="ltr"
                />
              </div>

              {/* Email Field */}
              <div className="flex-1">
                <label htmlFor="email" className="block typo-body-regular text-text-primary mb-2 text-right">
                  כתובת אימייל
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 
                            text-text-primary placeholder-gray-400 focus:border-cta 
                            focus:outline-none focus:ring-2 focus:ring-cta focus:ring-opacity-50
                            transition-colors text-right"
                  
                  dir="ltr"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center mt-8 lg:mt-20">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-cta hover:bg-yellow-600 text-bg-primary 
                          typo-button-cta px-8 py-4 rounded-lg 
                          transition-all duration-300 transform hover:scale-105
                          disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? 'שולח...' : 'הרשמה לעדכונים'}
              </button>
            </div>

            {/* Submit Message */}
            {submitMessage && (
              <div className={`text-center typo-body-regular mt-4 ${
                submitMessage.includes('תודה') ? 'text-green-400' : 'text-red-400'
              }`}>
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;