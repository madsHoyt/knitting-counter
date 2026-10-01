import Link from "next/link";
import Image from "next/image";
import { Rows3, Sparkles, FolderHeart } from "lucide-react";

export default function HomePage() {
    return (
        <main className="min-h-screen overflow-hidden bg-pink-50">
            <div className="relative mx-auto flex min-h-[calc(100vh-73px)] max-w-5xl items-center justify-center px-5 py-8">
                {/* Decorative circles */}
                <div className="absolute -left-20 top-20 h-40 w-40 rounded-full bg-pink-100 opacity-70" />
                <div className="absolute -right-16 bottom-20 h-48 w-48 rounded-full bg-pink-100 opacity-70" />

                <div className="relative w-full max-w-2xl text-center">
                    {/* Knitting image */}
                    <div className="mx-auto mb-2 flex h-64 w-64 items-center justify-center">
                        <Image
                            src="/Knit.png"
                            alt="Knitting"
                            width={200}
                            height={200}
                            className="h-full w-full object-contain"
                            priority
                        />
                    </div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-500">
                        Knitting Counter
                    </p>
                    <h1 className="mt-4 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        Keep track of
                        <span className="block text-pink-500">every row.</span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-lg text-lg leading-8 text-gray-600">
                        A simple little counter for keeping track of your
                        knitting projects, increases, and decreases without
                        losing your place.
                    </p>
                    <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                        <Link
                            href="/projects"
                            className="w-full rounded-2xl bg-pink-500 px-8 py-4 text-lg font-bold text-white shadow-sm transition hover:bg-pink-600 active:scale-[0.98] sm:w-auto"
                        >
                            View My Projects
                        </Link>

                        <Link
                            href="/projects/new"
                            className="w-full rounded-2xl bg-white px-8 py-4 text-lg font-bold text-pink-600 shadow-sm transition hover:bg-pink-100 active:scale-[0.98] sm:w-auto"
                        >
                            + New Project
                        </Link>
                    </div>

                    {/* Features */}
                    <div className="mt-16 grid gap-5 sm:grid-cols-3">
                        <div className="rounded-3xl bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                            <div className="flex mx-auto h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-pink-500">
                                <Rows3 size={26} strokeWidth={1.8} />
                            </div>

                            <h2 className="mt-5 text-lg font-bold text-gray-900">
                                Track Rows
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Keep your current row right where you need it.
                            </p>
                        </div>

                        <div className="rounded-3xl bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                            <div className="flex mx-auto h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-pink-500">
                                <Sparkles size={26} strokeWidth={1.8} />
                            </div>

                            <h2 className="mt-5 text-lg font-bold text-gray-900">
                                Track Changes
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Know when your next increase or decrease is
                                coming.
                            </p>
                        </div>

                        <div className="rounded-3xl bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                            <div className="flex mx-auto h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-pink-500">
                                <FolderHeart size={26} strokeWidth={1.8} />
                            </div>

                            <h2 className="mt-5 text-lg font-bold text-gray-900">
                                Multiple Projects
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Keep all of your knitting projects together.
                            </p>
                        </div>
                    </div>

                    <p className="mt-10 text-sm font-medium text-pink-400">
                        Made for keeping your place, one row at a time ♡
                    </p>
                </div>
            </div>
        </main>
    );
}
