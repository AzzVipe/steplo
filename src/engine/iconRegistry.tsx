import type { ComponentType, SVGProps } from "react";
import {
	GlobeAltIcon,
	DevicePhoneMobileIcon,
	PaintBrushIcon,
	MegaphoneIcon,
	CheckIcon,
	XMarkIcon,
	HomeIcon,
	ArrowsRightLeftIcon,
	BuildingOfficeIcon,
	EnvelopeIcon,
	VideoCameraIcon,
	UsersIcon,
	BoltIcon,
	MicrophoneIcon,
	AcademicCapIcon,
	WrenchScrewdriverIcon,
	ArrowPathIcon,
	BanknotesIcon,
	TicketIcon,
	QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { Slack } from "lucide-react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const ICON_REGISTRY: Record<string, IconComponent> = {
	GlobeAltIcon,
	DevicePhoneMobileIcon,
	PaintBrushIcon,
	MegaphoneIcon,
	CheckIcon,
	XMarkIcon,
	HomeIcon,
	ArrowsRightLeftIcon,
	BuildingOfficeIcon,
	EnvelopeIcon,
	VideoCameraIcon,
	UsersIcon,
	BoltIcon,
	MicrophoneIcon,
	AcademicCapIcon,
	WrenchScrewdriverIcon,
	ArrowPathIcon,
	BanknotesIcon,
	TicketIcon,
	SlackIcon: Slack as IconComponent,
};

interface FieldIconProps {
	name: string;
	className?: string;
}

export function FieldIcon({ name, className = "w-5 h-5" }: FieldIconProps) {
	const Icon = ICON_REGISTRY[name] ?? QuestionMarkCircleIcon;
	return <Icon className={className} />;
}
