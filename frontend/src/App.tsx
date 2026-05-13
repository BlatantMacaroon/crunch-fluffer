import { useState } from "react";
import { Layout } from "./components/Layout";
import { Modal } from "./components/Modal";
import { CrunchForm } from "./features/CrunchForm";
import { CrunchList } from "./features/CrunchList";
import { CrunchDetail } from "./features/CrunchDetail";
import { WelcomePlaceholder } from "./components/WelcomePlaceholder";

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <Layout 
      sidebar={
        <div className="space-y-6">
          <button 
            onClick={() => setShowModal(true)}
            className="w-full py-3 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 font-bold hover:border-indigo-400 hover:text-indigo-600 transition-all cursor-pointer"
          >
            + New Character
          </button>
          <CrunchList onSelect={setSelectedId} />
        </div>
      }
    >
      {selectedId ? <CrunchDetail crunchId={selectedId} /> : <WelcomePlaceholder />}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Forge New Crunch">
        <CrunchForm onSuccess={(newCrunch) => {
          setSelectedId(newCrunch._id);
          setShowModal(false);
          // Optional: Refresh the list if needed, 
          // or just let the user see their new selection!
        }} />
      </Modal>
    </Layout>
  );
}