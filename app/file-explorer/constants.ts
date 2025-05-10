import type { FileFormat } from "./FileExplorerPropTypes";

export const data: Record<string, FileFormat> = {
  first: {
    type: "file",
    name: "first",
    children: {},
    path: "first"
  },
  second: {
    type: "folder",
    name: "second",
    path: "second",
    children: {
      fourth: {
        type: "file",
        name: "fourth",
        children: {},
        path: "second.fourth"
      },
      fifth: {
        type: "folder",
        name: "fifth",
        path: "second.fifth",
        children: {
          sixth: {
            type: "file",
            name: "sixth",
            children: {},
            path: "second.fifth.sixth"
          },
        },
      },
    },
  },
  third: {
    type: "file",
    name: "third",
    children: {},
    path: "third"
  },
};
