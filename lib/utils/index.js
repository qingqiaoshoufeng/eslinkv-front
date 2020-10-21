/**
 * @description 向上查找 components
 */
function findComponentUpward(context, componentName, componentNames) {
	if (typeof componentName === 'string') {
		componentNames = [componentName];
	} else {
		componentNames = componentName;
	}

	let parent = context.$parent;
	let name = parent.$options.name;
	while (parent && (!name || componentNames.indexOf(name) < 0)) {
		parent = parent.$parent;
		if (parent) name = parent.$options.name;
	}
	return parent;
}

export {findComponentUpward};

/**
 * @description 向下查找 components
 */
export function findComponentsDownward(context, componentName) {
	return context.$children.reduce((components, child) => {
		if (child.$options.name === componentName) components.push(child);
		const foundChilds = findComponentsDownward(child, componentName);
		return components.concat(foundChilds);
	}, []);
}

/**
 * @description uuid
 */
export function uuid() {
	return Math.random().toString(36).replace('0.','')
}
