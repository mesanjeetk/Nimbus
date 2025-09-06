import Toggle from "./Toggle";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/70 backdrop-blur-md shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
          Nimbus
        </h1>

        {/* Toggle */}
        <Toggle />
      </div>
    </header>
  );
};

export default Header;

