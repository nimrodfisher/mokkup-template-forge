
import React from "react";
import { Element } from "@/hooks/useWireframe";
import { AreaChartDisplay } from "../AreaChartDisplay";

interface AreaChartElementProps {
  element: Element;
}

export const AreaChartElement: React.FC<AreaChartElementProps> = ({ element }) => {
  return <AreaChartDisplay element={element} />;
};
