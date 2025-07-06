import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, MessageCircle, Headphones } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Store",
      details: [
        "123 Tech Avenue",
        "Silicon Valley, CA 94025",
        "United States"
      ]
    },
    {
      icon: Phone,
      title: "Call Us",
      details: [
        "+1 (555) 123-4567",
        "Toll-free: 1-800-LAPTOPS",
        "WhatsApp: +1 (555) 987-6543"
      ]
    },
    {
      icon: Mail,
      title: "Email Us",
      details: [
        "hello@lovablelaptops.com",  
        "support@lovablelaptops.com",
        "sales@lovablelaptops.com"
      ]
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9AM - 8PM",
        "Saturday: 10AM - 6PM", 
        "Sunday: 12PM - 5PM"
      ]
    }
  ];

  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our tech experts",
      action: "Start Chat",
      gradient: "gradient-primary"
    },
    {
      icon: Headphones,
      title: "Phone Support",
      description: "Speak directly with our support team",
      action: "Call Now",
      gradient: "gradient-secondary"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us your questions anytime",
      action: "Send Email",
      gradient: "bg-electric"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 gradient-primary text-white font-medium text-lg px-4 py-2">
            Get in Touch
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold font-space-grotesk mb-6 text-white">
            We're Here to
            <span className="block bg-gradient-to-r from-primary-glow to-secondary-glow bg-clip-text text-transparent">
              Help You
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have questions about laptops? Need technical support? Want to chat about the latest tech trends? 
            Our friendly team of experts is ready to assist you every step of the way.
          </p>
        </div>
      </section>

      {/* Quick Support Options */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
              Get Help Right Now
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose the support method that works best for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {supportOptions.map((option, index) => (
              <div key={index} className="glass-card p-8 rounded-2xl text-center glow-hover">
                <div className={`w-16 h-16 ${option.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <option.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold font-space-grotesk mb-3">
                  {option.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {option.description}
                </p>
                <Button className="w-full gradient-primary hover:opacity-90 text-white font-semibold">
                  {option.action}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <Badge className="mb-4 gradient-secondary text-white font-medium">
                  Send Message
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
                  Drop Us a Line
                </h2>
                <p className="text-lg text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="glass-button border-card-border focus:border-primary"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="glass-button border-card-border focus:border-primary"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="glass-button border-card-border focus:border-primary"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="glass-button border-card-border focus:border-primary resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full gradient-primary hover:opacity-90 text-white font-semibold py-6"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <div className="mb-8">
                <Badge className="mb-4 bg-electric text-electric-foreground font-medium">
                  Contact Info
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
                  Let's Connect
                </h2>
                <p className="text-lg text-muted-foreground">
                  Multiple ways to reach us. We're always happy to hear from you!
                </p>
              </div>

              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="glass-card p-6 rounded-2xl">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold font-space-grotesk mb-2">
                          {info.title}
                        </h3>
                        <div className="space-y-1">
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-muted-foreground">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="mt-8">
                <div className="aspect-video rounded-2xl glass-card overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 mx-auto mb-4 text-primary" />
                      <p className="text-lg font-semibold">Interactive Map</p>
                      <p className="text-sm text-muted-foreground">Coming Soon</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 gradient-primary text-white font-medium">
              FAQ
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Quick answers to common questions
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                q: "Do you offer warranty on laptops?",
                a: "Yes! All our laptops come with manufacturer warranty plus our own 30-day satisfaction guarantee."
              },
              {
                q: "Can I return a laptop if I'm not satisfied?",
                a: "Absolutely! We offer a 30-day return policy for all laptops in original condition."
              },
              {
                q: "Do you provide technical support?",
                a: "Yes, our tech experts provide free setup assistance and ongoing support for all customers."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, PayPal, and offer financing options for qualified customers."
              },
              {
                q: "How fast is shipping?",
                a: "Standard shipping is 3-5 business days. Express shipping (1-2 days) is available for urgent orders."
              },
              {
                q: "Do you offer business discounts?",
                a: "Yes! We offer special pricing for businesses, schools, and bulk orders. Contact us for details."
              }
            ].map((faq, index) => (
              <div key={index} className="glass-card p-6 rounded-2xl">
                <h3 className="font-bold text-lg mb-3">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;