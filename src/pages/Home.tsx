import { Library as LibraryIcon } from "lucide-preact";
import FileUploader from "../components/FileUploader";
import Page from "../components/layout/Page";
import Library from "../components/Library";

const Home = () => {
  return (
    <Page>
      {/* Header */}
      {/* <section class="py-8 w-full">
        <h2 class="text-2xl font-bold mb-4">Recent Activity</h2>
      </section> */}

      {/* Library */}
      <section class="py-8 w-full">
        <h2 class="text-2xl font-bold mb-4 flex items-center gap-2"><LibraryIcon /> Library</h2>
          <Library />
          <div class="flex justify-center">
            <FileUploader />
          </div>
      </section>
    </Page>
  );
};

export default Home;
