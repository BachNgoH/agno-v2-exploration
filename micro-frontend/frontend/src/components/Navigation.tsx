'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Chat' },
    { href: '/pptist', label: 'PPTist Demo' },
  ];

  return (
    <nav className="fixed top-4 left-4 z-50">
      <div className="flex gap-2 p-2 bg-white/90 backdrop-blur-sm rounded-lg border shadow-sm">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={pathname === item.href ? 'default' : 'outline'}
              size="sm"
              className="text-xs"
            >
              {item.label}
            </Button>
          </Link>
        ))}

        <div className="flex items-center px-2 text-xs text-muted-foreground">
          Microfrontend Demo
        </div>
      </div>
    </nav>
  );
}