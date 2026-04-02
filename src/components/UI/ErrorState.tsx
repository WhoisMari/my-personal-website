import "./errorStateStyles.scss";

interface ErrorStateProps {
  message: string;
}

const ErrorSVG = () => (
  <svg
    width="150"
    height="150"
    viewBox="0 0 150 150"
    xmlns="http://www.w3.org/2000/svg"
    className="error-svg"
    aria-hidden="true"
  >
    <ellipse cx="75" cy="138" rx="38" ry="7" fill="#e95186" opacity="0.15" />
    <circle cx="75" cy="72" r="52" fill="#b4134c" opacity="0.07" />
    <circle cx="75" cy="72" r="44" fill="#b4134c" />
    <path d="M 48 42 A 44 44 0 0 1 102 42" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.15" />
    <polyline points="62,30 68,52 61,63 67,88" fill="none" stroke="white" strokeWidth="1.5" strokeLinejoin="round" opacity="0.25" />
    <polyline points="68,52 79,58 88,50" fill="none" stroke="white" strokeWidth="1.5" strokeLinejoin="round" opacity="0.2" />
    <rect x="70" y="44" width="10" height="34" rx="5" fill="white" />
    <circle cx="75" cy="92" r="6" fill="white" />
    <rect x="16" y="48" width="10" height="4" rx="2" fill="#e95186" opacity="0.65" className="fragment fragment-1" transform="rotate(-22, 16, 48)" />
    <rect x="122" y="40" width="8" height="4" rx="2" fill="#f3a4c0" opacity="0.7" className="fragment fragment-2" transform="rotate(18, 122, 40)" />
    <rect x="125" y="95" width="9" height="4" rx="2" fill="#e95186" opacity="0.55" className="fragment fragment-3" transform="rotate(-12, 125, 95)" />
    <rect x="10" y="92" width="7" height="4" rx="2" fill="#f3a4c0" opacity="0.6" className="fragment fragment-4" transform="rotate(28, 10, 92)" />
    <circle cx="24" cy="72" r="4" fill="#f3a4c0" opacity="0.45" className="dot dot-1" />
    <circle cx="126" cy="68" r="5" fill="#e95186" opacity="0.35" className="dot dot-2" />
    <circle cx="75" cy="14" r="4" fill="#f3a4c0" opacity="0.45" className="dot dot-3" />
    <circle cx="118" cy="112" r="3" fill="#b4134c" opacity="0.3" className="dot dot-4" />
    <circle cx="30" cy="108" r="3" fill="#e95186" opacity="0.35" className="dot dot-5" />
  </svg>
);

const ErrorState = ({ message }: ErrorStateProps) => (
  <div className="wrap-error-state">
    <ErrorSVG />
    <p className="error-title">Oops!</p>
    <p className="error-message">{message || "Something went wrong."}</p>
  </div>
);

export default ErrorState;
