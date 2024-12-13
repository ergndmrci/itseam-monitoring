import React, { useState, useEffect } from 'react';
import { MonitorList } from './components/MonitorList';
import { AddMonitorButton } from './components/AddMonitorButton';
import { MonitorModal } from './components/MonitorModal';
import { StatusOverview } from './components/StatusOverview';
import { saveMonitors, loadMonitors } from './utils/storage';
import { useMonitorState } from './hooks/useMonitorState';
import type { Monitor } from './types/monitor';

export default function App() {
  const {
    monitors,
    handleAddMonitor,
    handleEditMonitor,
    handleTogglePause,
    handleDeleteMonitor
  } = useMonitorState();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMonitor, setEditingMonitor] = useState<Monitor | null>(null);

  const handleEdit = (monitor: Monitor) => {
    setEditingMonitor(monitor);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-surface border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">
                ITSEAM Monitoring
              </h1>
            </div>
            <AddMonitorButton onClick={() => {
              setEditingMonitor(null);
              setIsModalOpen(true);
            }} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <StatusOverview monitors={monitors} />
        <MonitorList
          monitors={monitors}
          onDelete={handleDeleteMonitor}
          onTogglePause={handleTogglePause}
          onEdit={handleEdit}
        />
      </main>

      <MonitorModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingMonitor(null);
        }}
        onSubmit={editingMonitor ? handleEditMonitor : handleAddMonitor}
        initialData={editingMonitor}
      />
    </div>
  );
}