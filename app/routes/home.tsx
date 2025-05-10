import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import MultiTabForm from "~/multi-tab-form/MultiTabForm";
// import { data } from "~/multi-tab-form/constants";
// import { boxes} from "~/select-deselect/constants";
import Pagination from "~/pagination";
import SelectDeSelect from "~/select-deselect";
import FileExplorer from "~/file-explorer";
import { data } from "~/file-explorer/constants";
import MultiProgressBars from "~/multiProgressBars";
import MiniTrello from "~/miniTrello";
import Todo from "~/todo";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  // return <MultiTabForm data={data} />;

  // return <Pagination />

  // return <SelectDeSelect data={boxes} />

  // return <FileExplorer data={data} />
  
  // return <MultiProgressBars />

  // return <MiniTrello />

  return <Todo />
}
