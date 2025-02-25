import { 
  PhoneIcon, 
  UserGroupIcon, 
  ClockIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  InboxStackIcon,
  DocumentChartBarIcon,
  BellIcon,
  ChartBarSquareIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

export function Sidebar() {
  const navigationItems = [
    { icon: <PhoneIcon className="sidebar-icon" />, href: "/" },
    { icon: <UserGroupIcon className="sidebar-icon" />, href: "/contacts" },
    { icon: <ClockIcon className="sidebar-icon" />, href: "/call-history" },
    { icon: <ChatBubbleLeftRightIcon className="sidebar-icon" />, href: "/messages" },
    { icon: <DocumentChartBarIcon className="sidebar-icon" />, href: "/reports" },
    { icon: <ChartBarSquareIcon className="sidebar-icon" />, href: "/bdr-performance", tooltip: "BDR Performance" },
    { icon: <InboxStackIcon className="sidebar-icon" />, href: "/voicemail" },
    { icon: <BellIcon className="sidebar-icon" />, href: "/notifications" },
    { icon: <Cog6ToothIcon className="sidebar-icon" />, href: "/settings" },
  ];

  return (
    <aside className="w-14 h-full bg-black flex flex-col items-center py-4 fixed left-0 top-0 z-50">
      <div className="mb-8">
        <Image
          src="/ShakudoAISuite-Revenue-CampaignManager.svg"
          alt="Logo"
          width={24}
          height={24}
          className="text-white invert" // Added 'invert' class to invert colors
        />
      </div>
      
      <nav className="flex flex-col gap-8">
        {navigationItems.map((item, index) => (
          <Link 
            key={index} 
            href={item.href}
            className="transition-colors duration-200 text-white hover:text-gray-300 group relative"
            title={item.tooltip}
          >
            {item.icon}
            {item.tooltip && (
              <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity whitespace-nowrap">
                {item.tooltip}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
} 