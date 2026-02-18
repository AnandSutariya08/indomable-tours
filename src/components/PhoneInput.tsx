import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, X } from "lucide-react";


// Flag img using flagcdn.com — renders correctly on all platforms/OS
export const getFlagUrl = (iso: string) =>
  `https://flagcdn.com/w20/${iso.toLowerCase()}.png`;

export const COUNTRY_CODES = [
  // ── Pinned popular ──
  { code: "+91",  country: "India",                        iso: "IN" },
  { code: "+1",   country: "United States",                iso: "US" },
  { code: "+1",   country: "Canada",                       iso: "CA" },
  { code: "+44",  country: "United Kingdom",               iso: "GB" },
  { code: "+971", country: "UAE",                          iso: "AE" },
  { code: "+977", country: "Nepal",                        iso: "NP" },
  { code: "+975", country: "Bhutan",                       iso: "BT" },
  { code: "+94",  country: "Sri Lanka",                    iso: "LK" },
  // ── A ──
  { code: "+93",  country: "Afghanistan",                  iso: "AF" },
  { code: "+355", country: "Albania",                      iso: "AL" },
  { code: "+213", country: "Algeria",                      iso: "DZ" },
  { code: "+376", country: "Andorra",                      iso: "AD" },
  { code: "+244", country: "Angola",                       iso: "AO" },
  { code: "+1268",country: "Antigua & Barbuda",            iso: "AG" },
  { code: "+54",  country: "Argentina",                    iso: "AR" },
  { code: "+374", country: "Armenia",                      iso: "AM" },
  { code: "+61",  country: "Australia",                    iso: "AU" },
  { code: "+43",  country: "Austria",                      iso: "AT" },
  { code: "+994", country: "Azerbaijan",                   iso: "AZ" },
  // ── B ──
  { code: "+1242",country: "Bahamas",                      iso: "BS" },
  { code: "+973", country: "Bahrain",                      iso: "BH" },
  { code: "+880", country: "Bangladesh",                   iso: "BD" },
  { code: "+1246",country: "Barbados",                     iso: "BB" },
  { code: "+375", country: "Belarus",                      iso: "BY" },
  { code: "+32",  country: "Belgium",                      iso: "BE" },
  { code: "+501", country: "Belize",                       iso: "BZ" },
  { code: "+229", country: "Benin",                        iso: "BJ" },
  { code: "+591", country: "Bolivia",                      iso: "BO" },
  { code: "+387", country: "Bosnia & Herzegovina",         iso: "BA" },
  { code: "+267", country: "Botswana",                     iso: "BW" },
  { code: "+55",  country: "Brazil",                       iso: "BR" },
  { code: "+673", country: "Brunei",                       iso: "BN" },
  { code: "+359", country: "Bulgaria",                     iso: "BG" },
  { code: "+226", country: "Burkina Faso",                 iso: "BF" },
  { code: "+257", country: "Burundi",                      iso: "BI" },
  // ── C ──
  { code: "+855", country: "Cambodia",                     iso: "KH" },
  { code: "+237", country: "Cameroon",                     iso: "CM" },
  { code: "+238", country: "Cape Verde",                   iso: "CV" },
  { code: "+236", country: "Central African Republic",     iso: "CF" },
  { code: "+235", country: "Chad",                         iso: "TD" },
  { code: "+56",  country: "Chile",                        iso: "CL" },
  { code: "+86",  country: "China",                        iso: "CN" },
  { code: "+57",  country: "Colombia",                     iso: "CO" },
  { code: "+269", country: "Comoros",                      iso: "KM" },
  { code: "+242", country: "Congo",                        iso: "CG" },
  { code: "+243", country: "Congo (DR)",                   iso: "CD" },
  { code: "+506", country: "Costa Rica",                   iso: "CR" },
  { code: "+385", country: "Croatia",                      iso: "HR" },
  { code: "+53",  country: "Cuba",                         iso: "CU" },
  { code: "+357", country: "Cyprus",                       iso: "CY" },
  { code: "+420", country: "Czech Republic",               iso: "CZ" },
  // ── D ──
  { code: "+45",  country: "Denmark",                      iso: "DK" },
  { code: "+253", country: "Djibouti",                     iso: "DJ" },
  { code: "+1767",country: "Dominica",                     iso: "DM" },
  { code: "+1809",country: "Dominican Republic",           iso: "DO" },
  // ── E ──
  { code: "+593", country: "Ecuador",                      iso: "EC" },
  { code: "+20",  country: "Egypt",                        iso: "EG" },
  { code: "+503", country: "El Salvador",                  iso: "SV" },
  { code: "+240", country: "Equatorial Guinea",            iso: "GQ" },
  { code: "+291", country: "Eritrea",                      iso: "ER" },
  { code: "+372", country: "Estonia",                      iso: "EE" },
  { code: "+268", country: "Eswatini",                     iso: "SZ" },
  { code: "+251", country: "Ethiopia",                     iso: "ET" },
  // ── F ──
  { code: "+679", country: "Fiji",                         iso: "FJ" },
  { code: "+358", country: "Finland",                      iso: "FI" },
  { code: "+33",  country: "France",                       iso: "FR" },
  { code: "+241", country: "Gabon",                        iso: "GA" },
  // ── G ──
  { code: "+220", country: "Gambia",                       iso: "GM" },
  { code: "+995", country: "Georgia",                      iso: "GE" },
  { code: "+49",  country: "Germany",                      iso: "DE" },
  { code: "+233", country: "Ghana",                        iso: "GH" },
  { code: "+30",  country: "Greece",                       iso: "GR" },
  { code: "+1473",country: "Grenada",                      iso: "GD" },
  { code: "+502", country: "Guatemala",                    iso: "GT" },
  { code: "+224", country: "Guinea",                       iso: "GN" },
  { code: "+245", country: "Guinea-Bissau",                iso: "GW" },
  { code: "+592", country: "Guyana",                       iso: "GY" },
  // ── H ──
  { code: "+509", country: "Haiti",                        iso: "HT" },
  { code: "+504", country: "Honduras",                     iso: "HN" },
  { code: "+36",  country: "Hungary",                      iso: "HU" },
  // ── I ──
  { code: "+354", country: "Iceland",                      iso: "IS" },
  { code: "+62",  country: "Indonesia",                    iso: "ID" },
  { code: "+98",  country: "Iran",                         iso: "IR" },
  { code: "+964", country: "Iraq",                         iso: "IQ" },
  { code: "+353", country: "Ireland",                      iso: "IE" },
  { code: "+972", country: "Israel",                       iso: "IL" },
  { code: "+39",  country: "Italy",                        iso: "IT" },
  { code: "+225", country: "Ivory Coast",                  iso: "CI" },
  // ── J ──
  { code: "+1876",country: "Jamaica",                      iso: "JM" },
  { code: "+81",  country: "Japan",                        iso: "JP" },
  { code: "+962", country: "Jordan",                       iso: "JO" },
  // ── K ──
  { code: "+7",   country: "Kazakhstan",                   iso: "KZ" },
  { code: "+254", country: "Kenya",                        iso: "KE" },
  { code: "+686", country: "Kiribati",                     iso: "KI" },
  { code: "+383", country: "Kosovo",                       iso: "XK" },
  { code: "+965", country: "Kuwait",                       iso: "KW" },
  { code: "+996", country: "Kyrgyzstan",                   iso: "KG" },
  // ── L ──
  { code: "+856", country: "Laos",                         iso: "LA" },
  { code: "+371", country: "Latvia",                       iso: "LV" },
  { code: "+961", country: "Lebanon",                      iso: "LB" },
  { code: "+266", country: "Lesotho",                      iso: "LS" },
  { code: "+231", country: "Liberia",                      iso: "LR" },
  { code: "+218", country: "Libya",                        iso: "LY" },
  { code: "+423", country: "Liechtenstein",                iso: "LI" },
  { code: "+370", country: "Lithuania",                    iso: "LT" },
  { code: "+352", country: "Luxembourg",                   iso: "LU" },
  // ── M ──
  { code: "+261", country: "Madagascar",                   iso: "MG" },
  { code: "+265", country: "Malawi",                       iso: "MW" },
  { code: "+60",  country: "Malaysia",                     iso: "MY" },
  { code: "+960", country: "Maldives",                     iso: "MV" },
  { code: "+223", country: "Mali",                         iso: "ML" },
  { code: "+356", country: "Malta",                        iso: "MT" },
  { code: "+692", country: "Marshall Islands",             iso: "MH" },
  { code: "+222", country: "Mauritania",                   iso: "MR" },
  { code: "+230", country: "Mauritius",                    iso: "MU" },
  { code: "+52",  country: "Mexico",                       iso: "MX" },
  { code: "+691", country: "Micronesia",                   iso: "FM" },
  { code: "+373", country: "Moldova",                      iso: "MD" },
  { code: "+377", country: "Monaco",                       iso: "MC" },
  { code: "+976", country: "Mongolia",                     iso: "MN" },
  { code: "+382", country: "Montenegro",                   iso: "ME" },
  { code: "+212", country: "Morocco",                      iso: "MA" },
  { code: "+258", country: "Mozambique",                   iso: "MZ" },
  { code: "+95",  country: "Myanmar",                      iso: "MM" },
  // ── N ──
  { code: "+264", country: "Namibia",                      iso: "NA" },
  { code: "+674", country: "Nauru",                        iso: "NR" },
  { code: "+31",  country: "Netherlands",                  iso: "NL" },
  { code: "+64",  country: "New Zealand",                  iso: "NZ" },
  { code: "+505", country: "Nicaragua",                    iso: "NI" },
  { code: "+227", country: "Niger",                        iso: "NE" },
  { code: "+234", country: "Nigeria",                      iso: "NG" },
  { code: "+850", country: "North Korea",                  iso: "KP" },
  { code: "+389", country: "North Macedonia",              iso: "MK" },
  { code: "+47",  country: "Norway",                       iso: "NO" },
  // ── O ──
  { code: "+968", country: "Oman",                         iso: "OM" },
  // ── P ──
  { code: "+92",  country: "Pakistan",                     iso: "PK" },
  { code: "+680", country: "Palau",                        iso: "PW" },
  { code: "+970", country: "Palestine",                    iso: "PS" },
  { code: "+507", country: "Panama",                       iso: "PA" },
  { code: "+675", country: "Papua New Guinea",             iso: "PG" },
  { code: "+595", country: "Paraguay",                     iso: "PY" },
  { code: "+51",  country: "Peru",                         iso: "PE" },
  { code: "+63",  country: "Philippines",                  iso: "PH" },
  { code: "+48",  country: "Poland",                       iso: "PL" },
  { code: "+351", country: "Portugal",                     iso: "PT" },
  // ── Q ──
  { code: "+974", country: "Qatar",                        iso: "QA" },
  // ── R ──
  { code: "+40",  country: "Romania",                      iso: "RO" },
  { code: "+7",   country: "Russia",                       iso: "RU" },
  { code: "+250", country: "Rwanda",                       iso: "RW" },
  // ── S ──
  { code: "+1869",country: "Saint Kitts & Nevis",          iso: "KN" },
  { code: "+1758",country: "Saint Lucia",                  iso: "LC" },
  { code: "+1784",country: "Saint Vincent & Grenadines",   iso: "VC" },
  { code: "+685", country: "Samoa",                        iso: "WS" },
  { code: "+378", country: "San Marino",                   iso: "SM" },
  { code: "+239", country: "Sao Tome & Principe",          iso: "ST" },
  { code: "+966", country: "Saudi Arabia",                 iso: "SA" },
  { code: "+221", country: "Senegal",                      iso: "SN" },
  { code: "+381", country: "Serbia",                       iso: "RS" },
  { code: "+248", country: "Seychelles",                   iso: "SC" },
  { code: "+232", country: "Sierra Leone",                 iso: "SL" },
  { code: "+65",  country: "Singapore",                    iso: "SG" },
  { code: "+421", country: "Slovakia",                     iso: "SK" },
  { code: "+386", country: "Slovenia",                     iso: "SI" },
  { code: "+677", country: "Solomon Islands",              iso: "SB" },
  { code: "+252", country: "Somalia",                      iso: "SO" },
  { code: "+27",  country: "South Africa",                 iso: "ZA" },
  { code: "+82",  country: "South Korea",                  iso: "KR" },
  { code: "+211", country: "South Sudan",                  iso: "SS" },
  { code: "+34",  country: "Spain",                        iso: "ES" },
  { code: "+249", country: "Sudan",                        iso: "SD" },
  { code: "+597", country: "Suriname",                     iso: "SR" },
  { code: "+46",  country: "Sweden",                       iso: "SE" },
  { code: "+41",  country: "Switzerland",                  iso: "CH" },
  { code: "+963", country: "Syria",                        iso: "SY" },
  // ── T ──
  { code: "+886", country: "Taiwan",                       iso: "TW" },
  { code: "+992", country: "Tajikistan",                   iso: "TJ" },
  { code: "+255", country: "Tanzania",                     iso: "TZ" },
  { code: "+66",  country: "Thailand",                     iso: "TH" },
  { code: "+670", country: "Timor-Leste",                  iso: "TL" },
  { code: "+228", country: "Togo",                         iso: "TG" },
  { code: "+676", country: "Tonga",                        iso: "TO" },
  { code: "+1868",country: "Trinidad & Tobago",            iso: "TT" },
  { code: "+216", country: "Tunisia",                      iso: "TN" },
  { code: "+90",  country: "Turkey",                       iso: "TR" },
  { code: "+993", country: "Turkmenistan",                 iso: "TM" },
  { code: "+688", country: "Tuvalu",                       iso: "TV" },
  // ── U ──
  { code: "+256", country: "Uganda",                       iso: "UG" },
  { code: "+380", country: "Ukraine",                      iso: "UA" },
  { code: "+598", country: "Uruguay",                      iso: "UY" },
  { code: "+998", country: "Uzbekistan",                   iso: "UZ" },
  // ── V ──
  { code: "+678", country: "Vanuatu",                      iso: "VU" },
  { code: "+379", country: "Vatican City",                 iso: "VA" },
  { code: "+58",  country: "Venezuela",                    iso: "VE" },
  { code: "+84",  country: "Vietnam",                      iso: "VN" },
  // ── Y ──
  { code: "+967", country: "Yemen",                        iso: "YE" },
  // ── Z ──
  { code: "+260", country: "Zambia",                       iso: "ZM" },
  { code: "+263", country: "Zimbabwe",                     iso: "ZW" },
];

