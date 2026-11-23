import {
  Boxes,
  Cloud,
  Code2,
  Compass,
  GraduationCap,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Canvas3D from "@/components/canvas3d";

const fallbackIcons: Record<string, LucideIcon> = {
  code: Code2,
  layers: Boxes,
  graduation: GraduationCap,
  cloud: Cloud,
  workflow: Workflow,
  compass: Compass,
};

type ServiceVizProps = {
  slug: string;
  icon: string;
  title: string;
  tall?: boolean;
};

export default function ServiceViz({ slug, icon, title, tall = false }: ServiceVizProps) {
  const Icon = fallbackIcons[icon] ?? Boxes;
  return (
    <div className={\`service-viz \${tall ? "service-viz-tall" : ""}\`}>
      <Canvas3D
        kind={slug}
        label={\`Animated 3D visual representing \${title}\`}
        fallback={<Icon size={tall ? 66 : 48} strokeWidth={1.25} />}
      />
      <span className="service-viz-label" aria-hidden="true">BC / {slug.toUpperCase()}</span>
    </div>
  );
}
