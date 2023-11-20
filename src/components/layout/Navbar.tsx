import { Home, Settings } from "lucide-preact";

const Navbar = () => {
  return (
    <div class="flex justify-between p-4">
      <a href="/"><Home /></a>
      <a href="/settings"><Settings /></a>
    </div>
  );
};

export default Navbar;
