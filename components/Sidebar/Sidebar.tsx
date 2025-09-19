'use client';
import { useIsMobile } from '@/lib/hooks/useIsMobile';
import SidebarContent from './SidebarContent';

const Sidebar = () => {
  const isMobile = useIsMobile();

  return !isMobile && <SidebarContent />;
};
export default Sidebar;
