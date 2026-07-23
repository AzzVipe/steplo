import type { StepperComponentProps } from "../../types/form";
import type { StepperStyleId } from "../../stepper/stepperStyles";
import ClassicCirclesStepper from "./ClassicCirclesStepper";
import MinimalLineStepper from "./MinimalLineStepper";
import SegmentedPillsStepper from "./SegmentedPillsStepper";
import ChevronBreadcrumbStepper from "./ChevronBreadcrumbStepper";
import VerticalTimelineStepper from "./VerticalTimelineStepper";

const STEPPER_REGISTRY: Record<
	StepperStyleId,
	React.ComponentType<StepperComponentProps>
> = {
	"classic-circles": ClassicCirclesStepper,
	"minimal-line": MinimalLineStepper,
	"segmented-pills": SegmentedPillsStepper,
	"chevron-breadcrumb": ChevronBreadcrumbStepper,
	"vertical-timeline": VerticalTimelineStepper,
};

interface StepperRendererProps extends StepperComponentProps {
	style: StepperStyleId;
}

export default function StepperRenderer({
	style,
	steps,
	currentIndex,
}: StepperRendererProps) {
	const Component = STEPPER_REGISTRY[style];
	return <Component steps={steps} currentIndex={currentIndex} />;
}
