import { useState } from "react";

const navItems = [
    { title: "About", id: "about" },
    { title: "Skills", id: "skills" },
    { title: "Experience", id: "experience" },
    { title: "Projects", id: "projects" },
    { title: "Contact", id: "contact" },
];

export default function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);

    function scrollToSection(id) {

        const section = document.getElementById(id);

        if (!section) return;

        section.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });

        setMenuOpen(false);
    }

    return (

        <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">

            <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

                <h1
                    className="cursor-pointer text-2xl font-bold text-white"
                    onClick={() =>
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                        })
                    }
                >
                    DeveloperHub
                </h1>

                <div className="hidden gap-8 md:flex">

                    {navItems.map((item) => (

                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className="text-slate-300 transition hover:text-indigo-400"
                        >
                            {item.title}
                        </button>

                    ))}

                </div>

                <button
                    className="text-white md:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>

            </div>

            {menuOpen && (

                <div className="border-t border-slate-800 bg-slate-900 md:hidden">

                    {navItems.map((item) => (

                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className="block w-full border-b border-slate-800 px-8 py-4 text-left text-white"
                        >
                            {item.title}
                        </button>

                    ))}

                </div>

            )}

        </nav>

    );

}