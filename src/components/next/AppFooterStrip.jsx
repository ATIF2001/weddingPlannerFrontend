"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTiktok, faSnapchat } from "@fortawesome/free-brands-svg-icons";
import { useSiteContent } from "../../hooks/useSiteContent";

export default function AppFooterStrip() {
  const { getText } = useSiteContent();
  const tiktokUrl = getText("home.social.tiktok", "https://tiktok.com/@mk.4events");
  const snapchatUrl = getText("home.social.snapchat", "https://www.snapchat.com/add/mk4events?share_id=mE8wrDeFJy8&locale=en-GB");
  const instagramUrl = getText("home.social.instagram", "https://www.instagram.com/mk.4events?igsh=MThnc3ZpdHM3cGV4cQ==");

  return (
    <section className="border-t border-white/10 bg-white/5 px-12 py-6 text-white md:px-24">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <Link href="/terms-and-conditions" className="text-lg text-white/90 hover:underline">
          Terms & Conditions
        </Link>
        <p className="text-lg text-white/90">
          ©2026 {" "}
          <a href="https://www.joveraits.ae/" target="_blank" rel="noopener noreferrer" className="hover:underline">
            Jovera IT Services
          </a>
          . All Rights Reserved.
        </p>
        <div className="mt-6 flex gap-3">
          <a href={tiktokUrl} target="_blank" rel="noreferrer" aria-label="TikTok" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm">
            <FontAwesomeIcon icon={faTiktok} />
          </a>
          <a href={snapchatUrl} target="_blank" rel="noreferrer" aria-label="Snapchat" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm">
            <FontAwesomeIcon icon={faSnapchat} />
          </a>
          <a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
      </div>
    </section>
  );
}
