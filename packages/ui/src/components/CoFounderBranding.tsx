
interface CoFounderBrandingProps {
  text?: string;
  className?: string;
  logoSrc?: string;
}

const CoFounderBranding = ({
  text = "Powered by Co-Founder BD",
  className = "",
  logoSrc = "/CoFounder.ico",
}: CoFounderBrandingProps) => {
  return (
    <div className={`inline-flex flex-nowrap items-center justify-center gap-1.5 align-middle ${className}`}>
      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest leading-relaxed whitespace-nowrap">
        {text}
      </span>
      <div className="w-5 h-5 rounded-full bg-neutral-100 border border-gray-200 flex flex-shrink-0 items-center justify-center overflow-hidden">
        <a href="https://cofounderbd.com" target="_blank" rel="noopener noreferrer">
          <img
            src={logoSrc}
            alt="Co-Founder BD"
            className="w-full h-full object-cover"
          />
        </a>
      </div>
    </div>
  );
};

export default CoFounderBranding;
