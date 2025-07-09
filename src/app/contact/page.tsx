"use client";

import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Github, Twitter, Linkedin, Send, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { submitContactForm } from "@/lib/actions";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    startTransition(async () => {
      try {
        const formDataObj = new FormData();
        formDataObj.append('name', formData.name);
        formDataObj.append('email', formData.email);
        formDataObj.append('subject', formData.subject);
        formDataObj.append('message', formData.message);

        const result = await submitContactForm(formDataObj);

        if (result.success) {
          setIsSubmitted(true);
          setFormData({ name: "", email: "", subject: "", message: "" });
          toast.success(result.message);
        } else {
          toast.error(result.error);
        }
      } catch (error) {
        console.error('Error submitting contact form:', error);
        toast.error('Failed to send message. Please try again.');
      }
    });
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const contactMethods = [
    {
      label: "Email",
      value: "hey@pragyam.space",
      href: "mailto:hey@pragyam.space",
      icon: Mail,
    },
    {
      label: "Twitter",
      value: "@pragyam_soni",
      href: "https://x.com/pragyam_soni",
      icon: Twitter,
    },
    {
      label: "GitHub",
      value: "github.com/prag-man",
      href: "https://github.com/prag-man",
      icon: Github,
    },
    {
      label: "LinkedIn",
      value: "in.linkedin.com/in/pragyam-soni-b55a6a192",
      href: "https://in.linkedin.com/in/pragyam-soni-b55a6a192",
      icon: Linkedin,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            contact
          </h1>
          <p className="md:text-lg text-sm text-muted-foreground leading-relaxed max-w-2xl">
            I&apos;m always interested in meaningful collaborations, technical discussions, 
            and connecting with fellow developers. Whether you have a project idea, 
            a question, or just want to chat about technology, feel free to reach out.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <MessageCircle className="h-5 w-5" />
                  Get in Touch
                </CardTitle>
              </CardHeader>
              <CardContent className="md:space-y-4 space-y-2">
                {contactMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div key={method.label} className="group">
                      <a
                        href={method.href}
                        target={method.href.startsWith('http') ? '_blank' : '_self'}
                        rel={method.href.startsWith('http') ? 'noopener noreferrer' : ''}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg border border-transparent hover:border-border hover:bg-muted/50 transition-all duration-200"
                      >
                        <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        <div>
                          <p className="font-medium text-primary group-hover:underline">
                            {method.label}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {method.value}
                          </p>
                        </div>
                      </a>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Response Time Note */}
            <div className="p-4 border border-border rounded-lg bg-muted/20">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-primary">Response Time:</span> I typically 
                respond to emails within 24-48 hours during weekdays. For urgent matters, 
                feel free to reach out on Twitter for faster response.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-primary">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              {isSubmitted && (
                <div className="mb-6 p-4 border border-green-200 bg-green-50 rounded-lg">
                  <p className="text-green-800 font-medium">
                    Thank you for your message! I&apos;ll get back to you soon.
                  </p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-primary">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="border-border"
                    placeholder="Your full name"
                    disabled={isPending}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-primary">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="border-border"
                    placeholder="your.email@example.com"
                    disabled={isPending}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-primary">Subject</Label>
                  <Input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    className="border-border"
                    placeholder="What's this about?"
                    disabled={isPending}
                  />
                  {errors.subject && (
                    <p className="text-sm text-red-600">{errors.subject}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-primary">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="border-border min-h-[120px] resize-none"
                    placeholder="Tell me about your project, question, or idea..."
                    disabled={isPending}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-600">{errors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isPending || isSubmitted}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isPending ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Send Message
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}