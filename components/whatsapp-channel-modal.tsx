"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { X, Copy, Check, ExternalLink } from "lucide-react";

const WHATSAPP_CHANNEL_URL = "https://whatsapp.com/channel/0029VbC4Ld5BPzjQNzMY1s0q";

// localStorage key  → permanent "never show again" (X button or Join)
const PERMANENT_KEY = (userId: string) => `ww_wa_dismissed_${userId}`;
// sessionStorage key → "maybe later" (clears when browser tab/session ends = next login)
const SESSION_KEY = (userId: string) => `ww_wa_session_${userId}`;


// Animated WhatsApp SVG icon
interface WhatsAppIconProps {
  className?: string;
  style?: CSSProperties;
}

export function WhatsAppIcon({ className, style }: WhatsAppIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className={className}
      style={style}
      fill="none"
    >
      <circle cx="24" cy="24" r="24" fill="#25D366" />
      <path
        fill="#fff"
        d="M34.6 13.4A14.7 14.7 0 0 0 24 9C16.3 9 10 15.3 10 23c0 2.5.7 4.9 1.9 7L10 38l8.2-1.9a14.8 14.8 0 0 0 5.8 1.2h.1C31.7 37.3 38 31 38 23.3c0-3.9-1.5-7.6-4.2-10.3h.8ZM24 35c-2 0-4-.5-5.8-1.5l-.4-.2-4.2 1 1-4-.3-.4A12 12 0 0 1 12.7 23c0-6.2 5-11.2 11.3-11.2a11 11 0 0 1 11.2 11.2c0 6.2-5.1 11.2-11.2 11.2Zm6.2-8.4c-.3-.2-1.9-1-2.2-1-.3-.2-.5-.2-.7.1-.2.3-.8 1-.9 1.2-.2.2-.4.2-.7 0-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2-.2-.3 0-.5.2-.6l.6-.7.2-.4v-.4l-1-2.5c-.2-.5-.5-.5-.7-.5h-.5c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1 2.8 1.2 3c.2.2 2 3.1 5 4.3.7.3 1.3.5 1.7.6.7.2 1.3.2 1.9.1.6-.1 1.8-.7 2.1-1.4.3-.7.3-1.3.2-1.4l-.5-.4Z"
      />
    </svg>
  );
}

interface WhatsAppChannelModalProps {
  userId: string;
}