export interface PhoneValue {
  countryCode: string;
  number: string;
  isValid: boolean;
  full: string;
}

interface PhoneInputProps {
  value: PhoneValue;
  onChange: (val: PhoneValue) => void;
  error?: string;
  className?: string;
  inputClassName?: string;
}

const PhoneInput = ({ value, onChange, error, className = "", inputClassName = "" }: PhoneInputProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = COUNTRY_CODES.find(c => c.code === value.countryCode) ?? COUNTRY_CODES[0];

  const filtered = search
    ? COUNTRY_CODES.filter(c =>
        c.country.toLowerCase().includes(search.toLowerCase()) ||
        c.code.includes(search)
      )
    : COUNTRY_CODES;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 50);
  }, [open]);

  const handleNumberChange = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, 10);
    const isValid = digits.length === 10;
    onChange({
      countryCode: value.countryCode,
      number: digits,
      isValid,
      full: isValid ? `${value.countryCode}${digits}` : "",
    });
  };

  const handleCountrySelect = (c: typeof COUNTRY_CODES[0]) => {
    const isValid = value.number.length === 10;
    onChange({
      countryCode: c.code,
      number: value.number,
      isValid,
      full: isValid ? `${c.code}${value.number}` : "",
    });
    setOpen(false);
    setSearch("");
  };

  const hasError = !!error || (value.number.length > 0 && value.number.length < 10);
  const isComplete = value.number.length === 10;

  return (
    <div className={`relative ${className}`}>
      <div
        className={`flex h-12 w-full rounded-xl border-2 overflow-hidden transition-all duration-200
          ${hasError ? "border-red-400 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-100" : "border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"} ${inputClassName}`}
      >
        {/* Country Selector */}
        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          className="flex items-center gap-1.5 px-3 bg-muted/60 hover:bg-muted border-r-2 border-border/60 transition-colors shrink-0 min-w-[88px]"
        >
          <img src={getFlagUrl(selected.iso)} alt={selected.country} width={20} height={14} className="rounded-sm object-cover shrink-0" style={{minWidth:20}} />
          <span className="font-body text-sm font-semibold text-foreground/80 tabular-nums">{selected.code}</span>
          <ChevronDown className={`w-3.5 h-3.5 text-foreground/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>

        {/* Number Input */}
        <div className="flex-1 relative">
          <input
            type="tel"
            inputMode="numeric"
            placeholder="10-digit number"
            maxLength={10}
            value={value.number}
            onChange={e => handleNumberChange(e.target.value)}
            className="w-full h-full px-4 bg-transparent font-body text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none tabular-nums tracking-wider"
          />
        </div>
      </div>

      {/* Error / hint */}
      {hasError && (
        <p className="mt-1.5 text-xs text-red-500 font-body flex items-center gap-1">
          <span className="inline-block w-1 h-1 rounded-full bg-red-400 mt-px" />
          {error ?? "Please enter a complete 10-digit number"}
        </p>
      )}

      {/* Dropdown */}
      {open && (
        <div
          ref={dropRef}
          className="absolute top-[calc(100%+6px)] left-0 z-[200] w-72 bg-background border border-border rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Search */}
          <div className="p-2.5 border-b border-border/60 sticky top-0 bg-background">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/60 border border-border/40">
              <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search country..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm font-body text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-muted-foreground hover:text-foreground">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* List */}
          <div className="max-h-52 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground font-body">No results</p>
            ) : (
              filtered.map((c, i) => (
                <button
                  key={`${c.iso}-${i}`}
                  type="button"
                  onClick={() => handleCountrySelect(c)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-muted/60 transition-colors text-left
                    ${c.code === value.countryCode && c.country === selected.country ? "bg-secondary/10" : ""}`}
                >
                  <img src={getFlagUrl(c.iso)} alt={c.country} width={20} height={14} className="rounded-sm object-cover shrink-0" style={{minWidth:20}} />
                  <span className="flex-1 font-body text-sm text-foreground truncate">{c.country}</span>
                  <span className="font-mono text-xs text-muted-foreground tabular-nums shrink-0">{c.code}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/* ─── Email validation helper ─── */
export const validateEmail = (email: string): { valid: boolean; message: string } => {
  if (!email) return { valid: false, message: "Email is required" };
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!re.test(email)) return { valid: false, message: "Enter a valid email address" };
  const [, domain] = email.split("@");
  const parts = domain.split(".");
  if (parts.some(p => p.length === 0)) return { valid: false, message: "Invalid email domain" };
  return { valid: true, message: "" };
};

