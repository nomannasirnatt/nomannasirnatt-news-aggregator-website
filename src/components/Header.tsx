'use client'
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import 'flowbite';
import { usePathname } from "next/navigation";
import ThemeContext, { ThemeContextType } from "@/contexts/theme-context";

const Header = () => {
    const storedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : 'light';
    const [theme, setTheme] = useState<string>(storedTheme || 'light'); 
    const router = useRouter();
    const pathname = usePathname();

    const toggleTheme = useCallback(() => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            document.documentElement.className = newTheme;
            localStorage.setItem('theme', newTheme);
            return newTheme;
        });
    }, []);
    
    useEffect(() => {
        document.documentElement.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    const contextThemeValue: ThemeContextType = {
        theme,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={contextThemeValue}>
                <nav className="bg-bookMainBG dark:bg-gray-900 fixed w-full z-20 top-0 left-0">
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <Link href="/news" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <span className="self-center text-2xl 3xl:text-4xl 2xl:text-2xl xl:text-2xl lg:text-xl md:text-xl sm:text-lg font-semibold text-white whitespace-nowrap dark:text-white">
                                The Lost Chapter
                            </span>
                        </Link>
                        <div className="flex items-center">
                            <button
                                data-collapse-toggle="navbar-sticky"
                                type="button"
                                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                aria-controls="navbar-sticky"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                                </svg>
                            </button>
                        </div>
                        <div className="hidden w-full md:flex md:items-center md:justify-between md:w-auto" id="navbar-sticky">
                            <ul className="flex items-start justify-between md:items-start lg:items-center flex-wrap p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 rtl:space-x-reverse">
                                <li className="mb-4 md:mb-0">
                                    <button
                                        type="button"
                                        className="mx-0 py-2 px-4 bg-lightGreen  text-white hover:bg-dark focus:ring-0 focus:outline-none font-medium rounded-lg text-sm text-center dark:bg-darkBg hover:dark:bg-darkHoverBg dark:focus:ring-blue-800"
                                        onClick={toggleTheme}
                                    >
                                        {theme === 'light' ? "Dark Mode" : "Light Mode"}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
        </ThemeContext.Provider>
    );
}

export default Header;