export default function WhatsAppChannelModal({ userId }: WhatsAppChannelModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (!userId) return;

    // 1. If permanently dismissed → never show
    const permanentlySeen = localStorage.getItem(PERMANENT_KEY(userId));
    if (permanentlySeen) return;

    // 2. If "maybe later" was clicked this session → skip until next login
    const sessionSeen = sessionStorage.getItem(SESSION_KEY(userId));
    if (sessionSeen) return;

    // 3. Show after a short delay
    const timer = setTimeout(() => {
      setIsOpen(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimateIn(false));
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setAnimateIn(true))
        );
      });
    }, 1200);
    return () => clearTimeout(timer);
  }, [userId]);

  // Permanently dismiss — never show again for this user
  const handleDismissPermanently = () => {
    setAnimateIn(false);
    setTimeout(() => {
      setIsOpen(false);
      localStorage.setItem(PERMANENT_KEY(userId), "true");
    }, 350);
  };

  // "Maybe later" — hide for this session, show again on next login
  const handleMaybeLater = () => {
    setAnimateIn(false);
    setTimeout(() => {
      setIsOpen(false);
      sessionStorage.setItem(SESSION_KEY(userId), "true");
    }, 350);
  };

  const handleClose = handleDismissPermanently;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(WHATSAPP_CHANNEL_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = WHATSAPP_CHANNEL_URL;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleJoin = () => {
    window.open(WHATSAPP_CHANNEL_URL, "_blank", "noopener,noreferrer");
    // Permanently mark as seen when they actually join
    localStorage.setItem(PERMANENT_KEY(userId), "true");
    setAnimateIn(false);
    setTimeout(() => setIsOpen(false), 350);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9998,
          background: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          opacity: animateIn ? 1 : 0,
          transition: "opacity 0.35s ease",
        }}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="whatsapp-modal-title"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            pointerEvents: "auto",
            width: "100%",
            maxWidth: "420px",
            background:
              "linear-gradient(135deg, oklch(0.15 0.01 0) 0%, oklch(0.13 0.008 127) 100%)",
            border: "1px solid oklch(0.88 0.19 127 / 0.3)",
            borderRadius: "1.25rem",
            boxShadow:
              "0 0 0 1px oklch(0.88 0.19 127 / 0.15), 0 25px 60px -12px rgba(0,0,0,0.8), 0 0 80px oklch(0.88 0.19 127 / 0.08)",
            padding: "2rem",
            position: "relative",
            opacity: animateIn ? 1 : 0,
            transform: animateIn ? "translateY(0) scale(1)" : "translateY(24px) scale(0.96)",
            transition: "opacity 0.35s cubic-bezier(0.34,1.56,0.64,1), transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          {/* Close button */}
          <button
            onClick={handleMaybeLater}
            id="whatsapp-modal-close"
            aria-label="Close modal"
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              background: "oklch(0.22 0 0)",
              border: "1px solid oklch(0.28 0 0)",
              borderRadius: "50%",
              width: "2rem",
              height: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "oklch(0.65 0 0)",
              transition: "background 0.2s, color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "oklch(0.28 0 0)";
              (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.98 0 0)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "oklch(0.22 0 0)";
              (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.65 0 0)";
            }}
          >
            <X size={14} />
          </button>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            {/* Glowing icon wrapper */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                background: "oklch(0.88 0.19 127 / 0.08)",
                border: "1px solid oklch(0.88 0.19 127 / 0.2)",
                boxShadow: "0 0 32px oklch(0.88 0.19 127 / 0.15)",
                marginBottom: "1rem",
                animation: "wa-pulse 2.5s ease-in-out infinite",
              }}
            >
              <WhatsAppIcon style={{ width: "42px", height: "42px" }} />
            </div>

            {/* Badge */}
            <div
              style={{
                display: "inline-block",
                background: "oklch(0.88 0.19 127 / 0.12)",
                border: "1px solid oklch(0.88 0.19 127 / 0.3)",
                borderRadius: "999px",
                padding: "0.2rem 0.75rem",
                fontSize: "0.7rem",
                fontWeight: 600,
                color: "oklch(0.88 0.19 127)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              🎉 Official Channel
            </div>

            <h2
              id="whatsapp-modal-title"
              style={{
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "oklch(0.98 0 0)",
                marginBottom: "0.5rem",
                lineHeight: 1.3,
              }}
            >
              Join Our WhatsApp Channel
            </h2>
            <p
              style={{
                fontSize: "0.875rem",
                color: "oklch(0.65 0 0)",
                lineHeight: 1.6,
                maxWidth: "320px",
                margin: "0 auto",
              }}
            >
              Get real-time updates, task announcements, and exclusive tips
              directly from the Wisdom Works team.
            </p>
          </div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              background:
                "linear-gradient(to right, transparent, oklch(0.88 0.19 127 / 0.2), transparent)",
              marginBottom: "1.5rem",
            }}
          />

          {/* Link Box */}
          <div
            style={{
              background: "oklch(0.18 0 0)",
              border: "1px solid oklch(0.25 0 0)",
              borderRadius: "0.75rem",
              padding: "0.75rem 1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                flex: 1,
                overflow: "hidden",
                fontSize: "0.8rem",
                color: "oklch(0.55 0 0)",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                fontFamily: "monospace",
              }}
            >
              {WHATSAPP_CHANNEL_URL}
            </div>
            <button
              onClick={handleCopy}
              id="whatsapp-modal-copy"
              aria-label={copied ? "Copied!" : "Copy link"}
              title={copied ? "Copied!" : "Copy link"}
              style={{
                flexShrink: 0,
                background: copied
                  ? "oklch(0.88 0.19 127 / 0.15)"
                  : "oklch(0.22 0 0)",
                border: `1px solid ${copied ? "oklch(0.88 0.19 127 / 0.4)" : "oklch(0.28 0 0)"}`,
                borderRadius: "0.5rem",
                padding: "0.4rem 0.65rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: copied ? "oklch(0.88 0.19 127)" : "oklch(0.65 0 0)",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
              }}
            >
              {copied ? (
                <>
                  <Check size={13} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={13} />
                  Copy
                </>
              )}
            </button>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleJoin}
            id="whatsapp-modal-join"
            style={{
              width: "100%",
              padding: "0.85rem 1.5rem",
              borderRadius: "0.75rem",
              border: "none",
              background: "linear-gradient(135deg, #25D366 0%, #1da851 100%)",
              color: "#fff",
              fontSize: "0.95rem",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              boxShadow: "0 4px 20px rgba(37, 211, 102, 0.35)",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 8px 28px rgba(37, 211, 102, 0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 4px 20px rgba(37, 211, 102, 0.35)";
            }}
          >
            <WhatsAppIcon style={{ width: "20px", height: "20px" }} />
            Join Channel Now
            <ExternalLink size={14} style={{ opacity: 0.7 }} />
          </button>

          {/* Skip text */}
          <p
            style={{
              textAlign: "center",
              marginTop: "1rem",
              fontSize: "0.75rem",
              color: "oklch(0.4 0 0)",
            }}
          >
            <button
              onClick={handleMaybeLater}
              id="whatsapp-modal-skip"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "oklch(0.45 0 0)",
                fontSize: "0.75rem",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.color = "oklch(0.65 0 0)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.color = "oklch(0.45 0 0)")
              }
            >
              Maybe later
            </button>
          </p>
        </div>
      </div>

      {/* Pulse keyframe animation */}
      <style>{`
        @keyframes wa-pulse {
          0%, 100% { box-shadow: 0 0 32px oklch(0.88 0.19 127 / 0.15); }
          50% { box-shadow: 0 0 48px oklch(0.88 0.19 127 / 0.3), 0 0 0 8px oklch(0.88 0.19 127 / 0.04); }
        }
      `}</style>
    </>
  );
}
