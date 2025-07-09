"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from 'lucide-react';
import Image from 'next/image';

interface GuestbookEntry {
  id: number;
  name: string;
  message: string;
  timestamp: Date;
}

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    message: ''
  });

  const validateForm = () => {
    const newErrors = { name: '', message: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
      isValid = false;
    } else if (formData.message.trim().length > 500) {
      newErrors.message = 'Message must be less than 500 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const newEntry: GuestbookEntry = {
      id: entries.length + 1,
      name: formData.name.trim(),
      message: formData.message.trim(),
      timestamp: new Date()
    };

    setEntries([newEntry, ...entries]);
    setFormData({ name: '', message: '' });
    setErrors({ name: '', message: '' });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (entries.length === 0) {
    return (
        <div className="h-screen bg-white ">
        {/* Header Section */}
        <header className="max-w-4xl mx-auto px-6 py-16 md:pt-16 md:pb-5">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
              guestbook
            </h1>
            <p className="text-lg md:text-xl text-muted leading-relaxed max-w-4xl">
              Share your thoughts, feedback, or just say hello. I'd love to hear from fellow developers, 
              designers, and anyone who stops by.
            </p>
          </div>
        </header>
        <div className="relative h-[50%] w-[90%] md:h-[65%] md:w-4xl rounded-2xl mx-auto">
          <Image src="/processing.png" alt="thoughts" fill className="object-cover absolute rounded-2xl" />
        </div>
      </div>
      );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageSquare className="h-8 w-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              Guestbook
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Share your thoughts, feedback, or just say hello. I'd love to hear from fellow developers, 
            designers, and anyone who stops by.
          </p>
        </div>

        {/* Add New Entry Form */}
        <Card className="mb-12 border-border">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">
              Leave a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`${errors.name ? 'border-destructive' : ''}`}
                />
                {errors.name && (
                  <p className="text-destructive text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <Textarea
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={4}
                  className={`resize-none ${errors.message ? 'border-destructive' : ''}`}
                />
                <div className="flex justify-between items-center mt-1">
                  <div>
                    {errors.message && (
                      <p className="text-destructive text-sm">{errors.message}</p>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {formData.message.length}/500 characters
                  </p>
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full md:w-auto transition-transform duration-200 hover:scale-105"
              >
                Submit Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Entries List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-primary mb-6">
            Messages ({entries.length})
          </h2>
          
          {entries.map((entry) => (
            <Card 
              key={entry.id} 
              className="border-border transition-shadow duration-200 hover:shadow-md"
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                  <h3 className="font-semibold text-primary text-lg">
                    {entry.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {formatTimestamp(entry.timestamp)}
                  </p>
                </div>
                <p className="text-foreground leading-relaxed">
                  {entry.message}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-center text-muted-foreground text-sm">
            Thank you for visiting and taking the time to leave a message.
          </p>
        </div>
      </div>
    </div>
  );
}