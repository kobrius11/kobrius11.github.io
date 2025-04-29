import NavLinks from "./nav-links";

export function AppSidebar() {

  return (
    <div className="hidden md:flex items-center px-3 py-4 md:px-2">
      <div className="space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
      </div>
    </div>
  );
}
 