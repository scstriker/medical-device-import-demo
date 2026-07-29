import BottomCommandBar from "./BottomCommandBar";
import CenterWorkspace from "./CenterWorkspace";
import LeftSidebar from "./LeftSidebar";
import TopBar from "./TopBar";

export default function AppShell() {
  return (
    <div className="app-shell">
      <LeftSidebar />
      <section className="workspace-frame">
        <TopBar />
        <CenterWorkspace />
        <BottomCommandBar />
      </section>
    </div>
  );
}
