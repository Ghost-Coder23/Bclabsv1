"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Calculator,
  Check,
  Contact,
  Package,
  Plus,
  RotateCcw,
  Sparkles,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Canvas3D from "@/components/canvas3d";
import { BrandMark } from "@/components/brand-mark";
import { Reveal } from "@/components/reveal";
import { systemModules } from "@/lib/system-builder";
import type { Inputs } from "@/lib/scenes";

const moduleIcons: Record<string, LucideIcon> = {
  "school-management": BookOpen,
  "accounting-finance": Calculator,
  inventory: Package,
  "sales-crm": Contact,
  "hr-payroll": Users,
  "custom-integrations": Workflow,
};

export default function SystemBuilder() {
  const [selected, setSelected] = useState<string[]>([]);
  const sceneInputs = useRef<Inputs>({ progress: 0, selected: [] });

  const selectedModules = useMemo(
    () => systemModules.filter((module) => selected.includes(module.slug)),
    [selected]
  );

  function toggleModule(slug: string) {
    const next = selected.includes(slug)
      ? selected.filter((item) => item !== slug)
      : [...selected, slug];

    sceneInputs.current.selected = next;
    setSelected(next);
  }

  function clearSelection() {
    sceneInputs.current.selected = [];
    setSelected([]);
  }

  const requestUrl = selected.length
    ? `/contact?modules=${selected.join(",")}`
    : "/contact";

  return (
    <section className="system-builder-section section-pad" id="build">
      <div className="container">
        <Reveal className="system-builder-intro">
          <div>
            <span className="eyebrow eyebrow-light"><Sparkles size={13} /> CONFIGURE YOUR SOLUTION</span>
            <h2>Build the system<br /><em>your business needs.</em></h2>
          </div>
          <p>
            Choose the parts your organisation needs. Watch your solution come together,
            then send your selection to BC Labs as the starting point for a conversation.
          </p>
        </Reveal>

        <div className="system-builder-layout">
          <div className="system-builder-controls">
            <div className="builder-step-heading">
              <span className="builder-step-number">01</span>
              <div>
                <h3>Choose your modules</h3>
                <p>Select one or more capabilities to bring into your system.</p>
              </div>
            </div>

            <div className="builder-module-grid" role="group" aria-label="Choose the modules for your business system">
              {systemModules.map((module) => {
                const Icon = moduleIcons[module.slug];
                const active = selected.includes(module.slug);

                return (
                  <button
                    className={`builder-module ${active ? "builder-module-active" : ""}`}
                    type="button"
                    key={module.slug}
                    aria-pressed={active}
                    onClick={() => toggleModule(module.slug)}
                  >
                    <span className="builder-module-top">
                      <span className="builder-module-icon" style={{ color: module.color, borderColor: `${module.color}55`, backgroundColor: `${module.color}14` }}>
                        <Icon size={19} strokeWidth={1.7} />
                      </span>
                      <span className="builder-module-toggle" aria-hidden="true">
                        {active ? <Check size={15} /> : <Plus size={15} />}
                      </span>
                    </span>
                    <span className="builder-module-category">{module.category}</span>
                    <strong>{module.name}</strong>
                    <span className="builder-module-description">{module.description}</span>
                  </button>
                );
              })}
            </div>

            <div className="builder-selection-summary" aria-live="polite" aria-atomic="true">
              <div className="builder-selection-heading">
                <span>Your configuration</span>
                <span className="builder-count">{selected.length} / {systemModules.length} selected</span>
              </div>
              {selectedModules.length ? (
                <div className="builder-selected-list">
                  {selectedModules.map((module) => (
                    <span className="builder-selected-chip" key={module.slug}>
                      <i style={{ background: module.color }} />
                      {module.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="builder-empty-state">Your system is waiting for its first module. Choose a capability above to begin.</p>
              )}
            </div>

            <div className="builder-actions">
              {selected.length > 0 && (
                <button className="builder-clear-button" type="button" onClick={clearSelection}>
                  <RotateCcw size={14} /> Clear selection
                </button>
              )}
              {selected.length > 0 ? (
                <Link href={requestUrl} className="button button-primary builder-request-button">
                  Request My Solution <ArrowUpRight size={17} />
                </Link>
              ) : (
                <button className="button button-primary builder-request-button" type="button" disabled>
                  Choose a module to continue
                </button>
              )}
            </div>
            <p className="builder-reassurance">No commitment. We&apos;ll review your requirements and help shape the right scope.</p>
          </div>

          <div className="system-builder-stage-column">
            <div className="builder-stage-label-row">
              <span><i className="live-dot" /> LIVE SYSTEM PREVIEW</span>
              <span>BC / SYSTEM DESIGNER</span>
            </div>
            <div className="builder-visual-stage">
              <div className="builder-stage-ambient" />
              <Canvas3D
                kind="builder"
                className="builder-canvas"
                inputs={sceneInputs}
                tick={selected.join(",")}
                label="Interactive 3D system preview. Selected modules assemble as blocks around the central BC Labs core."
                fallback={<div className="builder-fallback-icon"><Package size={62} strokeWidth={1.1} /></div>}
              />
              <div className="builder-core-overlay" aria-hidden="true">
                <BrandMark compact linked={false} light />
                <span>BC LABS CORE</span>
              </div>
              <div className="builder-stage-caption">
                <span>{selected.length ? `${selected.length} MODULE${selected.length === 1 ? "" : "S"} CONNECTED` : "READY TO CONFIGURE"}</span>
                <span>INTERACTIVE 3D MODEL</span>
              </div>
            </div>
            <div className="builder-stage-footer">
              <div className="builder-stage-key"><span className="builder-key-dot" /> The central core represents your connected business system.</div>
              <div className="builder-stage-key"><span className="builder-key-line" /> Selected modules connect to the core.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
