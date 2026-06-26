import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Copy, Check, Loader2, Mail, MapPin } from "lucide-react";

import { profile } from "@/config/profile";
import {
  engagementTypes,
  budgetBands,
  timelines,
  inquirySubject,
  inquiryBody,
  type Inquiry,
} from "@/config/contact";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please tell me your name."),
  email: z.string().trim().email("That doesn't look like a valid email."),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  engagement: z.string().min(1, "Pick what this is about."),
  budget: z.string().min(1, "Give me a rough range."),
  timeline: z.string().min(1, "When are you thinking?"),
  message: z
    .string()
    .trim()
    .min(20, "A little more detail helps — 20 characters minimum.")
    .max(2000, "Let's keep it under 2000 characters."),
});

type InquiryForm = z.infer<typeof inquirySchema>;

const fieldClass =
  "bg-card border-electric-blue/15 text-primary-text placeholder:text-secondary-text/60 focus-visible:ring-electric-blue/40";

export const ContactSection = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const form = useForm<InquiryForm>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      engagement: "",
      budget: "",
      timeline: "",
      message: "",
    },
  });

  const compose = (data: InquiryForm): { subject: string; body: string } => {
    const inquiry = data as Inquiry;
    return { subject: inquirySubject(inquiry), body: inquiryBody(inquiry) };
  };

  const onSubmit = (data: InquiryForm) => {
    const { subject, body } = compose(data);
    const href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    // Open the visitor's mail client with the fully-composed message.
    window.location.href = href;
    toast({
      title: "Opening your email client…",
      description:
        "Your inquiry is pre-filled and ready to send. Didn't open? Use “Copy as text” below.",
    });
  };

  const copyAsText = async () => {
    const data = form.getValues();
    const result = inquirySchema.safeParse(data);
    if (!result.success) {
      // Surface validation errors instead of copying an incomplete draft.
      form.trigger();
      toast({
        title: "Almost there",
        description: "Fill in the highlighted fields, then copy.",
        variant: "destructive",
      });
      return;
    }
    const { subject, body } = compose(result.data);
    const text = `To: ${profile.email}\nSubject: ${subject}\n\n${body}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied to clipboard",
        description: `Paste it into an email to ${profile.email}.`,
      });
    } catch {
      toast({
        title: "Couldn't copy automatically",
        description: `Please email ${profile.email} directly.`,
        variant: "destructive",
      });
    }
  };

  const selectField = (
    name: "engagement" | "budget" | "timeline",
    label: string,
    placeholder: string,
    options: { value: string; label: string }[]
  ) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-secondary-text">{label}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className={fieldClass}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-card border-electric-blue/20 text-primary-text">
              {options.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <section id="contact" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left: pitch */}
          <div className="lg:col-span-2 space-y-6">
            <p className="text-electric-blue text-sm font-semibold tracking-widest uppercase">
              Start a conversation
            </p>
            <h2 className="section-headline">
              Let's talk about
              <span className="text-electric-blue"> what's next.</span>
            </h2>
            <p className="body-large text-base">
              Tell me a little about what you have in mind. I read every inquiry
              personally and reply within a couple of business days.
            </p>

            <div className="space-y-3 pt-4">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-sm group w-fit"
              >
                <span className="w-9 h-9 rounded-lg bg-card border border-electric-blue/20 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-electric-blue" />
                </span>
                <span className="text-secondary-text group-hover:text-electric-blue transition-colors">
                  {profile.email}
                </span>
              </a>
              <div className="flex items-center gap-3 text-sm">
                <span className="w-9 h-9 rounded-lg bg-card border border-electric-blue/20 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-electric-blue" />
                </span>
                <span className="text-secondary-text">{profile.location}</span>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3">
            <div className="bg-card/40 border border-electric-blue/15 rounded-2xl p-6 sm:p-8 shadow-[var(--shadow-card)]">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                  noValidate
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-secondary-text">
                            Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ada Lovelace"
                              className={fieldClass}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-secondary-text">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="you@company.com"
                              className={fieldClass}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-secondary-text">
                          Company{" "}
                          <span className="text-secondary-text/50">
                            (optional)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Acme Inc."
                            className={fieldClass}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid sm:grid-cols-3 gap-5">
                    {selectField(
                      "engagement",
                      "About",
                      "Choose…",
                      engagementTypes
                    )}
                    {selectField("budget", "Budget", "Range…", budgetBands)}
                    {selectField("timeline", "Timeline", "When…", timelines)}
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-secondary-text">
                          Message
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            rows={5}
                            placeholder="A sentence or two about what you're working on and how I can help…"
                            className={`${fieldClass} resize-none`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col sm:flex-row gap-3 pt-1">
                    <button
                      type="submit"
                      disabled={form.formState.isSubmitting}
                      className="btn-primary-modern group inline-flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {form.formState.isSubmitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                      )}
                      Send inquiry
                    </button>
                    <button
                      type="button"
                      onClick={copyAsText}
                      className="btn-ghost-modern inline-flex items-center justify-center gap-2"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-electric-blue" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      {copied ? "Copied" : "Copy as text"}
                    </button>
                  </div>

                  <p className="text-xs text-secondary-text/70 pt-1">
                    No third-party form services — your message opens straight in
                    your own mail client. Nothing is stored on this site.
                  </p>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
