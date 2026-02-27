"use client";

import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import { PageFooter } from "@/components/contactUs/page-footer";
import { PageHeader } from "@/components/contactUs/page-header";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const contactInfo = [
  {
    icon: <MapPin className="h-5 w-5" />,
    title: "Address",
    details: ["123 Business Street", "Suite 456", "New York, NY 10001"],
  },
  {
    icon: <Phone className="h-5 w-5" />,
    title: "Phone",
    details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
  },
  {
    icon: <Mail className="h-5 w-5" />,
    title: "Email",
    details: ["support@company.com", "sales@company.com"],
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: "Business Hours",
    details: ["Monday - Friday: 9am - 6pm EST", "Saturday: 10am - 4pm EST"],
  },
];

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", data);
    setIsSubmitted(true);
    reset();

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageHeader
        title="Contact Us"
        description="Have a question or feedback? We'd love to hear from you."
      />

      <main className="flex-1 py-12">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="glass rounded-lg p-6 md:p-8">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Send us a message
                </h2>

                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-muted-foreground max-w-sm">
                      Thank you for reaching out. We'll get back to you within
                      24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Controller
                          name="firstName"
                          control={control}
                          rules={{ required: "First name is required" }}
                          render={({ field }) => (
                            <Input
                              {...field}
                              id="firstName"
                              placeholder="John"
                              className="bg-input/50 border-border/50 focus:border-primary"
                            />
                          )}
                        />
                        {errors.firstName && (
                          <p className="text-sm text-destructive">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Controller
                          name="lastName"
                          control={control}
                          rules={{ required: "Last name is required" }}
                          render={({ field }) => (
                            <Input
                              {...field}
                              id="lastName"
                              placeholder="Doe"
                              className="bg-input/50 border-border/50 focus:border-primary"
                            />
                          )}
                        />
                        {errors.lastName && (
                          <p className="text-sm text-destructive">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Controller
                          name="email"
                          control={control}
                          rules={{
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          }}
                          render={({ field }) => (
                            <Input
                              {...field}
                              id="email"
                              type="email"
                              placeholder="john@example.com"
                              className="bg-input/50 border-border/50 focus:border-primary"
                            />
                          )}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone (Optional)</Label>
                        <Controller
                          name="phone"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              id="phone"
                              type="tel"
                              placeholder="+1 (555) 000-0000"
                              className="bg-input/50 border-border/50 focus:border-primary"
                            />
                          )}
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Controller
                        name="subject"
                        control={control}
                        rules={{ required: "Please select a subject" }}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="bg-input/50 border-border/50 focus:border-primary">
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">
                                General Inquiry
                              </SelectItem>
                              <SelectItem value="support">
                                Technical Support
                              </SelectItem>
                              <SelectItem value="sales">
                                Sales Question
                              </SelectItem>
                              <SelectItem value="billing">
                                Billing Issue
                              </SelectItem>
                              <SelectItem value="partnership">
                                Partnership Opportunity
                              </SelectItem>
                              <SelectItem value="feedback">Feedback</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.subject && (
                        <p className="text-sm text-destructive">
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Controller
                        name="message"
                        control={control}
                        rules={{
                          required: "Message is required",
                          minLength: {
                            value: 10,
                            message: "Message must be at least 10 characters",
                          },
                        }}
                        render={({ field }) => (
                          <Textarea
                            {...field}
                            id="message"
                            placeholder="How can we help you?"
                            rows={5}
                            className="bg-input/50 border-border/50 focus:border-primary resize-none"
                          />
                        )}
                      />
                      {errors.message && (
                        <p className="text-sm text-destructive">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-2 space-y-6">
              <div className="glass rounded-lg p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  {contactInfo?.map((item) => (
                    <div key={item?.title} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                        {item?.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-1">
                          {item?.title}
                        </h3>
                        {item?.details.map((detail, index) => (
                          <p
                            key={index}
                            className="text-sm text-muted-foreground"
                          >
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="glass rounded-lg p-6">
                <h3 className="font-medium text-foreground mb-4">
                  Our Location
                </h3>
                <div className="aspect-video rounded-md bg-secondary/50 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-sm">Interactive map</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <PageFooter />
    </div>
  );
}
