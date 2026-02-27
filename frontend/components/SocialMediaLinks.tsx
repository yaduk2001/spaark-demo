import {
  FaYoutube,
  FaWhatsapp,
  FaInstagram,
  FaTelegram,
  FaFacebook,
  FaXTwitter
} from "react-icons/fa6";

const SocialMediaLinks = () => {
  const socialLinks = [
    {
      icon: FaYoutube,
      href: "https://youtube.com/@sparkteam-p7e"
    },
    {
      icon: FaWhatsapp,
      href: "https://whatsapp.com/channel/0029VbCSCQFFSAt6bb2LJW2Q"
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/sparkglobaltech"
    },
    {
      icon: FaXTwitter,
      href: "https://x.com/SparkGloba27762"
    },
    {
      icon: FaTelegram,
      href: "https://t.me/sparkglobaltech"
    },
    {
      icon: FaFacebook,
      href: "https://www.facebook.com/share/1Art5B6A7U/"
    }
  ];

  return (
    <div className="flex gap-4">
      {socialLinks.map((item, i) => (
        <a
          key={i}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 hover:text-[#FACC15] hover:bg-[#FACC15]/10 hover:border-[#FACC15]/30 transition-all duration-300 hover:scale-110"
        >
          <item.icon size={20} />
        </a>
      ))}
    </div>
  );
};

export default SocialMediaLinks;
