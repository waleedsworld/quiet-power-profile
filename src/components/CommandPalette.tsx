import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  ArrowUp,
  Command as CommandIcon,
  Copy,
  Github,
  Linkedin,
  Mail,
  Navigation,
  Twitter,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { DialogTitle } from "@/components/ui/dialog";
import { profile, navItems } from "@/config/profile";

/**
 * CommandPalette — a ⌘K / Ctrl+K quick-launcher for the profile.
 *
 * Self-contained: mount it once anywhere and it wires up its own global
 * keyboard shortcut plus a subtle floating hint. Jumps to any section,
 * copies the contact email, and opens social links — all from the keyboard.
 */
export const CommandPalette = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const run = (action: () => void) => {
    setOpen(false);
    // Let the dialog close before we act (smooth-scroll / focus handoff).
    requestAnimationFrame(action);
  };

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      toast.success("Email copied", { description: profile.email });
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const openLink = (url: string) =>
    window.open(url, "_blank", "noopener,noreferrer");

  const socials = [
    { key: "linkedin", label: "LinkedIn", url: profile.social.linkedin, Icon: Linkedin },
    { key: "twitter", label: "Twitter / X", url: profile.social.twitter, Icon: Twitter },
    { key: "github", label: "GitHub", url: profile.social.github, Icon: Github },
  ].filter((s) => s.url);

  return (
    <>
      {/* Floating hint — click to open, or press ⌘K */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open command menu"
        className="fixed bottom-5 right-5 z-40 hidden sm:flex items-center gap-2 rounded-full border border-electric-blue/20 bg-background/70 px-3.5 py-2 text-xs font-medium text-secondary-text shadow-lg backdrop-blur-md transition-colors hover:border-electric-blue/50 hover:text-electric-blue"
      >
        <CommandIcon className="h-3.5 w-3.5" />
        <span className="tracking-wide">
          <kbd className="font-sans">⌘</kbd>
          <kbd className="font-sans">K</kbd>
        </span>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">Command menu</DialogTitle>
        <CommandInput placeholder="Jump to a section, copy email, open a link…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Navigate">
            {navItems.map((item) => (
              <CommandItem
                key={item.href}
                value={`nav ${item.label}`}
                onSelect={() => run(() => scrollTo(item.href))}
              >
                <Navigation className="mr-2 h-4 w-4 text-electric-blue" />
                <span>{item.label}</span>
              </CommandItem>
            ))}
            <CommandItem value="top back to top" onSelect={() => run(scrollToTop)}>
              <ArrowUp className="mr-2 h-4 w-4 text-electric-blue" />
              <span>Back to top</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Contact">
            <CommandItem value="copy email" onSelect={() => run(copyEmail)}>
              <Copy className="mr-2 h-4 w-4 text-electric-blue" />
              <span>Copy email</span>
              <CommandShortcut>{profile.email}</CommandShortcut>
            </CommandItem>
            <CommandItem
              value="email compose mailto"
              onSelect={() => run(() => (window.location.href = `mailto:${profile.email}`))}
            >
              <Mail className="mr-2 h-4 w-4 text-electric-blue" />
              <span>Send an email</span>
            </CommandItem>
          </CommandGroup>

          {socials.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Connect">
                {socials.map(({ key, label, url, Icon }) => (
                  <CommandItem
                    key={key}
                    value={`open ${label}`}
                    onSelect={() => run(() => openLink(url))}
                  >
                    <Icon className="mr-2 h-4 w-4 text-electric-blue" />
                    <span>{label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};
