import { Linkedin, Twitter, Github, Mail, Calendar, MapPin, ExternalLink } from "lucide-react";
import { profile, navItems } from "@/config/profile";

const socialLinks = [
  { icon: Linkedin, href: profile.social.linkedin, label: "LinkedIn" },
  { icon: Twitter, href: profile.social.twitter, label: "Twitter" },
  { icon: Github, href: profile.social.github, label: "GitHub" },
  { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
].filter((s) => s.href);

const scrollTo = (href: string) =>
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="py-16 bg-card/30 border-t border-electric-blue/20">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-primary-text">
                Let's Build the Future
                <span className="text-electric-blue"> Together</span>
              </h3>
              <p className="text-secondary-text max-w-md">
                Ready to transform your vision into reality? I'm always open to discussing new opportunities,
                strategic partnerships, and innovative projects that can make a global impact.
              </p>
            </div>

            {/* Quick Contact */}
            <div className="space-y-3">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center space-x-3 text-sm group w-fit"
              >
                <Mail className="w-4 h-4 text-electric-blue" />
                <span className="text-secondary-text group-hover:text-electric-blue transition-colors">
                  {profile.email}
                </span>
              </a>

              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="w-4 h-4 text-electric-blue" />
                <span className="text-secondary-text">{profile.location}</span>
              </div>

              <div className="flex items-center space-x-3 text-sm">
                <Calendar className="w-4 h-4 text-electric-blue" />
                <span className="text-secondary-text">Available for consulting engagements</span>
              </div>
            </div>
          </div>

          {/* Links Column */}
          <div className="space-y-6">
            <h4 className="font-semibold text-primary-text">Quick Links</h4>
            <div className="space-y-3">
              {navItems.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="block text-secondary-text hover:text-electric-blue transition-colors text-sm group"
                >
                  <span className="flex items-center space-x-2">
                    <span>{link.label}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Connect Column */}
          <div className="space-y-6">
            <h4 className="font-semibold text-primary-text">Connect</h4>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-card hover:bg-electric-blue/20 border border-electric-blue/20 hover:border-electric-blue/40 rounded-lg flex items-center justify-center transition-all duration-300 group"
                >
                  <social.icon className="w-5 h-5 text-secondary-text group-hover:text-electric-blue transition-colors" />
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <a
                href={`mailto:${profile.email}?subject=Let's%20schedule%20a%20call`}
                className="btn-primary w-full text-sm inline-flex items-center justify-center"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule a Call
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-electric-blue/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-secondary-text text-sm">
            © {year} {profile.name}. All rights reserved. · Built with passion for innovation.
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-secondary-text">Available for new projects</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
