import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import type { IconType } from "react-icons";

// Official brand marks — lucide-react intentionally excludes trademarked
// logos, so these come from react-icons instead. Keyed by the `icon`
// string on each entry in lib/contact.ts, same pattern as industryIcons.ts.
export const socialIcons: Record<string, IconType> = {
  LinkedIn: FaLinkedinIn,
  X: FaXTwitter,
  Facebook: FaFacebookF,
  Instagram: FaInstagram,
};
