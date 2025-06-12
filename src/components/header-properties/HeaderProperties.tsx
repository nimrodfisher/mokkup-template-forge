
import { useState, useEffect } from "react";
import { Element } from "@/hooks/useWireframe";
import { Separator } from "@/components/ui/separator";
import { HeaderAddOnsSection } from "./HeaderAddOnsSection";
import { HeaderVariationSection } from "./HeaderVariationSection";
import { HeaderDesignSection } from "./HeaderDesignSection";
import { HeaderTitleSection } from "./HeaderTitleSection";
import { HeaderLogoSection } from "./HeaderLogoSection";
import { HeaderDescriptionSection } from "./HeaderDescriptionSection";
import { HeaderNavigationSection } from "./HeaderNavigationSection";
import { HeaderMetricsSection } from "./HeaderMetricsSection";
import { HeaderSecondaryLogoSection } from "./HeaderSecondaryLogoSection";

interface HeaderPropertiesProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  onOpenStyleDialog?: () => void;
}

export function HeaderProperties({ element, updateElementProperties, onOpenStyleDialog }: HeaderPropertiesProps) {
  const [showAddOns, setShowAddOns] = useState(false);

  // Local state for properties
  const [showNavigation, setShowNavigation] = useState<boolean>(element.properties?.showNavigation || false);
  const [navigationItems, setNavigationItems] = useState<string[]>(
    element.properties?.navigationItems || ["Navigation 1", "Navigation 2", "Navigation 3"]
  );
  const [showMetrics, setShowMetrics] = useState<boolean>(element.properties?.showMetrics || false);
  const [metrics, setMetrics] = useState<Array<{title: string, value: string}>>(
    element.properties?.metrics || [
      { title: "Metric 1", value: "123" },
      { title: "Metric 2", value: "456" }
    ]
  );
  const [showLogo, setShowLogo] = useState<boolean>(element.properties?.showLogo || false);
  const [showSecondaryLogo, setShowSecondaryLogo] = useState<boolean>(element.properties?.showSecondaryLogo || false);
  const [description, setDescription] = useState<string>(element.properties?.description || '');
  const [title, setTitle] = useState<string>(element.properties?.title || 'DASHBOARD TITLE');

  // Update local state when element changes
  useEffect(() => {
    console.log("HeaderProperties: Element updated", element.properties);
    setShowNavigation(element.properties?.showNavigation || false);
    setNavigationItems(element.properties?.navigationItems || ["Navigation 1", "Navigation 2", "Navigation 3"]);
    setShowMetrics(element.properties?.showMetrics || false);
    setMetrics(element.properties?.metrics || [{ title: "Metric 1", value: "123" }, { title: "Metric 2", value: "456" }]);
    setShowLogo(element.properties?.showLogo || false);
    setShowSecondaryLogo(element.properties?.showSecondaryLogo || false);
    setDescription(element.properties?.description || '');
    setTitle(element.properties?.title || 'DASHBOARD TITLE');
  }, [element]);

  // Handle title change
  const handleTitleChange = (value: string) => {
    setTitle(value);
    updateElementProperties(element.id, { title: value });
  };

  // Handle description change
  const handleDescriptionChange = (value: string) => {
    setDescription(value);
    updateElementProperties(element.id, { description: value });
  };

  // Handle logo toggle
  const handleLogoToggle = (checked: boolean) => {
    setShowLogo(checked);
    updateElementProperties(element.id, { showLogo: checked });
  };

  // Handle secondary logo toggle
  const handleSecondaryLogoToggle = (checked: boolean) => {
    setShowSecondaryLogo(checked);
    updateElementProperties(element.id, { showSecondaryLogo: checked });
  };

  // Update navigation toggle
  const handleNavigationToggle = (checked: boolean) => {
    setShowNavigation(checked);
    updateElementProperties(element.id, { showNavigation: checked });
    console.log("Navigation toggle:", checked);
  };

  // Update metric toggle
  const handleMetricToggle = (checked: boolean) => {
    setShowMetrics(checked);
    updateElementProperties(element.id, { showMetrics: checked });
    console.log("Metrics toggle:", checked);
  };

  // Update navigation item
  const handleNavigationItemChange = (index: number, value: string) => {
    const newItems = [...navigationItems];
    newItems[index] = value;
    setNavigationItems(newItems);
    updateElementProperties(element.id, { navigationItems: newItems });
    console.log("Navigation items updated:", newItems);
  };

  // Add navigation item
  const handleAddNavigationItem = () => {
    const newItems = [...navigationItems, `Navigation ${navigationItems.length + 1}`];
    setNavigationItems(newItems);
    updateElementProperties(element.id, { navigationItems: newItems });
  };

  // Remove navigation item
  const handleRemoveNavigationItem = (index: number) => {
    const newItems = navigationItems.filter((_, i) => i !== index);
    setNavigationItems(newItems);
    updateElementProperties(element.id, { navigationItems: newItems });
  };

  // Update metric
  const handleMetricChange = (index: number, field: 'title' | 'value', value: string) => {
    const newMetrics = [...metrics];
    newMetrics[index][field] = value;
    setMetrics(newMetrics);
    updateElementProperties(element.id, { metrics: newMetrics });
    console.log("Metrics updated:", newMetrics);
  };

  // Add metric
  const handleAddMetric = () => {
    const newMetrics = [...metrics, { title: `Metric ${metrics.length + 1}`, value: "0" }];
    setMetrics(newMetrics);
    updateElementProperties(element.id, { metrics: newMetrics });
  };

  // Remove metric
  const handleRemoveMetric = (index: number) => {
    const newMetrics = metrics.filter((_, i) => i !== index);
    setMetrics(newMetrics);
    updateElementProperties(element.id, { metrics: newMetrics });
  };

  // Handle add-ons changes
  const handleAddOnsChange = (field: string, value: any) => {
    updateElementProperties(element.id, { [field]: value });
  };

  // Handle logo upload
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const logoUrl = e.target?.result as string;
        updateElementProperties(element.id, { logoUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle secondary logo upload
  const handleSecondaryLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const secondaryLogoUrl = e.target?.result as string;
        updateElementProperties(element.id, { secondaryLogoUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove logo
  const handleLogoRemove = () => {
    updateElementProperties(element.id, { logoUrl: '' });
  };

  // Remove secondary logo
  const handleSecondaryLogoRemove = () => {
    updateElementProperties(element.id, { secondaryLogoUrl: '' });
  };

  // Check if current variant supports navigation
  const supportsNavigation = () => {
    const variant = element.properties?.variant;
    return !['centered-navigation-purple', 'navigation-top', 'dark-navigation', 'minimal'].includes(variant || '');
  };

  // Check if current variant supports metrics
  const supportsMetrics = () => {
    const variant = element.properties?.variant;
    return ['with-metrics', 'title-metrics'].includes(variant || '') || variant === 'default';
  };

  // Check if current variant supports logo
  const supportsLogo = () => {
    const variant = element.properties?.variant;
    return variant !== 'minimal';
  };

  // Check if current variant supports secondary logo (for double-logo variants)
  const supportsSecondaryLogo = () => {
    const variant = element.properties?.variant;
    return variant === 'double-logo-purple';
  };

  // Check if current variant supports description
  const supportsDescription = () => {
    const variant = element.properties?.variant;
    return variant === 'with-description';
  };

  // Get variant display name
  const getVariantDisplayName = () => {
    const variant = element.properties?.variant;
    switch (variant) {
      case 'default': return 'Default Style';
      case 'with-description': return 'With Description';
      case 'with-metrics': return 'With Metrics';
      case 'centered-navigation-purple': return 'Centered Navigation (Purple)';
      case 'navigation-top': return 'Top Navigation';
      case 'double-logo-purple': return 'Double Logo (Purple)';
      case 'dark-navigation': return 'Dark Navigation';
      case 'gradient': return 'Gradient';
      case 'minimal': return 'Minimal';
      case 'colorful-banner': return 'Colorful Banner';
      case 'title-metrics': return 'Title with Metrics';
      default: return 'Default Style';
    }
  };

  return (
    <div className="space-y-5">
      {/* Template Info Section */}
      <div className="space-y-2">
        <div className="font-medium text-sm">Template: {getVariantDisplayName()}</div>
        <div className="text-xs text-gray-500">Configure template-specific properties below</div>
      </div>
      
      <Separator />

      {/* Title Section - Always show */}
      <HeaderTitleSection
        title={title}
        onTitleChange={handleTitleChange}
      />

      {/* Logo Section - Show for variants that support it */}
      {supportsLogo() && (
        <HeaderLogoSection
          showLogo={showLogo}
          logoUrl={element.properties?.logoUrl}
          onLogoToggle={handleLogoToggle}
          onLogoUpload={handleLogoUpload}
          onLogoRemove={handleLogoRemove}
        />
      )}

      {/* Secondary Logo Section - Show for double-logo variants */}
      {supportsSecondaryLogo() && (
        <HeaderSecondaryLogoSection
          showSecondaryLogo={showSecondaryLogo}
          secondaryLogoUrl={element.properties?.secondaryLogoUrl}
          onSecondaryLogoToggle={handleSecondaryLogoToggle}
          onSecondaryLogoUpload={handleSecondaryLogoUpload}
          onSecondaryLogoRemove={handleSecondaryLogoRemove}
        />
      )}

      {/* Description Section - Only show for with-description variant */}
      {supportsDescription() && (
        <HeaderDescriptionSection
          description={description}
          onDescriptionChange={handleDescriptionChange}
        />
      )}
      
      {/* Navigation Section - Only show for variants that support it */}
      {supportsNavigation() && (
        <HeaderNavigationSection
          showNavigation={showNavigation}
          navigationItems={navigationItems}
          onNavigationToggle={handleNavigationToggle}
          onNavigationItemChange={handleNavigationItemChange}
          onAddNavigationItem={handleAddNavigationItem}
          onRemoveNavigationItem={handleRemoveNavigationItem}
        />
      )}
      
      {/* Metrics Section - Only show for variants that support it */}
      {supportsMetrics() && (
        <HeaderMetricsSection
          showMetrics={showMetrics}
          metrics={metrics}
          onMetricToggle={handleMetricToggle}
          onMetricChange={handleMetricChange}
          onAddMetric={handleAddMetric}
          onRemoveMetric={handleRemoveMetric}
        />
      )}

      {/* Add Ons Section */}
      <HeaderAddOnsSection
        properties={element.properties || {}}
        handleChange={handleAddOnsChange}
        addOnsOpen={showAddOns}
        setAddOnsOpen={setShowAddOns}
      />

      <Separator />

      {/* Variation Section */}
      <HeaderVariationSection
        properties={element.properties || {}}
        onOpenStyleDialog={onOpenStyleDialog}
      />

      {/* Design Customizations Section */}
      <HeaderDesignSection
        properties={element.properties || {}}
        onOpenStyleDialog={onOpenStyleDialog}
      />
    </div>
  );
}
