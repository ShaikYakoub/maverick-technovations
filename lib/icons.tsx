import type { ComponentType, SVGProps } from "react";
import {
  ArrowLeft as PhArrowLeft,
  ArrowRight as PhArrowRight,
  ArrowUpRight as PhArrowUpRight,
  Broadcast,
  Buildings,
  BookOpenText,
  CaretDown,
  CaretRight,
  ChartBar,
  ChatCircleText,
  Check as PhCheck,
  CheckCircle as PhCheckCircle,
  Clock as PhClock,
  CurrencyInr,
  EnvelopeSimple,
  Eye as PhEye,
  FacebookLogo,
  Briefcase as PhBriefcase,
  GlobeHemisphereWest,
  Gauge as PhGauge,
  InstagramLogo,
  Lightning,
  LinkedinLogo,
  List,
  LockKey,
  MagnifyingGlass,
  MapPin as PhMapPin,
  MegaphoneSimple,
  Monitor as PhMonitor,
  PencilSimple,
  Phone as PhPhone,
  Pulse,
  Robot,
  SealCheck,
  ShareNetwork,
  Shield as PhShield,
  ShieldCheck as PhShieldCheck,
  ShoppingCart as PhShoppingCart,
  Sparkle,
  SpinnerGap,
  Stack,
  Star as PhStar,
  Timer as PhTimer,
  TrendUp,
  Trophy,
  UsersThree,
  VideoCamera,
  WarningCircle,
  WhatsappLogo,
  WifiHigh,
  X as PhX,
} from "@phosphor-icons/react/ssr";

type SiteIconWeight =
  | "thin"
  | "light"
  | "regular"
  | "bold"
  | "fill"
  | "duotone";

type SharedSvgProps = Omit<SVGProps<SVGSVGElement>, "ref">;

export interface SiteIconProps extends SharedSvgProps {
  size?: number | string;
  strokeWidth?: number;
  weight?: SiteIconWeight;
}

type PhosphorIconComponent = ComponentType<{
  size?: number | string;
  style?: SharedSvgProps["style"];
  className?: string;
  color?: string;
  fill?: string;
  weight?: SiteIconWeight;
}>;

const createIcon = (
  Icon: PhosphorIconComponent,
  defaultWeight: SiteIconWeight = "duotone",
) => {
  function SiteIcon({
    strokeWidth: _strokeWidth,
    weight,
    ...props
  }: SiteIconProps) {
    return <Icon {...props} weight={weight ?? defaultWeight} />;
  }

  return SiteIcon;
};

export const Activity = createIcon(Pulse, "duotone");
export const AlertCircle = createIcon(WarningCircle, "fill");
export const ArrowLeft = createIcon(PhArrowLeft, "bold");
export const ArrowRight = createIcon(PhArrowRight, "bold");
export const ArrowUpRight = createIcon(PhArrowUpRight, "bold");
export const Award = createIcon(Trophy, "duotone");
export const BadgeCheck = createIcon(SealCheck, "duotone");
export const BadgeIndianRupee = createIcon(CurrencyInr, "duotone");
export const BarChart2 = createIcon(ChartBar, "duotone");
export const BookOpen = createIcon(BookOpenText, "duotone");
export const Bot = createIcon(Robot, "duotone");
export const Briefcase = createIcon(PhBriefcase, "duotone");
export const Building2 = createIcon(Buildings, "duotone");
export const Check = createIcon(PhCheck, "bold");
export const CheckCircle = createIcon(PhCheckCircle, "fill");
export const CheckCircle2 = createIcon(PhCheckCircle, "fill");
export const ChevronDown = createIcon(CaretDown, "bold");
export const ChevronRight = createIcon(CaretRight, "bold");
export const Clock = createIcon(PhClock, "duotone");
export const Clock3 = createIcon(PhClock, "duotone");
export const Eye = createIcon(PhEye, "duotone");
export const FaFacebookF = createIcon(FacebookLogo, "fill");
export const FaInstagram = createIcon(InstagramLogo, "fill");
export const FaLinkedinIn = createIcon(LinkedinLogo, "fill");
export const FaWhatsapp = createIcon(WhatsappLogo, "fill");
export const Globe2 = createIcon(GlobeHemisphereWest, "duotone");
export const Gauge = createIcon(PhGauge, "duotone");
export const Layers = createIcon(Stack, "duotone");
export const Loader2 = createIcon(SpinnerGap, "bold");
export const Lock = createIcon(LockKey, "duotone");
export const Mail = createIcon(EnvelopeSimple, "duotone");
export const MapPin = createIcon(PhMapPin, "fill");
export const Megaphone = createIcon(MegaphoneSimple, "duotone");
export const Menu = createIcon(List, "bold");
export const MessageCircle = createIcon(ChatCircleText, "duotone");
export const Monitor = createIcon(PhMonitor, "duotone");
export const Pen = createIcon(PencilSimple, "duotone");
export const Phone = createIcon(PhPhone, "fill");
export const Radar = createIcon(Broadcast, "duotone");
export const Search = createIcon(MagnifyingGlass, "duotone");
export const Share2 = createIcon(ShareNetwork, "duotone");
export const Shield = createIcon(PhShield, "duotone");
export const ShieldCheck = createIcon(PhShieldCheck, "duotone");
export const ShoppingCart = createIcon(PhShoppingCart, "duotone");
export const Sparkles = createIcon(Sparkle, "duotone");
export const Star = createIcon(PhStar, "fill");
export const Timer = createIcon(PhTimer, "duotone");
export const TrendingUp = createIcon(TrendUp, "duotone");
export const Users = createIcon(UsersThree, "duotone");
export const Video = createIcon(VideoCamera, "duotone");
export const Wifi = createIcon(WifiHigh, "duotone");
export const X = createIcon(PhX, "bold");
export const Zap = createIcon(Lightning, "duotone");
