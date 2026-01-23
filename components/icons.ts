import { createElement } from 'react'
import type { ComponentProps } from 'react'
import {
  // Core / navigation
  LayoutDashboard,
  FileText,
  Plus,
  Settings,
  LogOut,

  // Common UI
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  X,
  Check,
  Star,

  // Services / marketing
  Rocket,
  Zap,
  Smile,
  Trophy,
  BarChart3,
  Globe,
  Sparkles,
  Palette,
  Target,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  ShoppingBag,
  Monitor,
  Smartphone,
  Code,
  Store,
  SlidersHorizontal,
  Plug,
  Wrench,
  Search,
  Package,
  Eye,
  Clock,
  Timer,
  Calendar,
  Handshake,
  BookOpen,
  Camera,
  Music,
  Users,
  Flame,
  Megaphone,
  MessageCircle,
  Mail,
  Briefcase,
  Brain,
  Shield,
  Leaf,
  Banknote,
  Fish,
  MapPin,
  Gamepad2,
  Flag,
  Phone,
  Twitter,
  Linkedin,
  Facebook,
  HeartPulse,
  CreditCard,
  GraduationCap,
  Home,
  Factory,
  Cloud,
  Container,
  Server,
  Braces,
} from 'lucide-react'

export const Icons = {
  // Admin / navigation
  Dashboard: LayoutDashboard,
  Blog: FileText,
  Add: Plus,
  Settings,
  Logout: LogOut,

  // UI
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Close: X,
  Check,
  Star,

  // Services (semantic)
  DigitalTransformation: Rocket,
  Performance: Zap,
  Support: Smile,
  Award: Trophy,
  Analytics: BarChart3,
  Globe,
  Sparkles,
  Design: Palette,
  Target,
  Growth: TrendingUp,
  Downtrend: TrendingDown,
  Ecommerce: ShoppingCart,
  ShoppingBag,
  Web: Monitor,
  Mobile: Smartphone,
  Code,
  Store,
  Controls: SlidersHorizontal,
  Integrations: Plug,
  Tools: Wrench,
  Search,
  Package,
  Eye,
  Clock,
  Timer,
  Calendar,
  Partnership: Handshake,
  Book: BookOpen,
  Camera,
  Music,
  Users,
  Flame,
  Megaphone,
  Message: MessageCircle,
  Mail,
  Business: Briefcase,
  Brain,
  Shield,
  Leaf,
  Money: Banknote,
  Fish,
  Pin: MapPin,
  Gamepad: Gamepad2,
  Flag,

  // Contact / social
  Phone,
  Twitter,
  LinkedIn: Linkedin,
  Facebook,

  // Industry / tech
  Healthcare: HeartPulse,
  Finance: CreditCard,
  Education: GraduationCap,
  Home,
  Manufacturing: Factory,
  Cloud,
  Container,
  Server,
  Braces,
} as const

export type IconName = keyof typeof Icons
export type IconProps = Omit<ComponentProps<'svg'>, 'children'> & {
  name: IconName
  /**
   * If true, the icon flips in RTL (use for arrows/chevrons only).
   */
  rtlFlip?: boolean
  /**
   * Set `true` when document direction is RTL.
   */
  rtl?: boolean
}

/**
 * Central icon component.
 * - Tree-shakable (Lucide)
 * - Inherits color via `currentColor` (Tailwind classes control color)
 * - Optional RTL flip for directional icons
 */
export function Icon({ name, rtlFlip, rtl, className, ...props }: IconProps) {
  const Cmp = Icons[name]
  const shouldFlip = Boolean(rtlFlip && rtl)
  return createElement(Cmp, {
    'aria-hidden': 'true',
    focusable: 'false',
    className: `${className ?? ''}${shouldFlip ? ' scale-x-[-1]' : ''}`,
    ...props,
  })
}

