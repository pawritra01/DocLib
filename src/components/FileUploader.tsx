import { BaseDirectory, writeBinaryFile } from "@tauri-apps/api/fs";
import { Download } from "lucide-preact";
import useLibraryStore from "../store/libraryStore";

const FileUploader = () => {
  const initLibrary = useLibraryStore(state => state.initLibrary);

  const onUpload = async (event) => {
    const docFile = event.target.files[0] as File; 
    await writeBinaryFile({
      path: `doclib/${docFile.name}`,
      contents: await docFile.arrayBuffer()
    }, {
      dir: BaseDirectory.Home
    });

    initLibrary();
  }

  return <>
    <label for="file_uploader" class="my-8 py-4 px-6 bg-blue-500 font-bold text-white cursor-pointer rounded-md dark:bg-slate-500 flex gap-2 w-max items-center ">
      <Download size={18}/> 
      <div class="text-sm">Upload a document</div>
    </label>
    <input id="file_uploader" type="file" class="hidden" onChange={onUpload}/>
  </>;
};

export default FileUploader;
