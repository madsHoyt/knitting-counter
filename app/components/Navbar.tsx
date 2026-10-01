"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    const links = [
        {
            name: "Projects",
            href: "/projects",
        },
        {
            name: "New Project",
            href: "/projects/new",
        },
    ];

    return (
        <nav className="sticky top-0 z-50 border-b border-pink-100 bg-white">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
                {/* Logo / App Name */}
                <Link
                    href="/"
                    className="flex items-center gap-2 text-xl font-bold text-pink-500"
                >
                    <Image
                        src="/Knit.png"
                        alt="Knitting Counter"
                        width={50}
                        height={50}
                        className="h-12 w-12 object-contain"
                    />

                    <span>Knitting Counter</span>
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-2">
                    {links.map((link) => {
                        const isActive = pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                                    isActive
                                        ? "bg-pink-100 text-pink-600"
                                        : "text-gray-600 hover:bg-pink-50 hover:text-pink-500"
                                }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
