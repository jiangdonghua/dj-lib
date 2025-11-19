// props
export interface ComponentPropsValue {
	value: any;
	description: string;
}

export interface ComponentPropsContent {
	type: any;
	description: string;
	default?: any;
	validator?: (...args: any) => any;
	values?: Array<ComponentPropsValue>;
	mock?: () => any;
	defaultValue?: any;
	required?: boolean;
}

export type ComponentProps = Record<string, ComponentPropsContent>;

// events
export interface ComponentEventArg {
	name: string;
	description: string;
}

export interface ComponentEventContent<T = Array<ComponentEventArg>> {
	description: string;
	args?: T;
}
export interface ComponentMethodContent<T = Array<ComponentEventArg>> {
	description: string;
	args?: T;
	returns?: T;
}

export type ComponentEvents = Record<string, ComponentEventContent>;
export type ComponentMethods = Record<string, ComponentMethodContent>;

// component root

export interface RootType {
	readonly id: string;
	readonly field: string;
	name: string;
	data?: object;
	events?: object;
	components?: object;
	options?: object;
}

export interface ComponentType {
	name: string;
	title: string;
	clone: (...args: any) => object;
	group?: string;
	events?: ComponentEvents;
	props?: ComponentProps;
	formItemProps?: ComponentProps;
}
