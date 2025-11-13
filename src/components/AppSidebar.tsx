import { LayoutDashboard, TrendingUp, Wrench, DollarSign, Users, PanelLeftClose, PanelLeft, Leaf } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "Summary Dashboard", url: "/", icon: LayoutDashboard },
  { title: "AM Dashboard", url: "/am-dashboard", icon: TrendingUp },
  { title: "OM Tracker", url: "/om-tracker", icon: Wrench },
  { title: "P&L Tracker", url: "/pl-tracker", icon: DollarSign },
  { title: "HR Tracker", url: "/hr-tracker", icon: Users },
];

export function AppSidebar() {
  const { open, toggleSidebar } = useSidebar();

  return (
    <Sidebar className="border-r border-border bg-white" collapsible="icon">
      <SidebarHeader className="border-b border-border px-4 py-4 flex items-center justify-center">
        {open ? (
          <div className="flex items-center gap-1">
            <span className="text-xl font-semibold text-foreground">TCPL CRM</span>
          </div>
        ) : (
          <div className="flex justify-center">
            <Leaf className="h-6 w-6 text-[rgb(0,168,107)]" />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <div className={open ? "px-2 pb-3 mb-2" : "flex justify-center pb-3 mb-2 border-b border-border"}>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-8 w-8 hover:bg-muted"
          >
            {open ? (
              <PanelLeftClose className="h-4 w-4" />
            ) : (
              <PanelLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink 
                      to={item.url} 
                      end
                      className={open 
                        ? "flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-muted/50 transition-colors text-sm text-foreground/80"
                        : "flex items-center justify-center w-full py-2.5 rounded-md hover:bg-muted/50 transition-colors text-foreground/80"
                      }
                      activeClassName={open
                        ? "bg-[rgb(0,168,107)]/10 text-[rgb(0,168,107)] font-medium border-r-2 border-[rgb(0,168,107)]"
                        : "bg-[rgb(0,168,107)]/10 text-[rgb(0,168,107)] font-medium"
                      }
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border px-4 py-3">
        {open ? (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 bg-[rgb(0,168,107)] text-white">
              <AvatarFallback className="bg-[rgb(0,168,107)] text-white text-xs font-semibold">
                JM
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-foreground truncate">JOSH MEHROTRA</span>
              <span className="text-xs text-muted-foreground">Last Login: Nov 6, 2025 6:23</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <Avatar className="h-8 w-8 bg-[rgb(0,168,107)] text-white">
              <AvatarFallback className="bg-[rgb(0,168,107)] text-white text-xs font-semibold">
                JM
              </AvatarFallback>
            </Avatar>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
