import { is } from "./is";

/**
 * main process onliy
 */
const readFile = async (file: File): Promise<FileReader | null> => {
  const fs = await import("fs");
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      resolve(e.target);
    };
    if (fs.statSync(file.path).isDirectory()) return resolve(null);
    if (file.size === 0) return resolve(null);
    fileReader.readAsArrayBuffer(file);
  });
};

export const fileExtension = async (file: File) => {
  if (is.renderer) throw new Error("file utils is not executed renderer");

  const { fileTypeFromBuffer } = await import("file-type");
  const fs = await import("fs");

  const reader = await readFile(file);
  return {
    // https://qiita.com/ynott/items/fd0cfe1b283a6ec4f56f
    // https://www.electronjs.org/docs/latest/api/shell#shellreadshortcutlinkshortcutpath-windows
    getMimeType: async () => {
      if (reader?.result == null) return "";
      if (typeof reader.result === "string") return "";
      return await fileTypeFromBuffer(reader.result);
    },
    // https://maku77.github.io/nodejs/io/is-directory.html
    directory: {
      is: () => {
        const is = fs.statSync(file.path).isDirectory();
        return is;
      },
      ls: () => {
        return fs.readdirSync(file.path);
      },
    },
    link: {
      is: () => {
        throw new Error(`link is not defined ${file}`);
      },
    },
    url: {
      is: () => /\.url$/.test(file.name),
    },
    toString: () => {
      if (reader?.result == null) return "";
      if (typeof reader.result === "string") return reader.result;
      return new TextDecoder().decode(reader.result);
    },
  };
};