/* ─── EmailInput with live validation ─── */
interface EmailInputProps {
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  className?: string;
  id?: string;
}

export const EmailInput = ({ value, onChange, required, className = "", id }: EmailInputProps) => {
  const [touched, setTouched] = useState(false);
  const { valid, message } = validateEmail(value);
  const showError = touched && !valid && value.length > 0;
  const showRequired = touched && !value && required;

  return (
    <div>
      <input
        id={id}
        type="email"
        value={value}
        required={required}
        autoComplete="email"
        placeholder="you@example.com"
        onBlur={() => setTouched(true)}
        onChange={e => onChange(e.target.value)}
        className={`flex h-12 w-full rounded-xl border-2 px-4 bg-background font-body text-base
          placeholder:text-muted-foreground/60 focus:outline-none transition-all duration-200
          ${showError || showRequired ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100" : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20"} ${className}`}
      />
      {showRequired && (
        <p className="mt-1.5 text-xs text-red-500 font-body flex items-center gap-1">
          <span className="inline-block w-1 h-1 rounded-full bg-red-400 mt-px" />
          Email is required
        </p>
      )}
      {showError && (
        <p className="mt-1.5 text-xs text-red-500 font-body flex items-center gap-1">
          <span className="inline-block w-1 h-1 rounded-full bg-red-400 mt-px" />
          {message}
        </p>
      )}
    </div>
  );
};

export default PhoneInput;